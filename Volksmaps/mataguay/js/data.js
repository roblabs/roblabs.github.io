// Set your data here

// Full documentation can be found at
// https://www.mapbox.com/mapbox-gl-js/style-spec/
var style = {
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v9',
    zoom:  12.00,
    center: [-116.663832, 33.192188],
    minZoom: 0,
    maxZoom: 16
};

var smallMapStyle = {
    container: "mapsmall",
    style: "mapbox://styles/mapbox/streets-v10",
    zoom:  8.00,
    center: [-116.899732, 32.920702],
    minZoom: 0,
    maxZoom: 12,
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
  var html = feature.properties.name + "<br><hr>";
      html += feature.geometry.coordinates[1].toFixed(4) + ", " + feature.geometry.coordinates[0].toFixed(4);

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
latitude,longitude,name
33.232534,-116.695919,Mataguay Scout Ranch
33.207317,-116.657775,On My Honor Flag Plaza
33.207016,-116.657327,A Frame
33.213749,-116.584673,MCT / PCT Jct
33.201011,-116.650763,Silva Lodge
33.20046,-116.649101,Parker Dining Hall
33.200587,-116.650614,Trading Post
33.200025,-116.650812,Medical Lodge
33.190945,-116.64198,Nature trail Jct
33.187872,-116.640309,C.O.P.E.
33.188425,-116.640408,Conference Center
33.190658,-116.643061,Barn
33.19861,-116.651906,Mataguay Rifle Range
33.195278,-116.647827,Mataguay Chapel
33.195107,-116.646621,Blackfoot Pool
33.187354,-116.637318,Upper Lake
33.190764,-116.64206,Horse Bridge
33.188136,-116.635025,Treanor’s Grave
33.189738,-116.641622,Ranch Hand House
33.191373,-116.643688,Old Commissary
33.195811,-116.646286,Nature Den
33.200061,-116.649165,Baden Powell Fire Ring
33.190396,-116.630822,Back Gate
33.190102,-116.633699,Dead End
33.191623,-116.64434,Hog Barn Science Center
33.20012,-116.652882,The Dan Henry Lake
33.200716,-116.651112,Hogan
33.200457,-116.65156,Parker Pool
33.208806,-116.658315,Front Gate
33.194963,-116.644685,3 Mile Loop Kiosk
33.189605,-116.635709,Well 1
`;
