---
layout: post
title:  "Pragmatic GDAL"
description: ""
date:   2016-12-15T00:00:00-08:00
author: roblabs
categories: [gdal]
tags: [gdal]

excerpt: "Learn Geospatial data formats with GDAL"
file_under: "command line cartography"
#youtube: NYqCUVDlq9E
#excerpt_img: "Pragmatic-GeoJSON-10sec-480.gif"
#excerpt_img_comment: "gifify Pragmatic-GeoJSON.mov -o Pragmatic-GeoJSON-10sec-480.gif --from 76 --to 86 --resize 480:-1 --speed 2"
---

## GDAL
[GDAL](http://www.gdal.org) is a _translator library for raster and vector geospatial data formats_.  There are API documentation for [C and C++](http://www.gdal.org/#index_devdocs_api).  There are [Node.js bindings](https://github.com/naturalatlas/node-gdal) and [Python bindings](https://pypi.python.org/pypi/GDAL/) and a [Python cookbook](https://pcjericks.github.io/py-gdalogr-cookbook/)

There are several great tools for the command line and API's that you can use to wrangle your geodata.  The example that we will be discussing is raster GeoTIFFs from the US Forest Service [FSTopo Raster Gateway](http://data.fs.usda.gov/geodata/rastergateway/states-regions/states.php).

### `gdal-config`

You can use [`gdal-config`](http://www.gdal.org/gdal-config.html) to obtain the GDAL version

``` bash
gdal-config --version
```

or you can list the supported formats in your GDAL installation

``` bash
gdal-config --formats
```

### Learning with Mt Whitney
Since we are working straight from the command line, we can start by calling commands to fetch to our GeoTIFFs.  We have examples for `wget` and `curl`.  You can use the [FSTopo Raster Gateway](http://data.fs.usda.gov/geodata/rastergateway/states-regions/states.php) if you prefer, but you can also start with the page that shows [FSTopos](http://data.fs.usda.gov/geodata/rastergateway/states-regions/quad-index.php?blockID=36118) near [Mt Whitney](http://roblabs.com/MtW).

``` bash
wget http://data.fs.usda.gov/geodata/rastergateway/data/36118/fstopo/363011815_Mount_Whitney_FSTopo.tif

# or

curl -O http://data.fs.usda.gov/geodata/rastergateway/data/36118/fstopo/363011815_Mount_Whitney_FSTopo.tif
```

### `gdalinfo`

With [`gdalinfo`](http://www.gdal.org/gdalinfo.html) you can obtain great metadata about your file

``` bash
gdalinfo 363011815_Mount_Whitney_FSTopo.tif

# output gdalinfo in json
gdalinfo -json 363011815_Mount_Whitney_FSTopo.tif

# histogram of palette colors
gdalinfo -hist 363011815_Mount_Whitney_FSTopo.tif
```


### `gdal_translate`

Translating our GeoTIFF to other formats is useful, so we can use [`gdal_translate`](http://www.gdal.org/gdal_translate.html) to perform operations.  One caveat is that when you translate *out* of GeoTIFF, then you lose all geospatial information.

``` bash
gdal_translate -of PNG 363011815_Mount_Whitney_FSTopo.tif 363011815_Mount_Whitney_FSTopo.png

# or translate to JPEG
gdal_translate -of JPEG 363011815_Mount_Whitney_FSTopo.tif 363011815_Mount_Whitney_FSTopo.jpg
gdal_translate -of JPEG -expand rgb 363011815_Mount_Whitney_FSTopo.tif 363011815_Mount_Whitney_FSTopo.jpg

# or translate to WEBP
gdal_translate -of WEBP 363011815_Mount_Whitney_FSTopo.tif 363011815_Mount_Whitney_FSTopo.webp
gdal_translate -of WEBP -expand rgb 363011815_Mount_Whitney_FSTopo.tif 363011815_Mount_Whitney_FSTopo.webp

# or translate to uncompressed TIFF
gdal_translate -of GTIFF -expand rgb 363011815_Mount_Whitney_FSTopo.tif 363011815_Mount_Whitney_FSTopo.TIFF
```

#### awesome
Links to other awesome stuff

* [GDAL](/awesome/#geospatial-data-abstraction-library-gdal)
* [GDAL with Docker](/awesome/#gdal-in-docker)
