---
layout: page
title:  "OpenMapTiles"
description: "foss4g 2017"
date:   2017-10-20T12:20:46-08:00
author: Rob Labs
categories: [Mapbox, Paper Maps]
tags: [Mapbox, Paper Maps]
permalink: /osm-random-walk/
excerpt: "A Random Walk with OpenStreetMap"
#excerpt_img:
---

# A Random Walk with Mobile OpenStreetMap

## Uses

* Mobile
  * Humanitarian and Health
  * Tourism
  * Field Research
* No or low bandwidth
  * Backcountry Hiking or Equestrian
  * Museums
  * Kiosks
  * Meetings and Conferences

## Random

* [Vector Tiles](https://2017.stateofthemap.us/program/vector-tiles.html)
* [pbf](https://www.mapbox.com/vector-tiles/specification/#format)
* [mbtiles](https://github.com/mapbox/mbtiles-spec#mbtiles-specification)
* [tileserver-gl](http://tileserver.org/)
* [Tegola](http://tegola.io)


## Non-Random

* Walking in town



## Links

1. [Intro to OpenMapTiles](https://openmaptiles.org/about)
1. [Commercial OpenMapTiles](https://openmaptiles.com/downloads/planet)
1. [TileServer GL](https://openmaptiles.org/docs)
  * `docker run -it -v $(pwd):/data -p 8080:80 klokantech/tileserver-gl`

### Other Sources of data
* [Geofabrik extract of Colorado](http://download.geofabrik.de/north-america/us/colorado.html)
* [HOT Export Tool](https://export.hotosm.org)
  * [Workshop](https://2017.stateofthemap.us/program/hot-export-tool.html) at 2017 SOTM.us

### Making your own OpenMapTiles

1.If you already have an MBTile, the you can generate your own  [extracts](https://openmaptiles.org/docs/generate/create-custom-extract/)  with `tilelive`
1. [Generate your own](https://openmaptiles.org/docs/generate/generate-openmaptiles/)
  * Recommend running Docker
  * on [Amazon Web Services](https://amazonlightsail.com/)

  ```
  Last login: Wed Oct 11 23:29:08 2017 from 10.1.0.13

         __|  __|_  )
         _|  (     /   Amazon Linux AMI
        ___|\___|___|

  https://aws.amazon.com/amazon-linux-ami/2017.09-release-notes/
  [ec2-user@ip-172-6-7-8 ~]
  ```
