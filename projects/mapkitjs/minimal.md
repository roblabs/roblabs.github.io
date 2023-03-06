---
layout: mapkitjs

 #Controlling the visible portion of the map
# The visible area of the map, in map units.
#   The default value is `new mapkit.MapRect(0, 0, 1, 1)`
#   https://developer.apple.com/documentation/mapkitjs/mapkit/maprect/2973964-mapkit_maprect
#   attribute mapkit.MapRect visibleMapRect;

# The area the map is displaying.
#   attribute mapkit.CoordinateRegion region;

# The map coordinate at the center of the map view.
#   attribute mapkit.Coordinate center;
# mapkit.MapRect - https://developer.apple.com/documentation/mapkitjs/mapkit/maprect/2973964-mapkit_maprect
# mapkit.CoordinateRegion - https://developer.apple.com/documentation/mapkitjs/mapkit/coordinateregion

# #4.16/47.1750/-113.1526
zoom: 4.16
center:
  latitude: 47.1750
  longitude: -113.1526
cameraDistance: 3764652.91
origin: 
  x: 0.10579
  y: 0.29065
size:
  width:  0.1597900391
  height: 0.1207275391
span:
  latitudeDelta: 29.58200848
  longitudeDelta: 57.52441406

# The map’s rotation, in degrees.
rotation: 0

# The CSS color that MapKit JS uses for the user interface controls on the map.
tintColor:

# The type of data that the map view displays.
# Hybrid        # A satellite image of the area with road and road name layers on top.
# MutedStandard # A street map that emphasizes your data over the underlying map details.
# Satellite     # A satellite image of the area 
# Standard      # A street map that shows the position of all roads and some road names.
mapType: Standard

# A Boolean value that determines whether to display a control that lets users choose the map type.
showsMapTypeControl: true

# A Boolean value that determines whether the user may rotate the map using the compass control or a rotate gesture.
# isRotationEnabled: true

# A feature visibility setting that determines when the compass is visible.
# showsCompass

# A Boolean value that determines whether the user may zoom in and out on the map using pinch gestures or the zoom control.
isZoomEnabled: true

# A Boolean value that determines whether to display a control for zooming in and zooming out on a map.
showsZoomControl: true

# A Boolean value that determines whether the user may scroll the map with a pointing device or gestures on a touchscreen.
# isScrollEnabled: 

# A feature visibility setting that allows you to determine when to display the map’s scale.
# showsScale: 

# ---

# https://developer.apple.com/documentation/mapkitjs/mapconstructoroptions

# The language ID lets you indicate the language to use for displaying map labels,
# controls, error messages, and search and directions text. 
# A language ID consists of a language designator followed by 
# an optional region or script designator. Some examples of language IDs are:
#   * de (German)
#   * es-MX (Mexican Spanish)
#   * zh-Hans (simplified Chinese)
#   * es (Spanish)
language: es-ES

# https://developer.apple.com/documentation/mapkitjs/mapkit/tileoverlay/2974035-mapkit_tileoverlay
# The template string must be in the format: 
#   https://myserver/tile?x={x}&y={y}&z={z}&scale={scale}. 
#    JS replaces the x, y, z, and scale values depending on 
#   the displayed map region and screen resolution, 
#   then loads an image from that URL.
# Example output
# https://tile.openstreetmap.org/3/5/2.png?scale=2

# ---

# mapkit.TileOverlay
# Attributes for initializing a tile overlay, 
#   including minimum and maximum zoom, opacity, and custom data.
# https://developer.apple.com/documentation/mapkitjs/mapkit/tileoverlay/2974035-mapkit_tileoverlay
# https://developer.apple.com/documentation/mapkitjs/tileoverlayconstructoroptions
urlTemplate: https://tile.openstreetmap.org/{z}/{x}/{y}.png?scale={scale}
minimumZ: 0
maximumZ: 15
opacity: 0.5

# https://developer.apple.com/documentation/mapkitjs/tileoverlay/2974034-data
# example of custom data to pass to the urlTemplate
data:
  customOverlay: https://{subdomain}.customtileserver.com/{z}/{x}/{y}?scale={scale}&lang={lang}&imageFormat=jpg
  scale: 4
  subdomain: staging-server
  lang: es-ES

---

Something is amiss