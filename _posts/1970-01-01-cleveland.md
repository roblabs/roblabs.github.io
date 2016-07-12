---
layout: post
title:  "Cleveland National Forest"
description: "Mapbbox map of Cleveland National Forest Trails"
date:   2016-07-12T12:20:46-08:00
author: ePi Rational, Inc.
categories: [Mapbox, Paper Maps,]
tags: [Mapbox, Paper Maps]
permalink: /Cleveland/
---
<html>
<head>
    <meta charset='utf-8' />
    <title></title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.20.1/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.20.1/mapbox-gl.css' rel='stylesheet' />
    <style>
        body { margin:0; padding:0; }
        #map { position:absolute; top:0; bottom:0; width:100%; }
    </style>
</head>
<body>

<style>
    #menu {
        position: relative;
        background: #fff;
        padding: 10px;
        font-family: 'Open Sans', sans-serif;
    }
</style>

<div id='map'></div>
<!-- <div id='menu'>
    <input id='ciqk2376r000lb9m98hmyzwr7' type='radio' name='rtoggle' value='ciqk2376r000lb9m98hmyzwr7' checked='checked'>
    <label for='basic'>Terrain</label>
    <input id='ciq02fkln0029cam150q00h3h' type='radio' name='rtoggle' value='ciq02fkln0029cam150q00h3h'>
    <label for='satellite'>Mataguay Satellite</label>
</div> -->
<script>
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ibGFicyIsImEiOiJwVlg0cnZnIn0.yhekddtKwZohGoORaWjqIw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/roblabs/ciqk2376r000lb9m98hmyzwr7',
    zoom: 9,
    center: [-116.4481389909246,32.800675247049625]
});

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

</body>
</html>
