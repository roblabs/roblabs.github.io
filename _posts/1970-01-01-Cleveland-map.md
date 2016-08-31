---
layout: map
title:  "Cleveland National Forest"
description: "Mapbox map of Cleveland National Forest Trails"
date:   2016-07-12T12:20:46-08:00
author: ePi Rational, Inc.
categories: [Mapbox, Paper Maps,]
tags: [Mapbox, Paper Maps]
permalink: /Cleveland/map/
---

<div id='map'></div>
<div id='zoom-level'>Zoom, Lat, Lng</div>

<script>

var bounds = [     // WSEN
    [-116.9,32.6], // Southwest coordinates
    [-116.4,33.0]  // Northeast coordinates
];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/roblabs/ciqk2376r000lb9m98hmyzwr7',
    zoom: 13,
    minZoom: 7,
    maxZoom: 14.9,
    center: [-116.4317, 32.8611, 11],
    maxBounds: bounds
});

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
