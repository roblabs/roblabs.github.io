// Set your data here

// mapboxgl.accessToken = "";

// Full documentation can be found at
// https://www.mapbox.com/mapbox-gl-js/style-spec/
var style = {
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v10',
    zoom: 16.50,
    minZoom: 7,
    maxZoom: 18,
    center: [-91.4937, 47.9894]
};

/*
 * Create full HTML for 'mousever' and 'click' events
 */
function setHTML(feature) {
  var html = feature.properties.name;
      html += "<br><hr>";
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
name,longitude,latitude
Charles L. Sommers High Adventure Base,-91.494917,47.989479
Prairie Portage,-91.438309,48.050557
Kawishiwi Ranger District & Customs,-91.830583,47.906825
`;
