---
layout: post
title:  "Pragmatic GeoJSON"
description: ""
date:   2016-12-08T00:00:00-08:00
author: roblabs
categories: ["command line cartography"]
tags: [geojson]
excerpt: "Learn GeoJSON by visualizing your data"
youtube: NYqCUVDlq9E
excerpt_img: "/assets/img/Pragmatic-GeoJSON-10sec-480.gif"
excerpt_img_comment: "gifify Pragmatic-GeoJSON.mov -o Pragmatic-GeoJSON-10sec-480.gif --from 76 --to 86 --resize 480:-1 --speed 2"
---

## GeoJSON
GeoJSON is an [industry standard](https://tools.ietf.org/html/rfc7946#section-1.5) way of representing geodata in points, lines and polygons.

There are several great tools for the command line and browsers that you can use to wrangle your geodata.

### GeoJSON example

``` javascript
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Point Loma"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -117.241287,
          32.669870
        ]
      }
    }
  ]
}
```

### GeoJSON.io

[GeoJSON.io](http://geojson.io) _is a quick, simple tool for creating, viewing, and sharing maps._

Things to try

* Add a new Point, Line or Polygon
* Set properties like color and name by hand or by clicking on a point
* Menu items like File, Save, New, Random


### Generate Random GeoJSON

Generating random geodata can be useful as it gives you a way to correctly generate and use the tools.

```
# Install with node.js
npm install --global geojson-random

# generate three random Points
geojson-random 3
geojson-random > a.json
```


### GeoJSON.io from the command line

The makers of GeoJSON.io have made some great command line interface (CLI) tools.

```
# Install with node.js
npm install --global geojsonio-cli

# launch geojson.io with the contents of a.json
geojsonio a.json

# generate 100 random points, pipe (|) the results to the geojsonio CLI
geojson-random 100 | geojsonio
```

### Merge GeoJSON

Once you have GeoJSON in memory or on disk, you can merge two files

```
# Install with node.js
npm install --global geojson-merge

# generate two files with Random points, and merge them
geojson-random 3 > a.json
geojson-random 3 > b.json
geojson-merge a.json b.json
geojson-merge a.json b.json | geojsonio
```


### GeoJSON Precision of coordinates

#### Six decimal points ought to be enough for anybody.

The GeoJSON [specification](https://tools.ietf.org/html/rfc7946#section-11.2) has a great discussion about precision that is worth quoting.  

_For geographic
   coordinates with units of degrees, 6 decimal places ...
   amounts to about 10 centimeters, a precision well
   within that of current GPS systems.  Implementations should consider
   the cost of using a greater precision than necessary._

#### awesome
Links to other awesome stuff

* [Node.js](/awesome/#node)
* [geojsonio](/awesome/#geojsonio)
* [geojson-random](/awesome/#geojson-random)
