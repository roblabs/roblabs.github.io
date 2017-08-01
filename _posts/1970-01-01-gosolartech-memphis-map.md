---
layout: map
title:  "Cleveland National Forest"
description: "Mapbox map of Cleveland National Forest Trails"
date:   2016-07-12T12:20:46-08:00
author: ePi Rational, Inc.
categories: [Mapbox, Paper Maps,]
tags: [Mapbox, Paper Maps]
permalink: /memphis/map/
---

<style>

</style>

<div id="map" class="map"></div>


<div id='zoom-level'>Zoom, Lat, Lng</div>

<script>

var bounds = [     // WSEN
    [-117.3,32.55], // Southwest coordinates
    [-116.3,33.1]  // Northeast coordinates
];

var map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/roblabs/cj5sy8efq452b2sr1ekqm0jpn",
    center: [ -89.962133, 35.018770],
    zoom: 11.1
});

map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
map.addControl(new mapboxgl.NavigationControl(), 'top-left');


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
