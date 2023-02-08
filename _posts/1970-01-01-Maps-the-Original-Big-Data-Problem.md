---
layout: post
title:  "Maps - the Original Big Data Problem"
description: ""
date:   2017-01-17T02:30:00-08:00
author: RobLabs
categories: [talk, android]
tags: [🎙️,🤖]
excerpt: "Talk presented for the San Diego Android Meetup"
excerpt_img: "/assets/img/Architecture-for-Mobile-Maps.png"
permalink: /talk/Jan-17-2017-SD-Android
---


### Maps — the original data visualization solution

No matter how you describe a map, it is probably one of the top ten used apps on your mobile device. Consider how much land or square kilometers a paper map covers.  Add in a mobile device and GPS receiver, and a location that has no data signal and you have solid compelling product for traversing the back country with a mobile map.  The talk will focus around making a back country hiking map for iOS and Android based on US Forest Service maps that are freely available.  

This talk is about the power of maps for mobile.  Rob will discuss the data wrangling and image processing of making a map for mobile using open source technologies such as Mapbox, GDAL, GeoJSON, and WEBP.


#### Intro
* [Maps for Android](/assets/img/map-apps.png)
* [Mt Whitney Map, take 1](https://twitter.com/e_Pi_Rational/status/737798201080586240)
* [Mapbox Mobile](https://www.mapbox.com/mobile/)
* Mount Whitney Map, take 2 [http://RobLabs.com/MtW](http://RobLabs.com/MtW)
* Cleveland National Forest [http://RobLabs.com/Cleveland](http://RobLabs.com/Cleveland)
* Coconino National Forest [http://RobLabs.com/flag](http://RobLabs.com/flag)
* Joshua Tree National Park [http://RobLabs.com/jotr](http://RobLabs.com/jotr)
* @[e_pi_rational](https://twitter.com/e_pi_rational)

-----

### Architecture for Mobile Maps

![architecture](/assets/img/Architecture-for-Mobile-Maps.png)

-----

### Data Wrangling

#### Background and Definitions

* GeoTIFF — a ​TIFF based interchange format for georeferenced raster imagery.
* Tiles — "web maps are made up of many small, square images called tiles. These tiles ... are placed side-by-side in order to create the illusion of a very large seamless image."    Source:  [Mapbox.com](https://www.mapbox.com/help/how-web-maps-work/#tiles-and-zoom-levels)
* MBTiles — "The MBTiles specification is an efficient format for storing millions of tiles in a single SQLite database."  Source:  [Mapbox.com](https://www.mapbox.com/help/an-open-platform/#storing-tiles)

-----

#### Finding GeoTIFFs

* [FSTopo](https://data.fs.usda.gov/geodata/rastergateway/states-regions/quad-index.php) — US Forest Service (USFS) Map images ![USFS](https://data.fs.usda.gov/geodata/css/logofs.gif)
* [US Topo](https://nationalmap.gov/ustopo/index.html) — US Topo from US Geological Survey (USGS) ![](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/USGS_logo_green.svg/160px-USGS_logo_green.svg.png)
* [NPS Topo](https://www.nps.gov/jotr/planyourvisit/maps.htm) — National Park Service (NPS) has maps as well.

-----

#### Processing GeoTIFFs

* Processing of GeoTIFFS makes use of the [GDAL](/awesome/#geospatial-data-abstraction-library-gdal) tools from the Open Source Geospatial Foundation (OSGEO) ![OSGEO](https://avatars2.githubusercontent.com/u/1058467?v=3&s=200)
* `gdalwarp`, `gdal_translate`, `gdal2tiles.py` and `mb-util`
* gdal2tiles.py has open source enhancements for parallel processing and [WEBP](https://developers.google.com/speed/webp/) compression.  [https://github.com/roblabs/gdal2tilesp](https://github.com/roblabs/gdal2tilesp)
* Can run as a full Docker Container ![Docker](https://avatars2.githubusercontent.com/u/5429470?v=3&s=200)

##### Command Line Cartography


``` bash
# fetch
wget http://data.fs.usda.gov/geodata/rastergateway/data/36118/fstopo/363011815_Mount_Whitney_FSTopo.tif

# Set projection for web mercator
gdalwarp -t_srs EPSG:3857 363011815_Mount_Whitney_FSTopo.tif MtW.3857.tif

# expand to a VRT format
gdal_translate -of vrt -expand rgba MtW.3857.tif MtW.3857.vrt

# cut into tiles
gdal2tilesp.py -z 7-15 -p mercator -f WEBP MtW.3857.vrt MtW

# store in MBTiles
mb-util MtW MtW.mbtiles
```

-----

#### Live Demo
![Demo](/assets/img/Mtw-Demo-Android-talk.gif)

-----

##### Big data (in megabytes)

File | MB
--- | ---:
One PDF | 2
One GeoTIFF (LZW)| 12
One Uncompressed GeoTIFF | 109
Mosaic GeoTIFF (VRT) | 3,600
MBTiles (PNG) | 318
MBTiles (WEBP) | 103

### __

-----

#### Bio

Rob Chohan loves maps.  Rob is taking his background in statistics, image processing, mobile imaging, and printing to create innovations in maps for mobile.  Rob currently works for ePi Rational, Inc., a San Diego based startup creating innovations in cartography, data visualization, mobile, and geoinformatics.  ePi focuses on 'data wrangling' to tell a story about a location.  Rob has a Bachelor of Science in Mathematics and a Master of Science in Statistics, both from Oregon State University.  He has two patents related to calibration of imaging devices.

#### Presented for the San Diego Android Meetup

* Tuesday, January 17, 2017, 5:30 PM
* [https://www.meetup.com/Android-Developers-Group/events/236830533/](https://www.meetup.com/Android-Developers-Group/events/236830533/)


[ios]:      https://itunes.apple.com/us/developer/epi-rational-inc./id416401310
[android]:  /android

[tsg]:  http://www.timestampgenerator.com
