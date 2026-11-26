// stw-style.js
// Copyright © 2026 ePi Rational, Inc.  All rights reserved.
// SPDX-License-Identifier: MIT

// The Share the World (STW) GeoJSON rules as pure functions: no DOM and no MapKit JS, so they run in a browser
// and in `jsc` (see Tests/stw-style.test.js). The Swift twins are SimpleStyle, StrokeLayers.swift and CalloutLayer.swift.
(function (root) {
    "use strict";

    const DEFAULTS = {
        stroke: "#555555",
        strokeOpacity: 1,
        strokeWidth: 2,
        fill: "#555555",
        fillOpacity: 0.6,
        markerColor: "#7e7e7e",
        markerSize: "medium",
        calloutLineColor: "#8c8c8c", // 0.55 gray
        calloutLineOpacity: 0.9,
        calloutLineWidth: 1,
        calloutDistance: 40,
        calloutAlign: "center",
        textColor: "#ffffff",
        textHaloColor: "#000000",
        textHaloWidth: 1,
    };
    const MAXIMUM_STROKE_LAYERS = 8;
    // Point size of the symbol and of the label for each `marker-size`.
    const MARKER_SIZES = {
        small: { symbol: 20, label: 12 },
        medium: { symbol: 32, label: 16 },
        large: { symbol: 44, label: 18 },
    };
    // `mapshot.basemap` to a `mapkit.MapType` key.
    const BASEMAPS = { standard: "Standard", satellite: "Satellite", hybrid: "Hybrid", muted: "MutedStandard" };
    const SUBTITLE_SCALE = 0.8;
    const HEX = /^#[0-9a-fA-F]{6}$/;
    // Keys a slot of the `stw` object may set, each with the check a value must pass (SPEC-stw-appearance.md).
    const SLOT_KEYS = {
        stroke: isHex,
        "stroke-opacity": isUnit,
        "stroke-width": isPositive,
        "stroke-layer": Array.isArray,
        fill: isHex,
        "fill-opacity": isUnit,
        "marker-color": isHex,
        "marker-callout-color": isHex,
        "text-color": isHex,
        "text-halo-color": isHex,
        "text-halo-width": isHaloWidth,
    };
    // The slots to read for an appearance, least specific first. The base keys are the light, standard look.
    const SLOT_CHAINS = {
        base: [],
        "light-muted": ["light-muted"],
        dark: ["dark"],
        "dark-muted": ["dark", "dark-muted"],
        satellite: ["satellite"],
    };

    function isNumber(value) {
        return typeof value === "number" && isFinite(value);
    }

    function isHex(value) {
        return HEX.test(value);
    }

    function isUnit(value) {
        return isNumber(value) && value >= 0 && value <= 1;
    }

    function isPositive(value) {
        return isNumber(value) && value > 0;
    }

    function isHaloWidth(value) {
        return isNumber(value) && value >= 0;
    }

    function clamp(value, low, high) {
        return Math.min(Math.max(value, low), high);
    }

    // The slot for a color scheme and a `mapkit.MapType` key: satellite and hybrid share one slot in both schemes.
    function appearance(isDark, mapTypeKey) {
        if (mapTypeKey === "Satellite" || mapTypeKey === "Hybrid") return "satellite";
        const muted = mapTypeKey === "MutedStandard";
        if (isDark) return muted ? "dark-muted" : "dark";
        return muted ? "light-muted" : "base";
    }

    // `properties` with the keys of `properties.stw[slot]` (and the slots it falls back to) laid over the base keys.
    // A key whose value is invalid is skipped, so the base value stays. The input is not changed.
    function variant(properties, slot) {
        const p = properties || {};
        const chain = SLOT_CHAINS[slot] || [];
        const stw = p.stw && typeof p.stw === "object" ? p.stw : null;
        if (!stw || chain.length === 0) return p;
        const result = Object.assign({}, p);
        chain.forEach(function (name) {
            const values = stw[name];
            if (!values || typeof values !== "object") return;
            Object.keys(SLOT_KEYS).forEach(function (key) {
                if (values[key] !== undefined && SLOT_KEYS[key](values[key])) result[key] = values[key];
            });
        });
        return result;
    }

    // Text color and halo for a feature's label or, with null properties, the caption: the feature's value (slot, then
    // base key), then the `mapshot` value, then the default. Callers pass the base properties and the slot.
    function textStyle(properties, mapshot, slot) {
        const feature = variant(properties, slot);
        const file = variant(mapshot, slot);
        function pick(key, valid, fallback) {
            if (valid(feature[key])) return feature[key];
            if (valid(file[key])) return file[key];
            return fallback;
        }
        return {
            color: pick("text-color", isHex, DEFAULTS.textColor),
            haloColor: pick("text-halo-color", isHex, DEFAULTS.textHaloColor),
            haloWidth: clamp(pick("text-halo-width", isHaloWidth, DEFAULTS.textHaloWidth), 0, 8),
        };
    }

    // The base style of a feature, with the simplestyle-spec defaults for anything missing or malformed.
    function baseStyle(properties) {
        const p = properties || {};
        return {
            stroke: HEX.test(p.stroke) ? p.stroke : DEFAULTS.stroke,
            strokeOpacity: isNumber(p["stroke-opacity"]) ? clamp(p["stroke-opacity"], 0, 1) : DEFAULTS.strokeOpacity,
            strokeWidth: isNumber(p["stroke-width"]) && p["stroke-width"] > 0 ? p["stroke-width"] : DEFAULTS.strokeWidth,
            fill: HEX.test(p.fill) ? p.fill : DEFAULTS.fill,
            fillOpacity: isNumber(p["fill-opacity"]) ? clamp(p["fill-opacity"], 0, 1) : DEFAULTS.fillOpacity,
        };
    }

    // `stroke-layer`: a list of [color, opacity, width] with an optional fourth value, "inside". The first entry is the
    // bottom layer. Invalid entries are skipped and at most 8 are kept, like StrokeLayers.swift.
    function strokeLayers(properties) {
        const entries = properties && properties["stroke-layer"];
        if (!Array.isArray(entries)) return [];
        const layers = [];
        for (const entry of entries) {
            if (layers.length >= MAXIMUM_STROKE_LAYERS) break;
            if (!Array.isArray(entry) || (entry.length !== 3 && entry.length !== 4)) continue;
            if (entry.length === 4 && entry[3] !== "inside") continue;
            const [color, opacity, width] = entry;
            if (!HEX.test(color) || !isNumber(opacity) || opacity < 0 || opacity > 1) continue;
            if (!isNumber(width) || width <= 0) continue;
            layers.push({ stroke: color, strokeOpacity: opacity, strokeWidth: width, inside: entry.length === 4 });
        }
        return layers;
    }

    // One style per overlay to draw, bottom first. Without `stroke-layer` it is the feature's own style. With it, the
    // first layer replaces stroke, opacity and width and keeps the fill; the others have no fill.
    function overlayStyles(properties) {
        const base = baseStyle(properties);
        const layers = strokeLayers(properties);
        if (layers.length === 0) return [base];
        return layers.map(function (layer, index) {
            return Object.assign({}, base, layer, { fillOpacity: index === 0 ? base.fillOpacity : 0 });
        });
    }

    function markerSize(properties) {
        const name = properties && properties["marker-size"];
        return MARKER_SIZES[name] ? name : DEFAULTS.markerSize;
    }

    function markerColor(properties) {
        const color = properties && properties["marker-color"];
        return HEX.test(color) ? color : DEFAULTS.markerColor;
    }

    function textLines(text) {
        return typeof text === "string" && text.length > 0 ? text.split("\n") : [];
    }

    // The label of a callout: the title, then the description at 80 percent of the title's size. A description that
    // repeats the title is left out. `mapshot` holds the file's defaults for `marker-callout-*`.
    function callout(properties, mapshot) {
        const p = properties || {};
        const m = mapshot || {};
        const title = textLines(p.title);
        if (title.length === 0) return null;
        const description = p.description === p.title ? [] : textLines(p.description);
        const size = MARKER_SIZES[markerSize(Object.assign({}, { "marker-size": m["marker-size"] }, p))];
        const pick = function (key) {
            return p[key] !== undefined ? p[key] : m[key];
        };
        const color = pick("marker-callout-color");
        const opacity = pick("marker-callout-opacity");
        const width = pick("marker-callout-width");
        const distance = pick("marker-callout-distance");
        const align = pick("marker-callout-align");
        return {
            title: title,
            description: description,
            titleSize: size.label,
            descriptionSize: Math.round(size.label * SUBTITLE_SCALE),
            lineColor: HEX.test(color) ? color : DEFAULTS.calloutLineColor,
            lineOpacity: isNumber(opacity) ? clamp(opacity, 0, 1) : DEFAULTS.calloutLineOpacity,
            lineWidth: isNumber(width) ? clamp(width, 0.25, 8) : DEFAULTS.calloutLineWidth,
            distance: isNumber(distance) ? Math.max(distance, 0) : DEFAULTS.calloutDistance,
            align: ["left", "center", "right"].indexOf(align) >= 0 ? align : DEFAULTS.calloutAlign,
        };
    }

    // Where a callout's label goes, tried in this order: horizontal first, then vertical, then 45 degrees. `tx` and `ty`
    // are the percent the label moves from the end of the leader line, so the label's nearest edge or corner sits there.
    const CALLOUT_DIRECTIONS = [
        { name: "right", x: 1, y: 0, tx: 0, ty: -50, align: "left" },
        { name: "left", x: -1, y: 0, tx: -100, ty: -50, align: "right" },
        { name: "up", x: 0, y: -1, tx: -50, ty: -100, align: "center" },
        { name: "down", x: 0, y: 1, tx: -50, ty: 0, align: "center" },
        { name: "up-right", x: Math.SQRT1_2, y: -Math.SQRT1_2, tx: 0, ty: -100, align: "left" },
        { name: "up-left", x: -Math.SQRT1_2, y: -Math.SQRT1_2, tx: -100, ty: -100, align: "right" },
        { name: "down-right", x: Math.SQRT1_2, y: Math.SQRT1_2, tx: 0, ty: 0, align: "left" },
        { name: "down-left", x: -Math.SQRT1_2, y: Math.SQRT1_2, tx: -100, ty: 0, align: "right" },
    ];
    // A `marker-callout-distance` of 0 draws no leader line: the label sits 4 pt beyond the 4 pt dot radius. A line is
    // never shorter than 6 pt.
    const MINIMUM_CALLOUT_LENGTH = 6;
    const DOT_RADIUS = 4;
    const NO_LINE_GAP = 4;

    // Where the label sits from the dot, and whether a leader line joins them.
    function calloutLength(distance) {
        const value = isNumber(distance) ? distance : DEFAULTS.calloutDistance;
        return value <= 0 ? { length: DOT_RADIUS + NO_LINE_GAP, line: false } : { length: Math.max(value, MINIMUM_CALLOUT_LENGTH), line: true };
    }

    function labelRect(direction, dot, size, length) {
        const left = dot.x + direction.x * length + (direction.tx / 100) * size.width;
        const top = dot.y + direction.y * length + (direction.ty / 100) * size.height;
        return { left: left, top: top, right: left + size.width, bottom: top + size.height };
    }

    function overlapArea(a, b) {
        const width = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        return width > 0 && height > 0 ? width * height : 0;
    }

    // Picks a direction for every callout. Each is `{ x, y, width, height, distance }`: the dot's place and the label's
    // size in points, in the map's own coordinates. The first direction whose label stays in `bounds` (`{ width, height }`)
    // and clear of every dot and of the labels already placed wins; when none is clear, the one that overlaps least.
    function placeCallouts(callouts, bounds) {
        const dots = callouts.map(function (c) {
            return { left: c.x - DOT_RADIUS, top: c.y - DOT_RADIUS, right: c.x + DOT_RADIUS, bottom: c.y + DOT_RADIUS };
        });
        const placed = [];
        return callouts.map(function (callout, index) {
            const reach = calloutLength(callout.distance);
            const length = reach.length;
            let best = null;
            for (let i = 0; i < CALLOUT_DIRECTIONS.length && (best === null || best.cost > 0); i += 1) {
                const direction = CALLOUT_DIRECTIONS[i];
                const rect = labelRect(direction, callout, callout, length);
                let cost = 0;
                if (bounds) {
                    const inside = Math.max(0, Math.min(rect.right, bounds.width) - Math.max(rect.left, 0)) * Math.max(0, Math.min(rect.bottom, bounds.height) - Math.max(rect.top, 0));
                    cost += (callout.width * callout.height - inside) * 2;
                }
                dots.forEach(function (dot, other) { if (other !== index) cost += overlapArea(rect, dot); });
                placed.forEach(function (other) { cost += overlapArea(rect, other); });
                if (best === null || cost < best.cost) best = { direction: direction, rect: rect, cost: cost, length: length, line: reach.line };
            }
            placed.push(best.rect);
            return { direction: best.direction, length: best.length, line: best.line };
        });
    }

    // `mapshot.basemap` as a key of `mapkit.MapType`.
    function mapType(mapshot) {
        const name = mapshot && typeof mapshot.basemap === "string" ? mapshot.basemap.toLowerCase() : "";
        return BASEMAPS[name] || "Standard";
    }

    // The first view of `mapshot`: `center` as [longitude, latitude] and `zoom` (0 to 22), or null to fit every item.
    function view(mapshot) {
        const center = mapshot && mapshot.center;
        const zoom = mapshot && mapshot.zoom;
        if (!Array.isArray(center) || center.length < 2 || typeof zoom !== "number") return null;
        const longitude = center[0];
        const latitude = center[1];
        if (typeof longitude !== "number" || typeof latitude !== "number") return null;
        if (Math.abs(latitude) > 85 || Math.abs(longitude) > 180 || !(zoom >= 0 && zoom <= 22)) return null;
        return { longitude: longitude, latitude: latitude, zoom: zoom };
    }

    root.STWStyle = {
        DEFAULTS: DEFAULTS,
        MARKER_SIZES: MARKER_SIZES,
        appearance: appearance,
        variant: variant,
        textStyle: textStyle,
        baseStyle: baseStyle,
        strokeLayers: strokeLayers,
        overlayStyles: overlayStyles,
        markerSize: markerSize,
        markerColor: markerColor,
        callout: callout,
        placeCallouts: placeCallouts,
        CALLOUT_DIRECTIONS: CALLOUT_DIRECTIONS,
        mapType: mapType,
        view: view,
    };
})(typeof globalThis !== "undefined" ? globalThis : this);
