## MapKit JS from the Console

Show JavaScript Console, then use these commands.

```bash
mapkit.build
# "21.16-138"

mapkit.version
# "5.61.1"

mapkit.language
# "en"

mapkit.FeatureVisibility
# { Adaptive: "adaptive", Hidden: "hidden", Visible: "visible" }

mapkit.PointOfInterestCategory
# { Airport: "Airport", AmusementPark: "AmusementPark", Aquarium: "Aquarium", ATM: "ATM", Bakery: "Bakery", Bank: "Bank", Beach: "Beach", Brewery: "Brewery", Cafe: "Cafe", Campground: "Campground", … }

mapkit.Map.ColorSchemes
# { Dark: "dark", Light: "light" }

mapkit.Map.MapTypes
 # { Satellite: "satellite", Hybrid: "hybrid", MutedStandard: "mutedStandard", Standard: "standard" }

mapkit.Map.Distances
# { Adaptive: "adaptive", Metric: "metric", Imperial: "imperial" }
```

---

### I18N with MapKit JS

* https://developer.apple.com/documentation/mapkitjs/mapkitinitoptions
  * Use the `language` constructor at `init()`
* https://developer.apple.com/documentation/mapkitjs/mapkit/2974045-init

```JavaScript
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

### Embed<sup>1</sup>[<sup>1</sup>][1]

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

```JavaScript
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
