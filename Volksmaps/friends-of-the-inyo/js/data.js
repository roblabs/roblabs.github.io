// Set your data here

// Full documentation can be found at
// https://www.mapbox.com/mapbox-gl-js/style-spec/
var style = {
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v9',
    zoom:  8.0, center: [-118.092631, 36.883175],
    minZoom: 5,
    maxZoom: 15
};


/*
 * textField is used for the title of the point of interest
 */
textField = "{project}";


/*
 * Create full HTML for 'mousever' and 'click' events
 */
function setHTML(feature) {

    // Propser formatting
    html = "<div style=\"font-family: 'Open Sans',sans-serif; display:block; width: 340px; font-size:13px;\">";

    html += "<span style=\"font-size:19px;\">";

    html += feature.properties.project;
    html += "</span>";

    if(feature.properties.svg_array) {

      var svgs = feature.properties.svg_array.split(",");
      console.log(svgs);

      html += "<br>";

      svgs.forEach(function(element) {
        console.log(element);
        html += "<object data=\"svg/" + element + ".svg\" type=\"image/svg+xml\"></object>"
      });
    }


    if(feature.properties.image) {
      html += "<br><img width=\"340 px\" src=\"";
      html += feature.properties.image;
      html += "\">";
    } else {
      html += "<br><hr>";
    }

    if(feature.properties.description) {
      html += feature.properties.description;
      html += "<br><hr>";
    }

    if(feature.properties.directions) {
      html += "<i>";
      html += feature.properties.directions;
      html += "</i>";
    }

    if(feature.properties.url) {
      html += "<br><br><a target=\"_blank\" style=\"color:#F6863A; text-decoration:none;\" href=\"";
      html += feature.properties.url;
      html += "\">";
      html += "<i>Click here for more details</i></a>";
    }

    html += "</div>";

    console.log(html);
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
project,latitude,longitude,E,N,description,url,image
Owens River Water Trail Project Start,36.618886,-118.035836,407376 E,4053095 N,along the Owens River,https://friendsoftheinyo.org/owens-river-water-trail-project/,https://friendsoftheinyo.org/wp-content/uploads/2017/09/Lower-Owens-River-1024x362.jpg
Owens River Water Trail Project End,36.574442,-118.010832,409560 E,4048141 N,Along the Owens River,https://friendsoftheinyo.org/owens-river-water-trail-project/,https://friendsoftheinyo.org/wp-content/uploads/2017/09/Lower-Owens-River-1024x362.jpg
Racetrack Project,36.693689,-117.570791,449010 E,4061045 N,,https://friendsoftheinyo.org/racetrack-project-recap/,https://friendsoftheinyo.org/wp-content/uploads/2018/03/Racetrack-Playa-Restoration-27-of-109-768x512.jpg
Sierra National Forest Wilderness Project,37.240911,-118.717510,347660 E,4122980 N,At Golden Trout Lakes in Humphreys Basin,https://friendsoftheinyo.org/event/snf-wilderness-project/,https://friendsoftheinyo.org/wp-content/uploads/2018/01/Fourth-Recess_062015_1.jpg
Conglomerate Mesa,36.510446,-117.752367,432630 E,4040830 N,,https://friendsoftheinyo.org/drilling-approved-conglomerate-mesa/,
Owens Lake Bird Festival,36.435038,-117.959487,414000 E,4032630 N,,https://friendsoftheinyo.org/owens-lake-bird-festival/,https://friendsoftheinyo.org/wp-content/uploads/2015/02/FOI_BirdFest_Logo_0118.png
`;
