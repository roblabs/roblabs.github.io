// stw-geojson.js
// Copyright © 2026 ePi Rational, Inc.  All rights reserved.
// SPDX-License-Identifier: MIT

// Draws Share the World (STW) GeoJSON on a `mapkit.Map`: simplestyle colors and widths, `stroke-layer`, marker
// callouts, and the `mapshot` title, description and basemap. The rules are in stw-style.js (STWStyle).
(function (root) {
    "use strict";

    const S = root.STWStyle;

    function coordinate(position) {
        return new mapkit.Coordinate(position[1], position[0]);
    }

    function style(s) {
        return new mapkit.Style({
            strokeColor: s.stroke,
            strokeOpacity: s.strokeOpacity,
            lineWidth: s.strokeWidth,
            lineJoin: "round",
            lineCap: "round",
            fillColor: s.fill,
            fillOpacity: s.fillOpacity,
        });
    }

    // Lines and polygons as overlays. `layers[n]` holds every feature's n-th stroke layer, so a second layer is
    // above the first layer of all features, as in the app.
    function addShapes(features, layers, slot) {
        function add(index, overlay) {
            (layers[index] = layers[index] || []).push(overlay);
        }
        features.forEach(function (feature) {
            const geometry = feature.geometry;
            if (!geometry) return;
            const styles = S.overlayStyles(S.variant(feature.properties, slot));
            styles.forEach(function (s, index) {
                const mapkitStyle = style(s);
                switch (geometry.type) {
                    case "LineString":
                        add(index, new mapkit.PolylineOverlay(geometry.coordinates.map(coordinate), { style: mapkitStyle }));
                        break;
                    case "MultiLineString":
                        geometry.coordinates.forEach(function (line) {
                            add(index, new mapkit.PolylineOverlay(line.map(coordinate), { style: mapkitStyle }));
                        });
                        break;
                    case "Polygon":
                        add(index, new mapkit.PolygonOverlay(geometry.coordinates.map(function (ring) { return ring.map(coordinate); }), { style: mapkitStyle }));
                        break;
                    case "MultiPolygon":
                        geometry.coordinates.forEach(function (polygon) {
                            add(index, new mapkit.PolygonOverlay(polygon.map(function (ring) { return ring.map(coordinate); }), { style: mapkitStyle }));
                        });
                        break;
                }
            });
        });
    }

    function text(className, lines, size) {
        const element = document.createElement("div");
        element.className = className;
        element.style.fontSize = size + "px";
        lines.forEach(function (line) {
            const row = document.createElement("div");
            row.textContent = line;
            element.appendChild(row);
        });
        return element;
    }

    // The text color and halo as CSS variables; stw.css draws the halo from them.
    function setTextVariables(element, text) {
        element.style.setProperty("--stw-text", text.color);
        element.style.setProperty("--stw-halo", text.haloColor);
        element.style.setProperty("--stw-halo-width", text.haloWidth + "px");
    }

    // Sets where the label and the leader line go; the first paint is horizontal, and layoutCallouts refines it.
    function orientCallout(entry, direction, length, line) {
        const root = entry.root;
        root.style.setProperty("--stw-length", (line === false ? 0 : length) + "px");
        root.style.setProperty("--stw-end-x", direction.x * length + "px");
        root.style.setProperty("--stw-end-y", direction.y * length + "px");
        root.style.setProperty("--stw-angle", Math.round(Math.atan2(direction.y, direction.x) * 180 / Math.PI) + "deg");
        root.style.setProperty("--stw-tx", direction.tx + "%");
        root.style.setProperty("--stw-ty", direction.ty + "%");
        entry.body.style.textAlign = entry.label.align === "center" ? direction.align : entry.label.align;
    }

    // A point with a title and `marker-callout`: a dot, a leader line and a label with a halo.
    function calloutElement(entry, color, textStyle) {
        const label = entry.label;
        const root = document.createElement("div");
        root.className = "stw-callout";
        root.setAttribute("data-stw-callout", entry.id);
        setTextVariables(root, textStyle);
        root.style.setProperty("--stw-line", label.lineColor);
        root.style.setProperty("--stw-line-opacity", label.lineOpacity);
        root.style.setProperty("--stw-line-width", label.lineWidth + "px");
        root.style.setProperty("--stw-dot", color);
        const body = document.createElement("div");
        body.className = "stw-callout__label";
        body.appendChild(text("stw-callout__title", label.title, label.titleSize));
        if (label.description.length > 0) body.appendChild(text("stw-callout__description", label.description, label.descriptionSize));
        const dot = document.createElement("div");
        dot.className = "stw-callout__dot";
        const line = document.createElement("div");
        line.className = "stw-callout__line";
        root.appendChild(body);
        root.appendChild(line);
        root.appendChild(dot);
        entry.root = root;
        entry.body = body;
        if (entry.created) entry.created(0);
        const first = S.placeCallouts([{ x: 0, y: 0, width: 0, height: 0, distance: label.distance }], null)[0];
        orientCallout(entry, entry.direction || S.CALLOUT_DIRECTIONS[0], entry.length || first.length, entry.line === undefined ? first.line : entry.line);
        return root;
    }

    // Horizontal first, then vertical, then 45 degrees, whichever keeps the labels apart and on the map.
    function layoutCallouts(map, container, entries) {
        if (!map.convertCoordinateToPointOnPage || !container.getBoundingClientRect) return true;
        const rect = container.getBoundingClientRect();
        // MapKit may show a copy of the element the factory returned, so find the one that is on the page.
        entries.forEach(function (entry) {
            const live = container.querySelector ? container.querySelector('[data-stw-callout="' + entry.id + '"]') : null;
            if (live && live !== entry.root) {
                entry.root = live;
                entry.body = live.querySelector(".stw-callout__label");
            }
        });
        const built = entries.filter(function (entry) { return entry.root; });
        const ready = built.filter(function (entry) { return entry.body.offsetWidth > 0; });
        const inputs = ready.map(function (entry) {
            const point = map.convertCoordinateToPointOnPage(entry.coordinate);
            return { x: point.x - rect.left - (root.pageXOffset || 0), y: point.y - rect.top - (root.pageYOffset || 0), width: entry.body.offsetWidth, height: entry.body.offsetHeight, distance: entry.label.distance };
        });
        const choices = S.placeCallouts(inputs, { width: rect.width, height: rect.height });
        ready.forEach(function (entry, index) {
            entry.direction = choices[index].direction;
            entry.length = choices[index].length;
            entry.line = choices[index].line;
            orientCallout(entry, entry.direction, entry.length, entry.line);
        });
        return ready.length === built.length;
    }

    function addPoints(features, mapshot, items, slot, entries) {
        const withCallouts = mapshot["marker-callout"] === true;
        features.forEach(function (feature) {
            const geometry = feature.geometry;
            if (!geometry || (geometry.type !== "Point" && geometry.type !== "MultiPoint")) return;
            const positions = geometry.type === "Point" ? [geometry.coordinates] : geometry.coordinates;
            const resolved = S.variant(feature.properties, slot);
            const properties = Object.assign({}, { "marker-size": mapshot["marker-size"] }, resolved);
            const label = S.callout(resolved, S.variant(mapshot, slot));
            const color = S.markerColor(properties);
            const textStyle = S.textStyle(feature.properties, mapshot, slot);
            positions.forEach(function (position) {
                let annotation;
                if (withCallouts && label) {
                    const entry = { id: String(entries.length), label: label, coordinate: coordinate(position), created: entries.created };
                    entries.push(entry);
                    annotation = new mapkit.Annotation(entry.coordinate, function () { return calloutElement(entry, color, textStyle); }, {
                        calloutEnabled: false,
                        size: { width: 8, height: 8 },
                    });
                } else {
                    const marker = { color: color };
                    if (label) {
                        marker.title = label.title.join(" ");
                        marker.subtitle = label.description.join(" ");
                    }
                    annotation = new mapkit.MarkerAnnotation(coordinate(position), marker);
                }
                items.push(annotation);
            });
        });
    }

    // The point halfway along a line, by length, and the screen angle in degrees of the segment there, turned so the
    // text reads left to right. Longitude is scaled by cos(latitude) so the angle matches the Mercator map.
    function lineMidpoint(line) {
        const scale = Math.cos((line[0][1] * Math.PI) / 180);
        function length(a, b) { return Math.hypot((b[0] - a[0]) * scale, b[1] - a[1]); }
        let total = 0;
        for (let i = 1; i < line.length; i++) total += length(line[i - 1], line[i]);
        let remaining = total / 2;
        for (let i = 1; i < line.length; i++) {
            const segment = length(line[i - 1], line[i]);
            if (remaining <= segment || i === line.length - 1) {
                const t = segment === 0 ? 0 : Math.min(remaining / segment, 1);
                const a = line[i - 1];
                const b = line[i];
                let angle = (-Math.atan2(b[1] - a[1], (b[0] - a[0]) * scale) * 180) / Math.PI;
                if (angle > 90) angle -= 180;
                if (angle < -90) angle += 180;
                return { position: [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], angle: angle };
            }
            remaining -= segment;
        }
        return null;
    }

    // MapKit JS has no text along a line, so a line with `label-placement: "line"` gets its `title` as one label at the
    // middle of the line, turned to the line's direction. `label-size`, `label-color` and `label-halo-color` style it.
    function addLineLabels(features, items, slot) {
        features.forEach(function (feature) {
            const geometry = feature.geometry;
            const properties = S.variant(feature.properties, slot);
            if (!geometry || properties["label-placement"] !== "line" || typeof properties.title !== "string") return;
            const lines = geometry.type === "LineString" ? [geometry.coordinates] : geometry.type === "MultiLineString" ? geometry.coordinates : [];
            const textStyle = S.textStyle({
                "text-color": properties["label-color"],
                "text-halo-color": properties["label-halo-color"],
            }, {}, slot);
            lines.forEach(function (line) {
                const middle = line.length > 1 ? lineMidpoint(line) : null;
                if (!middle) return;
                items.push(new mapkit.Annotation(coordinate(middle.position), function () {
                    const element = document.createElement("div");
                    element.className = "stw-line-label";
                    setTextVariables(element, textStyle);
                    const label = text("stw-line-label__text", [properties.title], isFinite(properties["label-size"]) ? properties["label-size"] : 16);
                    label.style.transform = "translate(-50%, -50%) rotate(" + middle.angle + "deg)";
                    element.appendChild(label);
                    return element;
                }, { calloutEnabled: false, size: { width: 8, height: 8 } }));
            });
        });
    }

    // The `mapshot` title and description as a caption, the description at 80 percent of the title.
    function addCaption(container, mapshot) {
        if (!mapshot.title && !mapshot.description) return null;
        const caption = document.createElement("div");
        caption.className = "stw-caption";
        const size = S.MARKER_SIZES.medium.label;
        if (mapshot.title) caption.appendChild(text("stw-caption__title", String(mapshot.title).split("\n"), size));
        if (mapshot.description) caption.appendChild(text("stw-caption__description", String(mapshot.description).split("\n"), Math.round(size * 0.8)));
        container.appendChild(caption);
        return caption;
    }

    // The key of `mapkit.MapType` the map shows now.
    function mapTypeKey(map) {
        const types = mapkit.MapType;
        const found = Object.keys(types).filter(function (key) { return types[key] === map.mapType; });
        return found.length > 0 ? found[0] : "Standard";
    }

    function prefersDark() {
        return !!(root.matchMedia && root.matchMedia("(prefers-color-scheme: dark)").matches);
    }

    // Every overlay, bottom stroke layer first, then the points, for one slot.
    function buildItems(features, mapshot, slot, entries) {
        const layers = [];
        addShapes(features, layers, slot);
        const items = [];
        layers.forEach(function (overlays) {
            overlays.forEach(function (overlay) { items.push(overlay); });
        });
        addPoints(features, mapshot, items, slot, entries);
        addLineLabels(features, items, slot);
        return items;
    }

    // Full screen, like MapLibre's control. MapKit JS has none, so this adds a button to the map: four arrows out to enter
    // and four arrows in to leave. It sits left of the map type switcher, or in its place when that is hidden, and
    // `interactive=0` keeps it (`fullscreen=0` hides it). The Fullscreen API goes first; an iframe without `allowfullscreen`
    // cannot use it, so the page asks its parent (stw-embed.js) to fill the window with the iframe. Escape leaves.
    const FULLSCREEN_OUT = "M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1z";
    const FULLSCREEN_IN = "M5 5l7.5 7.5M12.5 7v5.5H7M24 5l-7.5 7.5M16.5 7v5.5H22M5 24l7.5-7.5M12.5 22v-5.5H7M24 24l-7.5-7.5M16.5 22v-5.5H22";

    function addFullscreenButton(container, showsMapType) {
        const doc = root.document;
        if (!doc || !root.location || !container.appendChild) return null;
        const button = doc.createElement("button");
        button.type = "button";
        // The CSS places it: left of the map type switcher, or in the corner when that is hidden. No measuring, so it never jumps.
        button.className = showsMapType ? "stw-fullscreen-button" : "stw-fullscreen-button stw-fullscreen-button--alone";
        const svg = "http://www.w3.org/2000/svg";
        const icon = doc.createElementNS(svg, "svg");
        icon.setAttribute("viewBox", "0 0 29 29");
        const path = doc.createElementNS(svg, "path");
        icon.appendChild(path);
        button.appendChild(icon);
        container.appendChild(button);
        const framed = root.parent && root.parent !== root;
        let on = false;
        function show(next) {
            on = next;
            button.title = on ? "Exit full screen" : "Full screen";
            button.setAttribute("aria-label", button.title);
            if (on) {
                path.setAttribute("d", FULLSCREEN_IN);
                path.setAttribute("fill", "none");
                path.setAttribute("stroke", "currentColor");
                path.setAttribute("stroke-width", "2");
            } else {
                path.setAttribute("d", FULLSCREEN_OUT);
                path.setAttribute("fill", "currentColor");
                path.removeAttribute("stroke");
            }
        }
        function toggle() {
            if (doc.fullscreenEnabled) {
                if (doc.fullscreenElement) doc.exitFullscreen(); else doc.documentElement.requestFullscreen();
            } else if (framed) {
                show(!on);
                root.parent.postMessage({ type: "stw-fullscreen", on: on }, "*");
            }
        }
        button.addEventListener("click", toggle);
        doc.addEventListener("fullscreenchange", function () { show(!!doc.fullscreenElement); });
        doc.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && on && !doc.fullscreenElement) toggle();
        });
        root.addEventListener("message", function (event) {
            if (event.data && event.data.type === "stw-fullscreen-exit") show(false);
        });
        show(false);
        return button;
    }

    // Draws `geojson` on `map`. `container` is the map's element, which gets the caption. When the system appearance
    // or the map type changes, the colors are rebuilt for the new slot and the camera stays where it is.
    function render(map, container, geojson) {
        const features = geojson.type === "FeatureCollection" ? geojson.features || [] : geojson.type === "Feature" ? [geojson] : [];
        const mapshot = geojson.mapshot || {};
        map.mapType = mapkit.MapType[S.mapType(mapshot)];
        map.colorScheme = mapkit.ColorScheme.Adaptive;
        const search = root.location ? root.location.search : "";
        // A map that is not interactive hides every control except the scale: the map type switcher, the compass and the zoom buttons.
        const interactive = !/[?&]interactive=0(&|$)/.test(search);
        const rotates = interactive && !/[?&]rotate=0(&|$)/.test(search);
        map.showsMapTypeControl = interactive && !/[?&]maptype=0(&|$)/.test(search);
        if (!/[?&](fullscreen=0|capture=1)(&|$)/.test(search)) addFullscreenButton(container, map.showsMapTypeControl);
        map.isRotationEnabled = rotates;
        map.showsCompass = rotates ? mapkit.FeatureVisibility.Adaptive : mapkit.FeatureVisibility.Hidden;
        map.showsZoomControl = interactive;
        map.isScrollEnabled = interactive;
        map.isZoomEnabled = interactive;
        map.showsScale = /[?&]scale=0(&|$)/.test(search) ? mapkit.FeatureVisibility.Hidden : mapkit.FeatureVisibility.Visible;
        let slot = S.appearance(prefersDark(), mapTypeKey(map));
        // MapKit builds a callout's element only when it first needs it, so the layout runs after each one appears.
        let entries = [];
        let pending = null;
        function newEntries() {
            const list = [];
            list.created = function (tries) {
                if (pending || !root.setTimeout) return;
                pending = root.setTimeout(function () {
                    pending = null;
                    // An element that is not in the page yet has no size; look again shortly.
                    if (!layoutCallouts(map, container, entries) && (tries || 0) < 20) list.created((tries || 0) + 1);
                }, 100);
            };
            return list;
        }
        entries = newEntries();
        const items = buildItems(features, mapshot, slot, entries);
        // capture=1 is for the picture recipe: no caption, and data-stw-ready once the camera has settled.
        const capturing = /[?&]capture=1(&|$)/.test(search);
        if (capturing && root.document) {
            const ready = function () { root.document.documentElement.setAttribute("data-stw-ready", "1"); };
            if (map.addEventListener) map.addEventListener("region-change-end", function () { root.setTimeout(ready, 2500); });
            root.setTimeout(ready, 8000);
        }
        // `mapshot.center` ([longitude, latitude]) with `mapshot.zoom` (web map zoom, 256 pt tiles) sets the first view; otherwise
        // the camera fits every item.
        const view = S.view(mapshot);
        if (view && mapkit.CoordinateRegion && mapkit.CoordinateSpan) {
            map.addItems(items);
            const scale = 360 / Math.pow(2, view.zoom) / 256;
            const width = container.clientWidth || 800;
            const height = container.clientHeight || 600;
            const latitudeDelta = Math.min(170, height * scale * Math.cos(view.latitude * Math.PI / 180));
            map.setRegionAnimated(new mapkit.CoordinateRegion(new mapkit.Coordinate(view.latitude, view.longitude),
                new mapkit.CoordinateSpan(latitudeDelta, Math.min(359, width * scale))), false);
        } else {
            map.showItems(items, { animate: false, padding: new mapkit.Padding(60, 60, 60, 60) });
        }
        const caption = capturing ? null : addCaption(container, mapshot);
        if (caption) setTextVariables(caption, S.textStyle(null, mapshot, slot));
        let current = items;
        function relayout() { layoutCallouts(map, container, entries); }
        if (map.addEventListener) map.addEventListener("region-change-end", relayout);
        function restyle() {
            const next = S.appearance(prefersDark(), mapTypeKey(map));
            if (next === slot) return;
            slot = next;
            map.removeItems(current);
            entries = newEntries();
            current = buildItems(features, mapshot, slot, entries);
            map.addItems(current);
            if (caption) setTextVariables(caption, S.textStyle(null, mapshot, slot));
        }
        if (map.addEventListener) map.addEventListener("map-type-change", restyle);
        const query = root.matchMedia ? root.matchMedia("(prefers-color-scheme: dark)") : null;
        if (query && query.addEventListener) query.addEventListener("change", restyle);
        return items;
    }

    // Starts MapKit JS with a token read from `tokenURL` (plain text, see Scripts/make-token.py), draws the GeoJSON at
    // `geojsonURL` in `container` and resolves with the map.
    async function show(container, geojsonURL, tokenURL) {
        mapkit.init({
            authorizationCallback: function (done) {
                fetch(tokenURL).then(function (response) { return response.text(); }).then(function (token) { done(token.trim()); });
            },
        });
        const map = new mapkit.Map(container);
        const geojson = await (await fetch(geojsonURL)).json();
        render(map, container, geojson);
        return map;
    }

    root.STWGeoJSON = { render: render, show: show };
})(typeof globalThis !== "undefined" ? globalThis : this);
