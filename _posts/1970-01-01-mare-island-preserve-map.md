---
layout: map
title:  "Mare Island Preserve"
description: ""
date:   2016-07-12T12:20:46-08:00
author: ePi Rational, Inc.
categories: [Mapbox, Paper Maps,]
tags: [Mapbox, Paper Maps]
permalink: /mare-island-preserve/map/
---

<style>
#mapsmall {
  width:0px;
  height:0px;
  margin-left:0px;
  margin-top:0px;
  border:0px;
}

@media only screen and (min-width: 800px) {
    /* CSS for devices with size > min-width */
    #mapsmall {
      width:300px;
      height:300px;
      margin-left:10px;
      margin-top:10px;
      border:10px solid gray;
    }
}
</style>

<div class="big-small-map">
  <div id="map" class="map"></div>
  <div id="mapsmall" class="map"></div>
</div>

<script>

var bounds = [     // WSEN
    [-117.6,32.4], // Southwest coordinates
    [-116.8,33.3]  // Northeast coordinates
];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v10',
    zoom: 16.0,
    minZoom: 10,
    center: [-122.2546, 38.0767]
});

map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());


var mapsmall = new mapboxgl.Map({
    container: "mapsmall",
    style: "mapbox://styles/roblabs/ciomh54ic000kbolza4305pev",
    zoom: 9,
    maxZoom: 9,
    center: [-122.2546, 38.0767],
    attributionControl: false
});

mapsmall.on('load', function () {

    mapsmall.addLayer({
        "id": "route",
        "type": "line",
        "source": {
            "type": "geojson",
            "data":  routeGeojson
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#f00",
            "line-width": 4
        }
    });
});

// when either map finishes moving, trigger an update on the other one.
<!-- map.on('moveend', follow).on('zoomend', follow); -->
<!-- mapsmall.on('moveend', follow).on('zoomend', follow); -->

// quiet is a cheap and dirty way of avoiding a problem in which one map
// syncing to another leads to the other map syncing to it, and so on
// ad infinitum. this says that while we are calling sync, do not try to
// loop again and sync other maps
var quiet = false;
function follow(e) {
    if (quiet) return;
    quiet = true;
    if (e.target === map) sync(mapsmall, e);
    if (e.target === mapsmall) sync(map, e);
    quiet = false;
}

// sync simply steals the settings from the moved map (e.target)
// and applies them to the other map.
function sync(mapToSync, e) {

  mapToSync.easeTo({
    center: e.target.getCenter()
    });
}


</script>
