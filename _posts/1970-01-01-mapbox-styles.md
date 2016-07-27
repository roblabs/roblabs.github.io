---
layout: map
title:  "Rob | Labs Mapbox Styles"
description: "Mapbox map of our Styles"
date:   2016-07-13T12:20:46-08:00
author: ePi Rational, Inc.
categories: [Mapbox, Paper Maps]
tags: [Mapbox, Paper Maps]
permalink: /Mapbox/
---



<div id='map'></div>
<div id='zoom-level'>Zoom, Lat, Lng</div>
<div id='menu'>
    <input id='ciqk2376r000lb9m98hmyzwr7' type='radio' name='rtoggle' value='ciqk2376r000lb9m98hmyzwr7' checked='checked'>
      <label for='basic'>US Forest Service Trails</label>

    <input id='ciomh54ic000kbolza4305pev' type='radio' name='rtoggle' value='ciomh54ic000kbolza4305pev'>
      <label for='satellite'>eπ Maps</label>

    <input id='cijabgr8g00200alte02kse28' type='radio' name='rtoggle' value='cijabgr8g00200alte02kse28'>
      <label for='basic'>San Diego Hikes — Raster</label>  

    <input id='cin0nh354000yahm63vt2sjnn' type='radio' name='rtoggle' value='cin0nh354000yahm63vt2sjnn'>
      <label for='satellite'>Surf — Mapbox Streets V7 + Vector Terrain V2</label>

</div>
<script>
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/roblabs/ciqk2376r000lb9m98hmyzwr7',
    zoom: 9,
    center: [-116.641194, 33.199951]
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

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/roblabs/' + layerId);
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}
</script>
