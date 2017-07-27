// Set your data here

// mapboxgl.accessToken = "";

// Full documentation can be found at
// https://www.mapbox.com/mapbox-gl-js/style-spec/
var style = {
    container: 'map',
    style: 'mapbox://styles/roblabs/cj5lp8s022pmt2ssa2er1uaff',
    zoom: 7,
    minZoom: 6,
    maxZoom: 18,
    center: [-91.494917,47.989479]
};

var southWestCorner = new mapboxgl.LngLat(-91.625, 47.875);
var northEastCorner = new mapboxgl.LngLat(-91.375, 48.125);
var LngLatBounds = new mapboxgl.LngLatBounds(southWestCorner, northEastCorner);

var smallMapStyle = {
    container: "mapsmall",
    style: "mapbox://styles/mapbox/streets-v10",
    minZoom: 4,
    maxZoom: 15,
    zoom:  4.45,
    center: [-92.647016, 47.726081],
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
  var html = "";

  if(feature.properties.url != undefined) {
    html = "<a target=\"_blank\" href=" + feature.properties.url + ">" + feature.properties.name + "</a>";
  }
  else {
    html = feature.properties.name;
  }

  html += "<br><hr>";
  html += feature.geometry.coordinates[1].toFixed(4) + ", " + feature.geometry.coordinates[0].toFixed(4);

  if(feature.properties.address != "") {
    html += "<br><hr>";
    html += feature.properties.address;
    html += "<br>";
    html += feature.properties.city + ", " + feature.properties.state_zip;
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

var csvString = `\
name,longitude,latitude,address,city,state_zip,description,url
Charles L. Sommers Canoe Base,-91.494917,47.989479,14790 Moose Lake Rd,Ely,MN 55731,,http://www.ntier.org
Donald Rogert Canoe Base,-91.841214,48.740965,,,,,http://www.ntier.org
Northern Expeditions Canoe Base,-95.674334,51.026774,,,,,http://www.ntier.org
Prairie Portage Ranger Station,-91.436710,48.051227,,,,,https://www.ontarioparks.com/park/quetico
Louisa Falls,-91.3654,48.1311,,,,,
Cache Bay Ranger Station,-91.0117,48.2119,,,,,https://www.ontarioparks.com/park/quetico
Lac La Croix Ranger Station,-92.132965,48.371639,,,,,https://www.ontarioparks.com/park/quetico
Beaverhouse Ranger Station,-92.049847,48.539178,,,,,https://www.ontarioparks.com/park/quetico
Kawishiwi Ranger District & Customs,-91.829717,47.906841,1393 MN-169,Ely,MN 55731,,https://www.fs.usda.gov/recarea/superior/recreation/recarea?recid=37021&actid=31
`;
