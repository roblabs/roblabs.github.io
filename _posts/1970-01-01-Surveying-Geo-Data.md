---
layout: post
title:  "Surveying Geo Data"
description: ""
excerpt: "GeoJSON to ndjson"
date:   2017-06-24T00:20:46-08:00
author: ePi Rational, Inc.
---

* Take Screen capture of iOS Compass app
* Take photos with iPhone
* export files to disk


## EXIF for a Photo
* Model               |iPhone SE
* Exif Version        |Exif Version 2.21

```
# Machine readble format
exif - m IMG_0524.JPG  | grep tude

# XML format
exif -x IMG_0530.JPG

# XML to JSON
XML_FILTER=exif
IMG=IMG_0514.JPG
exif -x  $IMG | xml-json $XML_FILTER > exif.json
./cli.js exif.json > exif.geojson
cat exif.geojson | json features


# JSON In-place editing
json -I -f exif.json -e 'this.Image_File="$IMG"'

#  echo < json -I -f exif.json json -e this.Image_File="$IMG\"\'
```

```
Latitude            |33, 12, 4.37
Longitude           |116, 39, 8.93
Altitude Reference  |Sea level
Altitude            |1028.17
```


### Convert latitude and longitude to decimal
* `Latitude            |33, 12, 4.37`
  * `  33 + 12/60 + 4.37/(60*60)`
* `Longitude           |116, 39, 8.93`
  * `  -1 * ( 116 + 39/60 + 8.93 / (60*60))`
