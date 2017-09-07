// Parse CSV from a multi-line Javascript object
var points = "";
var csv2GeoJSON = require("csv2geojson");
var retVal = csv2GeoJSON.csv2geojson(csvString, function(err, data) {
    points = data;
});

// New Mapbox map
var map = new mapboxgl.Map( style );

// Add controls
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());


// Create a popup, but don't add it to the map yet.
var popupMouseClick = new mapboxgl.Popup({
  closeButton: false
});

var popupMouseMove = new mapboxgl.Popup({
  closeButton: false
});


map.on("load", function() {

  map.addLayer({
          "id": "points",
          "type": "symbol",
          "source": {
              "type": "geojson",
              "data": points
          },
          "layout": {
              "text-font": ["Open Sans Italic"],
              "text-size": 18,
              "icon-image": "{icon}",
              "text-field": textField,
              "text-offset": [0, 0.6],
              "text-anchor": "top"
          },
          "paint": {
              "text-color": "black",
              "text-halo-color": "white",
              "text-halo-width": 1.25
          }
      });

  function updatePopup(e) {

    var features = map.queryRenderedFeatures(e.point, {
      layers: ["points"]
    });

    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = features.length ? "pointer" : "";


    // if Popup is open, meaning it has been clicked, then exit
    if(popupMouseClick.isOpen()){
      return;
    }

    // Remove things if no feature was found.
    if (!features.length) {
      popupMouseMove.remove();
      return;
    }

    // clear existing
    popupMouseMove.remove();

    // Single out the first found feature on mouseove.
    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    var html = setHTML(feature);

    popupMouseMove
      .setLngLat(e.lngLat)
      .setHTML(html)
      .addTo(map);
  };

  map.on("mousemove", function(e) {
    updatePopup(e);
  });

  map.on("click", function(e) {

    var features = map.queryRenderedFeatures(e.point, {
      layers: ["points"]
    });

    // Remove things if no feature was found.
    if (!features.length) {
      return;
    }

    var feature = features[0];

    var html = setHTML(feature);

    popupMouseClick = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(html)
                .addTo(map);
  });

  map.on('moveend', function(){
    ZoomOrDragEnd(map);
  });

  function ZoomOrDragEnd(mapDiv){
    var zoom = mapDiv.getZoom();
    var center = mapDiv.getCenter().toArray();

    var zoomOutput = "zoom:  " + parseFloat(zoom).toFixed(2);
    var centerOutput = "center: [" + parseFloat(center[0]).toFixed(6) + ", " + parseFloat(center[1]).toFixed(6) + "],";

    console.log(zoomOutput + ", " + centerOutput);
  }

});
