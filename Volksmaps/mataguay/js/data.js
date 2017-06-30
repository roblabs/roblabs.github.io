// Set your data here

// Full documentation can be found at
// https://www.mapbox.com/mapbox-gl-js/style-spec/
var style = {
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v10',
    zoom:  12.00, center: [-116.691186, 33.205065],  // map
    // zoom:  16.23, center: [-116.651738, 33.199058],  // print
    minZoom: 8,
    maxZoom: 20
};

var smallMapStyle = {
    container: "mapsmall",
    style: "mapbox://styles/mapbox/streets-v10",
    zoom:  8.0,
    center: [-116.899732, 32.920702],
    minZoom: 6,
    maxZoom: 12,
    attributionControl: false
};

var textSize = {
    "base": 1,
    "stops": [
        [
            7,
            16
        ],
        [
            14,
            20
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
33.273559,-116.644672,CAL FIRE Warner Springs
33.207016,-116.657327,A Frame
33.207317,-116.657775,On My Honor Flag Plaza
33.213749,-116.584673,MCT / PCT Jct
33.201011,-116.650763,Silva Lodge
33.20046,-116.649101,Parker Dining Hall
33.202342,-116.649978,Staff Cabin Parking
33.200587,-116.650614,Trading Post
33.200025,-116.650812,Medical Lodge
33.187872,-116.640309,C.O.P.E.
33.195811,-116.646286,Nature Den
33.206093,-116.654353,Indian Rock
33.204476,-116.653577,Indian Rock Parking
33.207486,-116.659606,Cub Land
33.201836,-116.653533,⛺️ Owl
33.201572,-116.653275,⛺️ Bat
33.201616, -116.651911,⛺️ Jack Rabbit
33.201260, -116.651544,⛺️ Squirrel
33.202128, -116.650915,⛺️ Turkey
33.202734,-116.653836,Observatory Parking
33.200915,-116.652387,⛺️ Hawk
33.198940,-116.650763,⛺️ Bullfrog
33.199605,-116.650309,⛺️ Kangaroo Rat
33.199569,-116.648917,⛺️ Mountain Lion
33.198473,-116.65029,⛺️ Bluegill
33.199396,-116.649800,⛺️ Quail
33.199120,-116.648827,⛺️ Bobcat
33.198054,-116.64998,⛺️ Catfish
33.197724,-116.649693,⛺️ Beaver
33.198540, -116.648660,⛺️ Coyote
33.197938,-116.647228,⛺️ Cheyenne
33.198043,-116.646446,⛺️ Pawnee
33.196730,-116.649286,⛺️ Kumeyaay
33.195816,-116.648818,O/A Fire Ring
33.197213,-116.649547,Putting Green Pond
33.196329,-116.648248,Blackfoot Fort
33.192645,-116.646401,Mountain Man Meadow
33.200460,-116.649101,Parker Dining Hall
33.200502,-116.651748,Parker Pool
33.199516,-116.650977,Bike Shack
33.200526,-116.652419,Fun House Climbing Center
33.197825,-116.648111,⛺️ Sioux
33.197535,-116.647876,⛺️ Mohawk
33.200587,-116.650614,Trading Post
33.207317,-116.657775,On My Honor Flag Plaza
33.188425,-116.640408,Conference Center
33.190658,-116.643061,Barn
33.19861,-116.651906,Mataguay Range
33.195278,-116.647827,Mataguay Chapel
33.187354,-116.637318,Upper Lake
33.190764,-116.64206,Horse Bridge
33.188136,-116.635025,Treanor’s Grave
33.189738,-116.641622,Ranch Hand House
33.191373,-116.643688,ComSci
33.200061,-116.649165,Baden Powell Fire Ring
33.190396,-116.630822,Back Gate
33.190102,-116.633699,Dead End
33.191623,-116.64434,Workshop
33.20012,-116.652882,The Dan Henry Lake
33.200469,-116.652944,Fishing Shack
33.195283, -116.646704,Blackfoot Pool
33.200716,-116.651112,Hogan
33.208806,-116.658315,Front Gate
33.194963,-116.644685,3 Mile Loop Kiosk
33.189605,-116.635709,Well 1
33.206399, -116.655137,Medivac Site
33.190945,-116.64198,Nature trail Jct
`;
