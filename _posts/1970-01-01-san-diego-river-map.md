---
layout: map
title:  ""
description: ""
date:   2017-01-01T12:20:46-08:00
author: ePi Rational, Inc.
categories: [Mapbox, Paper Maps,]
permalink: /san-diego-river/map/
---


<div id="map" class="map"></div>



<script>

var bounds = [     // WSEN
    [-118.01146,32.26936], // Southwest coordinates
    [-115.78124,33.74340]  // Northeast coordinates
];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/roblabs/cj0x6x1ig00el2rqrp6ep4agm',
    zoom: 9.5,
    minZoom: 9,
    maxZoom: 13.1,
    center: [-116.868, 32.879],
    maxBounds: bounds
});

map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());


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
