---
layout: map
title:  "Tombigbee NF"
description: ""
date:   2016-07-12T12:20:46-08:00
author: ePi Rational, Inc.
categories: [Mapbox, Paper Maps,]
tags: [Mapbox, Paper Maps]
permalink: /tombigbee/map/
redirect_from:
  - /tombigbee/map
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

<div id="map" class="map"></div>
<div id="mapsmall" ></div>

<script>
var wsen = [-89.25,33.125,-88.875,33.375];
var center = [-89.028, 33.240];

var bounds = [
    [wsen[0] -1.0, wsen[1] -1.0], // Southwest coordinates
    [wsen[2] +1.0, wsen[3] +1.0]  // Northeast coordinates
];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/roblabs/ciomh54ic000kbolza4305pev',
    minZoom: 7,
    zoom: 11,
    maxZoom: 15.9,
    center: center,
    maxBounds: bounds
});
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());

var mapsmall = new mapboxgl.Map({
    container: "mapsmall",
    style: "mapbox://styles/mapbox/streets-v9",
    zoom: 9,
    maxZoom: 9,
    center: center,
    maxBounds: bounds,
    attributionControl: false
});

/* ******************** */
// Small map moves
// when either map finishes moving, trigger an update on the other one.
<!-- map.on('moveend', follow).on('zoomend', follow); -->
mapsmall.on('moveend', follow).on('zoomend', follow);

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


/* ******************** */
// map move to update Lat/Long

map.on('zoomend', function(){
  ZoomOrDragEnd();
});

map.on('moveend', function(){
  ZoomOrDragEnd();
});

function ZoomOrDragEnd(){
  var zoom = map.getZoom();
  var center = map.getCenter().toArray();

  var zoomOutput = parseFloat(zoom).toFixed(2);
  var centerOutput = parseFloat(center[1]).toFixed(4) + ', ' + parseFloat(center[0]).toFixed(4);
  document.getElementById('zoom-level').innerHTML = 'Zoom, Lat, Lng:  ' + zoomOutput + ', ' + centerOutput;
}
</script>
