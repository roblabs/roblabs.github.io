// Set your data here

// Full documentation can be found at
// https://www.mapbox.com/mapbox-gl-js/style-spec/
var style = {
    container: 'map',
    style: 'mapbox://styles/thinkcreatelive/cj6a98p4p34e82smkx5bgdefe',
    zoom:  11.69,
    pitch: 60,
    center: [-122.714521, 38.400318],
    minZoom: 0,
    maxZoom: 15
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
textField = "";

// Create our number formatter.
// https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
var priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

var sqftFormatter = new Intl.NumberFormat('en-US');


/*
 * Create full HTML for 'mousever' and 'click' events
 */
function setHTML(feature) {

    // Propser formatting
    html = "<div style=\"font-family: 'Open Sans',sans-serif; font-size:13px;\">";
    html += "<span style=\"font-size:19px;\">";

    html += feature.properties.address;
    html += "</span><br>";
    html += feature.properties.city;
    html += ", ";
    html += feature.properties.state;
    html += " ";
    html += feature.properties.zip;
    html += "<br><br>";
    html += feature.properties.bedrooms;
    html += " bedrooms | ";
    html += feature.properties.bathrooms;
    html += " bathrooms | ";
    html += sqftFormatter.format(feature.properties.sqft);
    html += " sq ft";
    html += "<br><br><b>Sold Date: </b>";
    html += feature.properties.soldDate;
    html += "<br><b>Sold Price: </b>$";
    html += feature.properties.soldPrice;

    if(feature.properties.url) {
      html += "<br><br><a target=\"_blank\" style=\"color:#F6863A; text-decoration:none;\" href=\"";
      html += feature.properties.url;
      html += "\">";
      html += "<i>Click here for more details</i></a>";
    }

    if(feature.properties.image) {
      html += "<br><br><img width=\"250px\" src=\"";
      html += feature.properties.image;
      html += "\">";
    }

    html += "</div>";

    return html;
}
