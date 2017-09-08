---
layout: post
title:  "Command Line Cartography with `ndjson`"
description: "Command Line Cartography with `ndjson`"
excerpt: "GeoJSON to ndjson"
date:   2017-08-01T00:20:46-08:00
author: ePi Rational, Inc.
categories: [ndjson]
permalink: /ndjson/
excerpt: "Geo data from the command line"
excerpt_img: "1970-01-01-Geo-Data-Processing-with-ndjson-GeoJSON-ndjson.png"
---

## Geo Data Processing with `ndjson`

You can convert GeoJSON to [Newline delimited JSON](http://specs.okfnlabs.org/ndjson/) for other processing.  This is an example of [Command Line Cartography](https://medium.com/@mbostock/command-line-cartography-part-2-c3a82c5c0f3), inspired by[ Mike Bostock](https://github.com/mbostock).


## Install the Command Line Interface

```bash
# Install once
#  npm install -g ndjson-cli
```


## Convert from GeoJSON

By splitting out by the key `d.features`

```bash
ndjson-cat hikes.geojson  | ndjson-split 'd.features' > hikes.ndjson
```

## Convert to GeoJSON

To convert a newline-delimited JSON stream of values to a JSON array, the inverse of ndjson-split is
[ndjson-reduce](https://github.com/mbostock/ndjson-cli/blob/master/README.md#reduce).

This command line operation
* calls `ndjson-reduce`
* reads the file `hikes.ndjson`
* pipe, `|`, the results to `ndjson-map` and *decorate* with a base GeoJSON structure
* writes the file `hikes2.geojson`


```bash
ndjson-reduce < hikes.ndjson | ndjson-map '{type: "FeatureCollection", features: d}' > hikes2.geojson
```

## Example

-----

![Geo-Data-Processing-with-ndjson](/assets/img/1970-01-01-Geo-Data-Processing-with-ndjson-GeoJSON-ndjson.png)


## KML to GeoJSON

``` bash
togeojson export.kml
togeojson export.kml > export.geojson

# Reduce file size by removing
geojson-precision export.geojson export.precision.geojson
```
