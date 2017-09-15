// Set your data here

// Full documentation can be found at
// https://www.mapbox.com/mapbox-gl-js/style-spec/
var style = {
    container: "map",
    style: "mapbox://styles/roblabs/cj7lax9g387z02rqmtz5m8vs8",
    zoom:  4,
    center: [-149.43052459999998, 61.586757899999995],
    minZoom: 2,
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
    html = "<div style=\"font-family: 'Arial',sans-serif; font-size:13px;\">";
    html += "<span style=\"font-size:19px;\">";

    html += feature.properties.address;
    html += "</span><br>";
    html += feature.properties.city;
    html += ", ";
    html += feature.properties.state;
    html += " ";
    html += feature.properties.zip;
    html += "<br><br>";
    html += "Contact — Rob<br>";
    html += "Unit — Birds<br>";
    html += "<a href=\"tel:" + feature.properties.phone +  "\">";

    html += "</div>";

    return html;
}
