---
# permalink: /projects/mapkitjs/
---

<!-- 
* https://maps.developer.apple.com/sample-code 
Annotations & Reverse Geocoding
demonstrates adding/removing annotations, using the Reverse Geocoding API to find place data.

Callout Accessory Views
demonstrates displaying additional customized elements within a callout.

Animated Polyline Overlays
demonstrates animating an overlay property in a request animation frame loop. -->

## MapKit JS

* [Add Annotations](/projects/mapkitjs/Add-Annotations.html){:target="_blank"} demonstrates adding a basic annotation.
* [Annotations With a Custom Callout](/projects/mapkitjs/Custom-Callout.html){:target="_blank"} demonstrates how to add custom styles to annotation callouts.
* [Draggable Annotations](/projects/mapkitjs/Draggable-Annotations.html){:target="_blank"} demonstrates a draggable annotation with an updated overview map.
* [Embedded Map](/projects/mapkitjs/Embed.html){:target="_blank"} demonstrates simply displaying a map with minimal code.
* [US Population By State Overlays](/projects/mapkitjs/GeoJSON-Import.html){:target="_blank"} demonstrates displaying, transforming, and interacting with GeoJSON-based map overlays.
* [Region and Zoom Limits](/projects/mapkitjs/Region-and-Zoom-Limits.html){:target="_blank"} demonstrates limiting a map's viewport's zoom levels and latitude/longitude constraints.
* [Tile Overlay](/projects/mapkitjs/Tile-Overlay.html){:target="_blank"} demonstrates adding external raster tiles.

* [MapKit JS Sample Code from apple.com](https://developer.apple.com/forums/thread/704954)
* Embed interactive Apple Maps on your website, annotate points of interest, and perform georelated searches with [MapKit JS at apple.com](https://developer.apple.com/documentation/MapKitJS)

### TileOverlay Demos

* [Lebanon 1911](/projects/mapkitjs/lebanon1911){:target="_blank"}
* [Corvallis 1936](/projects/mapkitjs/corvallis1936){:target="_blank"}
* [Butte 1940](/projects/mapkitjs/butte1940){:target="_blank"}
* [Butte 1959 USGS](/projects/mapkitjs/butte){:target="_blank"}
* [Boston 1995](/projects/mapkitjs/boston1995){:target="_blank"}
* [Minimal with OpenStreetMap](/projects/mapkitjs/minimal){:target="_blank"}

### MapKit JS from the Console

Show JavaScript Console, then use these commands.

```javascript
JSON.stringify(mapkit.build)
// "21.16-138"
// "23.08-258"

JSON.stringify(mapkit.version)
// "5.61.1"
// "5.75.4"
// "5.75.57"

JSON.stringify(mapkit.language)
// "en"

JSON.stringify(mapkit.FeatureVisibility)
// { Adaptive: "adaptive", Hidden: "hidden", Visible: "visible" }

JSON.stringify(mapkit.PointOfInterestCategory)
// { Airport: "Airport", AmusementPark: "AmusementPark", Aquarium: "Aquarium", ATM: "ATM", Bakery: "Bakery", Bank: "Bank", Beach: "Beach", Brewery: "Brewery", Cafe: "Cafe", Campground: "Campground", … }

JSON.stringify(mapkit.Map.ColorSchemes)
// {"Dark": "dark", "Light": "light", "Adaptive": "adaptive"}

JSON.stringify(mapkit.Map.MapTypes)
// { Satellite: "satellite", Hybrid: "hybrid", MutedStandard: "mutedStandard", Standard: "standard" }

JSON.stringify(mapkit.Map.Distances)
// { Adaptive: "adaptive", Metric: "metric", Imperial: "imperial" }

JSON.stringify(mapkit.maps[0].center)
// { latitude: 37.788706013265816, longitude: -122.45377750000002 }

JSON.stringify(mapkit.maps[0].region)
// { latitudeDelta: 0.6511658054971932, longitudeDelta: 1.039581298828125 }

JSON.stringify(mapkit.maps[0].rotation)
// 10

JSON.stringify(mapkit.maps[0].cameraDistance)
// 78967.63006909048

JSON.stringify(mapkit.maps[0].cameraZoomRange)
// { _minCameraDistance: 0, _maxCameraDistance: Infinity }

JSON.stringify(mapkit.maps[0].mapType)
// "standard", "hybrid", "satellite"

JSON.stringify(mapkit.maps[0].visibleMapRect)
// {"origin":{"x":0.24169921875,"y":0.260009765625},"size":{"width":0.5166015625,"height":0.47998046875}}

JSON.stringify(mapkit.maps[0].annotationsInMapRect( mapkit.maps[0].visibleMapRect ))
// [
// {"landmark":{"coordinate":{"latitude":37.7951315,"longitude":-122.402986},
//   "title":"Transamerica Pyramid","phone":"+1-415-983-5420","url":"http://www.transamericapyramidcenter.com/"}},
// {"landmark":{"coordinate":{"latitude":37.7954201,"longitude":-122.39352},
//   "title":"Ferry Building","phone":"+1 (415) 983-8030","url":"http://www.ferrybuildingmarketplace.com"}},
// {"landmark":{"coordinate":{"latitude":37.8083396,"longitude":-122.415727},
//   "title":"Fisherman's Wharf","phone":"+1 (415) 673-3530","url":"http://visitfishermanswharf.com"}},
// {"landmark":{"coordinate":{"latitude":37.7552305,"longitude":-122.452624},
//   "title":"Sutro Tower","phone":"+1 (415) 681-8850","url":"http://www.sutrotower.com"}},
// {"landmark":{"coordinate":{"latitude":37.779267,"longitude":-122.419269},
//   "title":"City Hall","phone":"+1 (415) 701-2311","url":"http://sfgsa.org/index.aspx?page=1085"}},
// {"landmark":{"coordinate":{"latitude":37.8184493,"longitude":-122.478409},
//   "title":"Golden Gate Bridge","phone":"+1 (415) 921-5858","url":"http://www.goldengatebridge.org"}},
// {"landmark":{"coordinate":{"latitude":37.7785538,"longitude":-122.514035},
//   "title":"Cliff House","phone":"+1 (415) 386-3330","url":"http://www.cliffhouse.com/"}}
//   ]
```

---

### I18N with MapKit JS

* https://developer.apple.com/documentation/mapkitjs/mapkitinitoptions
  * Use the `language` constructor at `init()`
* https://developer.apple.com/documentation/mapkitjs/mapkit/2974045-init

```javascript
mapkit.init({
    authorizationCallback: function(done) {
        done("your-token-string");
    },
    language: "es"
});
```

---

### GeoJSON Import[<sup>1</sup>][1]

<p>Create a map with an overlay for each state in the US. The color of each overlay represents the population in that state.
<br>
This samples uses GeoJSON data derived from <a href="https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html" target="_blank">cartographic boundary files</a> and <a href="https://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?src=bkmk#" target="_blank">2018 population estimates</a> provided by the <a href="https://www.census.gov/" target="_blank">United States Census Bureau</a>. The code shows how to use a delegate when importing GeoJSON data to add style and data to the imported items; the color of each overlay gives an indication of its population, and selecting an overlay displays the the information associated with that state.</p>

Makes use of this GeoJSON Data

```bash
wget -N https://developer.apple.com/maps/web/scripts/states.json
```

* https://developer.apple.com/documentation/mapkitjs/mapkit/2974044-importgeojson
* > *Converts imported GeoJSON data to MapKit JS items.*

```
mapkit.importGeoJSON("states.json", {/* callback */});
```

Disables rotation, zoom

```javascript
var map = new mapkit.Map("map", {
            isRotationEnabled: false,
            isZoomEnabled: false,
            showsZoomControl: false
        });
```

---

### Region and Zoom Limits[<sup>1</sup>][1]

Create a map restricted by camera boundaries and zoom range to two cities (San Francisco and Toronto). Click on the desired city to change the region and zoom limits.

```javascript
// Define camera boundaries and zoom ranges for San Francisco and Toronto.
var CITIES = {
    sanfrancisco: {
        region: new mapkit.CoordinateRegion(
            new mapkit.Coordinate(37.7812, -122.44755),
            new mapkit.CoordinateSpan(0.10, 0.11)
        ),
        zoomRange: new mapkit.CameraZoomRange(250, 15000)
    },

    toronto: {
        region: new mapkit.CoordinateRegion(
            new mapkit.Coordinate(43.6451, -79.37505),
            new mapkit.CoordinateSpan(0.05, 0.11)
        ),
        zoomRange: new mapkit.CameraZoomRange(250, 20000)
    }
}
```

---

### Embed[<sup>1</sup>][1]

Create an embedded map in an element on the page.

---

### Add Annotations[<sup>1</sup>][1]

Create a map with two annotations. Shift-click on the map adds a new annotation where the shift-click is detected and removes the annotation on the map that was previously added with shift-click, if one exists.

---

### Custom Callout[<sup>1</sup>][1]

Create annotations with custom callouts for the landmarks of San Francisco.


---

### Draggable Annotations[<sup>1</sup>][1]

A “loupe” is used to demonstrate draggable annotations. This example shows how to make a pin draggable, style a map with CSS, observe map events, and update the region of a second map in response to map events.

The “loupe” is fairly straightforward, as it disables most of the controls.

```javascript
// Initialize the loupe based on the marker's location on the map
var zoomedMap = new mapkit.Map("loupe", {
    isScrollEnabled: false,
    isZoomEnabled: false,
    showsCompass: mapkit.FeatureVisibility.Hidden,
    showsZoomControl: false,
    showsMapTypeControl: false
});
```


[1]: https://developer.apple.com/maps/web
