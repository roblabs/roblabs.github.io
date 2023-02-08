---
layout: post
title:  "Adding GeoJSON to a Mapbox Style"
description: ""
date:   2016-12-13T00:00:00-08:00
author: roblabs
categories: [mapbox]
tags: [🗺️]

excerpt: "Add your own geo data to your Mapbox Style"
youtube: 98qZUAeaMmc
excerpt_img: "/assets/img/GeoJSON-to-Mapbox-Styles-480.gif"
#excerpt_img_comment: "gifify Adding\ GeoJSON\ to\ a\ Mapbox\ Style.mov -o GeoJSON-to-Mapbox-Styles-480.gif --from 482 --to 505 --resize 480:-1 --speed 2"
---

## Add your own Geo Data
In previous posts we talked about [Mapbox Styles](/mapbox/2016/12/12/Mapbox-Styles/) and [GeoJSON](/geojson/2016/12/08/Pragmatic-GeoJSON/).

Now we want to put these two concepts together.  Suppose we have a GeoJSON that contains points of interest in Flagstaff, Arizona.  One of the features is the tallest peak in the Coconino National Forest.



```javascript
{
  "type": "Feature",
  "properties": {
    "name": "Humphreys Peak"
  },
  "geometry": {
    "coordinates": [
      -111.677946,
      35.346362
    ],
    "type": "Point"
  }
}
```


### Mapbox Studio

Steps to add this GeoJSON into [Mapbox.com/studio](http://Mapbox.com/studio) and style this point feature directly in Studio.

* You can drag your GeoJSON directly into studio
* Navigate to Datasets and drag your GeoJSON directly into the Datasets view
* Once its uploaded, click on `Start editing`
* Look around the Datasets view and add any Points, LinesStrings or Polygons you want
* Save and export to a Tileset
* View the Tileset and click on `Add to Style`
* Choose an existing or new style



#### For example

* Add our Points as either a `Circle` or a `Symbol`.  Do this so you can see the difference between these two types
* Be sure to access the properties of your data set.  In our case we can access the Feature `name`
* Adjust properties for `Color`, `Halo color` and `Halo width` to give a great label effect
* See a live sample at [CodePen.io/roblabs](http://codepen.io/roblabs/full/Mbzaqa/)

See how it looks in

* Streets Mapbox Style
* Satellite + Streets Mapbox Style
* Outdoors Mapbox Style

![GeoJSON-to-Mapbox-Styles-480.gif](/assets/img/GeoJSON-to-Mapbox-Styles-480.gif)
