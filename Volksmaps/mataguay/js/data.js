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
latitude,longitude,altitude,geometry,coordinates,name
33.213749,-116.584673,MCT / PCT Junction
33.199396,-116.6498,Quail
33.197213,-116.649547,Putting Green Pond
33.201011,-116.650763,Silva Lodge
33.190945,-116.64198,Nature trail Jct
33.188425,-116.640408,Conference Center
33.190658,-116.643061,Barn
33.200651,-116.653065,Fishing Shack
33.202734,-116.653835,Observatory Parking
33.19861,-116.651906,Mataguay Range
33.195278,-116.647827,Mataguay Chapel
33.20126,-116.651544,Squirrel
33.195283,-116.646704,Blackfoot Pool
33.192645,-116.646401,Mountain Man Meadow
33.187354,-116.637318,Upper Lake
33.19673,-116.649286,Kumeyaay
33.199299,-116.648826,Mountain Lion
33.189826,-116.640513,Conference Center Campfire
33.201572,-116.653275,Bat
33.201836,-116.653533,
33.190764,-116.64206,Horse Bridge
33.187979,-116.64012,Casitia No. 2
33.20853,-116.657145,Shop
33.195812,-116.648856,O/A Fire Ring
33.208493,-116.66105,Ranger's House
33.205577,-116.654715,Indian Rock
33.188136,-116.635025,Treanor's Grave
33.19912,-116.648827,Bobcat
33.200746,-116.651958,ADA Cabin
33.189648,-116.641716,Caretaker's Cabin
33.191373,-116.643688,ComSci
33.20624,-116.654629,Campmasters Cabin
33.195811,-116.646286,Nature Den
33.195114,-116.651757,Funhouse
33.203671,-116.656145,Indian Rock Campfire Circle
33.188144,-116.639926,Casitia No. 3
33.200061,-116.649165,Baden Powell Fire Ring
33.201327,-116.652101,Jack Rabbit
33.189079,-116.64018,Ranch House
33.190396,-116.630822,Back Gate
33.210957,-116.662854,Camporee Field
33.194555,-116.64591,Blackfoot Reservoir
33.198697,-116.650489,Bluegill
33.198043,-116.646446,Pawnee
33.191316,-116.64487,Tent Barn
33.208753,-116.657818,Assistant Ranger's House
33.201029,-116.649693,Staff Lounge
33.197614,-116.64733,Cheyenne
33.198106,-116.649305,Deer Meadow
33.20234,-116.649977,Staff Cabin Parking
33.203865,-116.653961,Indian Rock Headquarters
33.204476,-116.653577,Indian Rock Parking Lot
33.190102,-116.633699,Cub Land
33.198981,-116.650758,Bullfrog
33.198386,-116.650229,Catfish
33.196329,-116.648248,Blackfoot Fort
33.188491,-116.640984,Dining Hall
33.207629,-116.656005,Cabin 2
33.201779,-116.650813,Turkey
33.198038,-116.64993,Beaver
33.206719,-116.656095,Medivac Site
33.191563,-116.643996,Workshop
33.20012,-116.652882,The Dan Henry Lake
33.200025,-116.650812,Medical Lodge
33.200729,-116.651126,OA Hogan
33.207016,-116.657327,A Frame
33.188196,-116.64041,Casitia No. 1
33.200429,-116.651724,Parker Pool
33.208806,-116.658315,Front Gate
33.194963,-116.644685,3ml Kiosk
33.209192,-116.6627,Indian Graveyard
33.207486,-116.659606,Cub Land
33.20046,-116.649101,Parker Dining Hall
33.200526,-116.652419,Climbing Tower
33.198958,-116.6492,Coyote
33.18961,-116.635678,Well 1
33.198855,-116.651383,Pepper Bridge
33.200915,-116.652387,Hawk
33.191577,-116.643771,Trail Tool Shed
33.197825,-116.648111,Sioux
33.199703,-116.651182,Bike Shack
33.197535,-116.647876,Mohawk
33.199752,-116.666748,Hidden Valley
33.188342,-116.639976,Casitia No. 4
33.207284,-116.655197,Cabin 1
33.200587,-116.650614,Trading Post
33.207317,-116.657775,On My Honor Flag Plaza
33.188621,-116.639997,Conference Center Chapel
33.189072,-116.634996,Treanor's Water Tank
33.201888,-116.65018,Staff Cabins
33.199605,-116.650309,Kangaroo Rat
33.187872,-116.640309,C.O.P.E.
33.19965,-116.627643,Lunch Oak
`;
