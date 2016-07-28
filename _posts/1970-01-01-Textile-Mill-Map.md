---
layout: map
title:  "Textile Mill Map"
description: ""
date:   2016-07-27T12:20:46-08:00
author: ePi Rational, Inc.
categories: [Mapbox, Paper Maps,]
tags: [Mapbox, Paper Maps]
permalink: /Textile-Mill-Map/
---


<style>
    .filter-group {
        font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1;
        border-radius: 3px;
        width: 120px;
        color: #fff;
    }

    .filter-group input[type=checkbox]:first-child + label {
        border-radius: 3px 3px 0 0;
    }

    .filter-group label:last-child {
        border-radius: 0 0 3px 3px;
        border: none;
    }

    .filter-group input[type=checkbox] {
        display: none;
    }

    .filter-group input[type=checkbox] + label {
        background-color: #3386c0;
        display: block;
        cursor: pointer;
        padding: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    }

    .filter-group input[type=checkbox] + label {
        background-color: #3386c0;
        text-transform: capitalize;
    }

    .filter-group input[type=checkbox] + label:hover,
    .filter-group input[type=checkbox]:checked + label {
        background-color: #4ea0da;
    }

    .filter-group input[type=checkbox]:checked + label:before {
        content: '✔';
        margin-right: 5px;
    }
</style>
<div id='map'></div>
<nav id='filter-group' class='filter-group'></nav>

<script>

var places = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "icon": "triangle",
        "description": "<strong>Textile Mills</strong> in the <a href=\"https://duckduckgo.com/?q=us+textile+mills\" target=\"_blank\">United States</a>.<p>Services offered<p>Material we work with<p>Minimums<p>Contact - 858 555 1212."
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -78.44238281249999,
          35.92464453144099
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "icon": "triangle",
        "description": "<strong>Textile Mills</strong> in the <a href=\"https://duckduckgo.com/?q=us+textile+mills\" target=\"_blank\">United States</a>.<p>Services offered<p>Material we work with<p>Minimums<p>Contact - 858 555 1212."
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -71.3671875,
          42.65012181368022
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "icon": "triangle",
        "description": "<strong>Textile Mills</strong> in the <a href=\"https://duckduckgo.com/?q=us+textile+mills\" target=\"_blank\">United States</a>.<p>Services offered<p>Material we work with<p>Minimums<p>Contact - 858 555 1212."
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -82.44140625,
          41.244772343082076
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "icon": "triangle",
        "description": "<strong>Textile Mills</strong> in the <a href=\"https://duckduckgo.com/?q=us+textile+mills\" target=\"_blank\">United States</a>.<p>Services offered<p>Material we work with<p>Minimums<p>Contact - 858 555 1212."
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -92.2412109375,
          46.73986059969267
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "icon": "triangle",
        "description": "<strong>Textile Mills</strong> in the <a href=\"https://duckduckgo.com/?q=us+textile+mills\" target=\"_blank\">United States</a>.<p>Services offered<p>Material we work with<p>Minimums<p>Contact - 858 555 1212."
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -96.94335937499999,
          32.95336814579932
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "icon": "triangle",
        "description": "<strong>Textile Mills</strong> in the <a href=\"https://duckduckgo.com/?q=us+textile+mills\" target=\"_blank\">United States</a>.<p>Services offered<p>Material we work with<p>Minimums<p>Contact - 858 555 1212."
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -119.7509765625,
          39.67337039176558
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "icon": "triangle",
        "description": "<strong>Textile Mills</strong> in the <a href=\"https://duckduckgo.com/?q=us+textile+mills\" target=\"_blank\">United States</a>.<p>Services offered<p>Material we work with<p>Minimums<p>Contact - 858 555 1212."
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -116.19140625,
          43.739352079154706
        ]
      }
    }
  ]
};

var filterGroup = document.getElementById('filter-group');
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-77.04, 38.907],
    zoom: 2
});



map.on('load', function() {
    // Add a GeoJSON source containing place coordinates and information.
    map.addSource("places", {
        "type": "geojson",
        "data": places
    });

    places.features.forEach(function(feature) {
        var symbol = feature.properties['icon'];
        var layerID = 'poi-' + symbol;

        // Add a layer for this symbol type if it hasn't been added already.
        if (!map.getLayer(layerID)) {
            map.addLayer({
                "id": layerID,
                "type": "symbol",
                "source": "places",
                "layout": {
                    "icon-image": symbol + "-15",
                    "icon-allow-overlap": true
                },
                "filter": ["==", "icon", symbol]
            });

            // Add checkbox and label elements for the layer.
            var input = document.createElement('input');
            input.type = 'checkbox';
            input.id = layerID;
            input.checked = true;
            filterGroup.appendChild(input);

            var label = document.createElement('label');
            label.setAttribute('for', layerID);
            label.textContent = symbol;
            filterGroup.appendChild(label);

            // When the checkbox changes, update the visibility of the layer.
            input.addEventListener('change', function(e) {
                map.setLayoutProperty(layerID, 'visibility',
                    e.target.checked ? 'visible' : 'none');
            });
        }
    });
});


map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ["poi-triangle"] });

    if (!features.length) {
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    var popup = new mapboxgl.Popup()
        .setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.description)
        .addTo(map);
});
</script>
