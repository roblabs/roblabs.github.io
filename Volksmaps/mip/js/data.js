// Set your data here

// mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ibGFicyIsImEiOiJwVlg0cnZnIn0.yhekddtKwZohGoORaWjqIw';

// Full documentation can be found at
// https://www.mapbox.com/mapbox-gl-js/style-spec/
var style = {
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v10',
    zoom: 15,
    minZoom: 7,
    maxZoom: 18,
    center: [-122.257389, 38.078558]
};

var smallMapStyle = {
    container: "mapsmall",
    style: "mapbox://styles/mapbox/streets-v10",
    zoom: 8.35,
    minZoom: 7,
    maxZoom: 15,
    center: [-122.220578, 37.930041],
    attributionControl: false
};

var textSize = {
    "base": 1,
    "stops": [
        [
            7,
            11.5
        ],
        [
            14,
            16
        ]
    ]
};


/*
 * textField is used for the title of the point of interest
 */
textField = "{name}";

/*
 * Create full HTML for 'mousever' and 'click' events
 */
function setHTML(feature) {
  var html = feature.properties.name;
      // html += "<br><hr>";
      // html += feature.geometry.coordinates[1].toFixed(4) + ", " + feature.geometry.coordinates[0].toFixed(4);

  if(feature.properties.description != undefined) {
    html += "<br><hr>";
    html += feature.properties.description;
  }

    return html;
}

/*
// * The raw CSV can be placed with in this Javascript variable
// * The opening backtick, `, and back slash, \,
// *  are very important so be sure to not edit those
// *  as are the closing backtick, `, and semicolor, ;.
// Example,

var csvString = `\
iata,title,city,state,country,latitude,longitude
00M,Thigpen,Bay Springs,MS,USA,31.95376472,-89.23450472
`;

*/
// The Mare Island Shoreline Heritage Preserve<br>is a 215-acre park located at<br>the south end of Mare Island.
var csvString = `\
latitude,longitude,name,description
38.079357,-122.254847,Mare Island Shoreline Heritage Preserve,
38.081370,-122.257134,Visitor Center,Our Visitor Center is in a former bomb storage magazine
38.075805,-122.254399,Spirit Ship,An Art Tribute dedicated to the workers of Mare Island Naval Shipyard marking the closure of the Shipyard in 1996.<br>The sculpture has a “dog tag” for many of the ships built and repaired on Mare Island.
38.077095,-122.251197,Sign 6
38.075389,-122.254128,Sign 8
38.079581,-122.252989,Mare Island Naval Cemetery,The Mare Island Naval Cemetery is a National Historic Landmark
38.076672,-122.255028,U.S. Coast & Geodetic Survey Station,Est 1852
`;
