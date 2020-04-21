---
layout: post
title:  "Exif and Using Images for Surveying"
description: ""
excerpt: "Use Exif data in your JPEG from your iPhone to capture Geo Data"
date:   2020-04-20T00:20:46-08:00
permalink: /exif/
author: ePi Rational, Inc.
excerpt_img: "https://user-images.githubusercontent.com/118112/79913233-23803200-83d8-11ea-8322-8693af2229a5.png"
---

Exif is metadata about your camera and position while taking a photo.  The Exif specification, [https://www.exif.org/Exif2-2.PDF](https://www.exif.org/Exif2-2.PDF), was originally designed for the metadata around your camera (type, f/stop, manufacturer, whether the flash fired or not).  The Exif specification includes writing of GPS attributes.

* [Wikipedia](https://en.wikipedia.org/wiki/Exif)
> **Ex**changeable **i**mage **f**ile format (officially **Exif**) is a standard that specifies the formats for images, sound, and ancillary tags used by digital cameras (including smartphones), scanners and other systems handling image and sound files recorded by digital cameras.


<img width="800" alt="exif" src="https://user-images.githubusercontent.com/118112/79913233-23803200-83d8-11ea-8322-8693af2229a5.png">


---


### Install on macOS

Install the command line tool, `exif`, for macOS using `brew`.

* [https://formulae.brew.sh/formula/exif#default](https://formulae.brew.sh/formula/exif#default)
* `brew install exif`

#### Sample Usage

```
# Output in a machine-readable (tab delimited) format
#   All the 'tudes'
exif -m IMG_0288.jpeg  | grep tude
```

```
North or South Latitude	N
Latitude	32, 44, 51.09
East or West Longitude	W
Longitude	116, 39, 57.85
Altitude Reference	Sea level
Altitude	746.6
```

### Convert latitude and longitude to decimal

* Proper calculation would require using the tags for "North or South Latitude" & "East or West Longitude"
* `Latitude            |32, 44, 51.09`
  * `  32 + 44/60 + 51.09 / (60*60)`
* `Longitude           |116, 39, 57.85`
  * `  -1 * ( 116 + 39/60 + 57.85 / (60*60))`

### Output Exif in XML or JSON
```
XML_FILTER=exif
IMG=IMG_0288.jpeg

# Output in a XML format
exif -x $IMG > exif.xml

# convert XML to JSON using Node tool
npm install xml-json -g   # do this once

exif -x $IMG | xml-json $XML_FILTER > exif.json
```

#### XML Sample

```xml
<exif>
	<Manufacturer>Apple</Manufacturer>
	<Model>iPhone SE</Model>
  ...
  <North_or_South_Latitude>N</North_or_South_Latitude>
  <Latitude>32, 44, 51.09</Latitude>
  <East_or_West_Longitude>W</East_or_West_Longitude>
  <Longitude>116, 39, 57.85</Longitude>
  <Altitude_Reference>Sea level</Altitude_Reference>
  <Altitude>746.6</Altitude>
  <Speed_Unit>K</Speed_Unit>
  <Speed_of_GPS_Receiver> 0</Speed_of_GPS_Receiver>
  <GPS_Image_Direction_Reference>T</GPS_Image_Direction_Reference>
  <GPS_Image_Direction>18.19461</GPS_Image_Direction>
  <GPS_Date>2020:04:19</GPS_Date>
</exif>
```

---


#### JSON Sample
```json
{
"North_or_South_Latitude": "N",
"Latitude": "32, 44, 51.09",
"East_or_West_Longitude": "W",
"Longitude": "116, 39, 57.85",
"Altitude_Reference": "Sea level",
"Altitude": "746.6",
"Speed_Unit": "K",
"Speed_of_GPS_Receiver": "0",
"GPS_Image_Direction_Reference": "T",
"GPS_Image_Direction": "18.19461",
"GPS_Date": "2020:04:19"
}
```

---

### Description of Tags sorted by IFD

#### IFD=0
```
#
IFD=0
for tag in 0x010f 0x0110 0x011a 0x011b 0x0128 0x0131 0x0132
do
  exif -s -t=$tag --ifd=$IFD IMG_0288.jpeg
done
```

> ```
Tag 'Manufacturer' (0x010f, 'Make'): The manufacturer of the recording equipment. This is the manufacturer of the DSC, scanner, video digitizer or other equipment that generated the image. When the field is left blank, it is treated as unknown.
Tag 'Model' (0x0110, 'Model'): The model name or model number of the equipment. This is the model name or number of the DSC, scanner, video digitizer or other equipment that generated the image. When the field is left blank, it is treated as unknown.
Tag 'X-Resolution' (0x011a, 'XResolution'): The number of pixels per <ResolutionUnit> in the <ImageWidth> direction. When the image resolution is unknown, 72 [dpi] is designated.
Tag 'Y-Resolution' (0x011b, 'YResolution'): The number of pixels per <ResolutionUnit> in the <ImageLength> direction. The same value as <XResolution> is designated.
Tag 'Resolution Unit' (0x0128, 'ResolutionUnit'): The unit for measuring <XResolution> and <YResolution>. The same unit is used for both <XResolution> and <YResolution>. If the image resolution is unknown, 2 (inches) is designated.
Tag 'Software' (0x0131, 'Software'): This tag records the name and version of the software or firmware of the camera or image input device used to generate the image. The detailed format is not specified, but it is recommended that the example shown below be followed. When the field is left blank, it is treated as unknown.
Tag 'Date and Time' (0x0132, 'DateTime'): The date and time of image creation. In this standard (EXIF-2.1) it is the date and time the file was changed.
```

#### IFD=GPS
```
#
IFD=GPS
for tag in 0x0000 0x0001 0x0002 0x0003 0x0004 0x0005 0x0006 0x000c 0x000d 0x0010 0x0011 0x001d
do
  exif -s -t=$tag --ifd=$IFD IMG_0288.jpeg
done

```

> ```
Tag 'GPS Tag Version' (0x0000, 'GPSVersionID'): Indicates the version of <GPSInfoIFD>. The version is given as 2.0.0.0. This tag is mandatory when <GPSInfo> tag is present. (Note: The <GPSVersionID> tag is given in bytes, unlike the <ExifVersion> tag. When the version is 2.0.0.0, the tag value is 02000000.H).
Tag 'North or South Latitude' (0x0001, 'GPSLatitudeRef'): Indicates whether the latitude is north or south latitude. The ASCII value 'N' indicates north latitude, and 'S' is south latitude.
Tag 'Latitude' (0x0002, 'GPSLatitude'): Indicates the latitude. The latitude is expressed as three RATIONAL values giving the degrees, minutes, and seconds, respectively. When degrees, minutes and seconds are expressed, the format is dd/1,mm/1,ss/1. When degrees and minutes are used and, for example, fractions of minutes are given up to two decimal places, the format is dd/1,mmmm/100,0/1.
Tag 'East or West Longitude' (0x0003, 'GPSLongitudeRef'): Indicates whether the longitude is east or west longitude. ASCII 'E' indicates east longitude, and 'W' is west longitude.
Tag 'Longitude' (0x0004, 'GPSLongitude'): Indicates the longitude. The longitude is expressed as three RATIONAL values giving the degrees, minutes, and seconds, respectively. When degrees, minutes and seconds are expressed, the format is ddd/1,mm/1,ss/1. When degrees and minutes are used and, for example, fractions of minutes are given up to two decimal places, the format is ddd/1,mmmm/100,0/1.
Tag 'Altitude Reference' (0x0005, 'GPSAltitudeRef'): Indicates the altitude used as the reference altitude. If the reference is sea level and the altitude is above sea level, 0 is given. If the altitude is below sea level, a value of 1 is given and the altitude is indicated as an absolute value in the GSPAltitude tag. The reference unit is meters. Note that this tag is BYTE type, unlike other reference tags.
Tag 'Altitude' (0x0006, 'GPSAltitude'): Indicates the altitude based on the reference in GPSAltitudeRef. Altitude is expressed as one RATIONAL value. The reference unit is meters.
Tag 'Speed Unit' (0x000c, 'GPSSpeedRef'): Indicates the unit used to express the GPS receiver speed of movement. 'K', 'M' and 'N' represent kilometers per hour, miles per hour, and knots.
Tag 'Speed of GPS Receiver' (0x000d, 'GPSSpeed'): Indicates the speed of GPS receiver movement.
Tag 'GPS Image Direction Reference' (0x0010, 'GPSImgDirectionRef'): Indicates the reference for giving the direction of the image when it is captured. 'T' denotes true direction and 'M' is magnetic direction.
Tag 'GPS Image Direction' (0x0011, 'GPSImgDirection'): Indicates the direction of the image when it was captured. The range of values is from 0.00 to 359.99.
Tag 'GPS Date' (0x001d, 'GPSDateStamp'): A character string recording date and time information relative to UTC (Coordinated Universal Time). The format is "YYYY:MM:DD". The length of the string is 11 bytes including NULL.
```

---

### List Tags

```
# List all EXIF tags
exif --list-tags IMG_0288.jpeg > list-tags.txt
```

> ```
EXIF tags in 'IMG_0288.jpeg':                  0      1    EXIF    GPS  Interop
0x0000 GPS Tag Version                         -      -      -      -      -   
0x0001 Interoperability Index                  -      -      -      *      -   
0x0002 Interoperability Version                -      -      -      *      -   
0x0003 East or West Longitude                  -      -      -      *      -   
0x0004 Longitude                               -      -      -      *      -   
0x0005 Altitude Reference                      -      -      -      *      -   
0x0006 Altitude                                -      -      -      *      -   
0x0007 GPS Time (Atomic Clock)                 -      -      -      -      -   
0x0008 GPS Satellites                          -      -      -      -      -   
0x0009 GPS Receiver Status                     -      -      -      -      -   
0x000a GPS Measurement Mode                    -      -      -      -      -   
0x000b Measurement Precision                   -      -      -      -      -   
0x000c Speed Unit                              -      -      -      *      -   
0x000d Speed of GPS Receiver                   -      -      -      *      -   
0x000e Reference for direction of movement     -      -      -      -      -   
0x000f Direction of Movement                   -      -      -      -      -   
0x0010 GPS Image Direction Reference           -      -      -      *      -   
0x0011 GPS Image Direction                     -      -      -      *      -   
0x0012 Geodetic Survey Data Used               -      -      -      -      -   
0x0013 Reference For Latitude of Destination   -      -      -      -      -   
0x0014 Latitude of Destination                 -      -      -      -      -   
0x0015 Reference for Longitude of Destinatio   -      -      -      -      -   
0x0016 Longitude of Destination                -      -      -      -      -   
0x0017 Reference for Bearing of Destination    -      -      -      -      -   
0x0018 Bearing of Destination                  -      -      -      -      -   
0x0019 Reference for Distance to Destination   -      -      -      -      -   
0x001a Distance to Destination                 -      -      -      -      -   
0x001b Name of GPS Processing Method           -      -      -      -      -   
0x001c Name of GPS Area                        -      -      -      -      -   
0x001d GPS Date                                -      -      -      *      -   
0x001e GPS Differential Correction             -      -      -      -      -   
0x00fe New Subfile Type                        -      -      -      -      -   
0x0100 Image Width                             -      -      -      -      -   
0x0101 Image Length                            -      -      -      -      -   
0x0102 Bits per Sample                         -      -      -      -      -   
0x0103 Compression                             -      -      -      -      -   
0x0106 Photometric Interpretation              -      -      -      -      -   
0x010a Fill Order                              -      -      -      -      -   
0x010d Document Name                           -      -      -      -      -   
0x010e Image Description                       -      -      -      -      -   
0x010f Manufacturer                            *      -      -      -      -   
0x0110 Model                                   *      -      -      -      -   
0x0111 Strip Offsets                           -      -      -      -      -   
0x0112 Orientation                             -      -      -      -      -   
0x0115 Samples per Pixel                       -      -      -      -      -   
0x0116 Rows per Strip                          -      -      -      -      -   
0x0117 Strip Byte Count                        -      -      -      -      -   
0x011a X-Resolution                            *      -      -      -      -   
0x011b Y-Resolution                            *      -      -      -      -   
0x011c Planar Configuration                    -      -      -      -      -   
0x0128 Resolution Unit                         *      -      -      -      -   
0x012d Transfer Function                       -      -      -      -      -   
0x0131 Software                                *      -      -      -      -   
0x0132 Date and Time                           *      -      -      -      -   
0x013b Artist                                  -      -      -      -      -   
0x013e White Point                             -      -      -      -      -   
0x013f Primary Chromaticities                  -      -      -      -      -   
0x014a SubIFD Offsets                          -      -      -      -      -   
0x0156 Transfer Range                          -      -      -      -      -   
0x0200 JPEGProc                                -      -      -      -      -   
0x0201 JPEG Interchange Format                 -      -      -      -      -   
0x0202 JPEG Interchange Format Length          -      -      -      -      -   
0x0211 YCbCr Coefficients                      -      -      -      -      -   
0x0212 YCbCr Sub-Sampling                      -      -      -      -      -   
0x0213 YCbCr Positioning                       -      -      -      -      -   
0x0214 Reference Black/White                   -      -      -      -      -   
0x02bc XML Packet                              -      -      -      -      -   
0x1000 RelatedImageFileFormat                  -      -      -      -      -   
0x1001 RelatedImageWidth                       -      -      -      -      -   
0x1002 RelatedImageLength                      -      -      -      -      -   
0x828d CFARepeatPatternDim                     -      -      -      -      -   
0x828e CFA Pattern                             -      -      -      -      -   
0x828f Battery Level                           -      -      -      -      -   
0x8298 Copyright                               -      -      -      -      -   
0x829a Exposure Time                           -      -      *      -      -   
0x829d F-Number                                -      -      *      -      -   
0x83bb IPTC/NAA                                -      -      -      -      -   
0x8649 Image Resources Block                   -      -      -      -      -   
0x8773 InterColorProfile                       -      -      -      -      -   
0x8822 Exposure Program                        -      -      *      -      -   
0x8824 Spectral Sensitivity                    -      -      -      -      -   
0x8827 ISO Speed Ratings                       -      -      *      -      -   
0x8828 Opto-Electronic Conversion Function     -      -      -      -      -   
0x882a Time Zone Offset                        -      -      -      -      -   
0x9000 Exif Version                            -      -      *      -      -   
0x9003 Date and Time (Original)                -      -      *      -      -   
0x9004 Date and Time (Digitized)               -      -      *      -      -   
0x9101 Components Configuration                -      -      *      -      -   
0x9102 Compressed Bits per Pixel               -      -      -      -      -   
0x9201 Shutter Speed                           -      -      *      -      -   
0x9202 Aperture                                -      -      *      -      -   
0x9203 Brightness                              -      -      *      -      -   
0x9204 Exposure Bias                           -      -      *      -      -   
0x9205 Maximum Aperture Value                  -      -      -      -      -   
0x9206 Subject Distance                        -      -      -      -      -   
0x9207 Metering Mode                           -      -      *      -      -   
0x9208 Light Source                            -      -      -      -      -   
0x9209 Flash                                   -      -      *      -      -   
0x920a Focal Length                            -      -      *      -      -   
0x9214 Subject Area                            -      -      *      -      -   
0x9216 TIFF/EP Standard ID                     -      -      -      -      -   
0x927c Maker Note                              -      -      *      -      -   
0x9286 User Comment                            -      -      -      -      -   
0x9290 Sub-second Time                         -      -      -      -      -   
0x9291 Sub-second Time (Original)              -      -      *      -      -   
0x9292 Sub-second Time (Digitized)             -      -      *      -      -   
0x9c9b XP Title                                -      -      -      -      -   
0x9c9c XP Comment                              -      -      -      -      -   
0x9c9d XP Author                               -      -      -      -      -   
0x9c9e XP Keywords                             -      -      -      -      -   
0x9c9f XP Subject                              -      -      -      -      -   
0xa000 FlashPixVersion                         -      -      *      -      -   
0xa001 Color Space                             -      -      *      -      -   
0xa002 Pixel X Dimension                       -      -      *      -      -   
0xa003 Pixel Y Dimension                       -      -      *      -      -   
0xa004 Related Sound File                      -      -      -      -      -   
0xa20b Flash Energy                            -      -      -      -      -   
0xa20c Spatial Frequency Response              -      -      -      -      -   
0xa20e Focal Plane X-Resolution                -      -      -      -      -   
0xa20f Focal Plane Y-Resolution                -      -      -      -      -   
0xa210 Focal Plane Resolution Unit             -      -      -      -      -   
0xa214 Subject Location                        -      -      -      -      -   
0xa215 Exposure Index                          -      -      -      -      -   
0xa217 Sensing Method                          -      -      *      -      -   
0xa300 File Source                             -      -      -      -      -   
0xa301 Scene Type                              -      -      *      -      -   
0xa302 CFA Pattern                             -      -      -      -      -   
0xa401 Custom Rendered                         -      -      -      -      -   
0xa402 Exposure Mode                           -      -      *      -      -   
0xa403 White Balance                           -      -      *      -      -   
0xa404 Digital Zoom Ratio                      -      -      -      -      -   
0xa405 Focal Length in 35mm Film               -      -      *      -      -   
0xa406 Scene Capture Type                      -      -      *      -      -   
0xa407 Gain Control                            -      -      -      -      -   
0xa408 Contrast                                -      -      -      -      -   
0xa409 Saturation                              -      -      -      -      -   
0xa40a Sharpness                               -      -      -      -      -   
0xa40b Device Setting Description              -      -      -      -      -   
0xa40c Subject Distance Range                  -      -      -      -      -   
0xa420 Image Unique ID                         -      -      -      -      -   
0xa500 Gamma                                   -      -      -      -      -   
0xc4a5 PRINT Image Matching                    -      -      -      -      -   
0xea1c Padding                                 -      -      -      -      -   
```
