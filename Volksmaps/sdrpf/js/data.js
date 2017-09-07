// Set your data here

// Full documentation can be found at
// https://www.mapbox.com/mapbox-gl-js/style-spec/
var style = {
    container: 'map',
    style: 'mapbox://styles/roblabs/cj0x6x1ig00el2rqrp6ep4agm',
    zoom:  9.73,
    center: [-116.8434, 32.9054],
    minZoom: 5,
    maxZoom: 15
};


/*
 * textField is used for the title of the point of interest
 */
textField = "{name}";


/*
 * Create full HTML for 'mousever' and 'click' events
 */
function setHTML(feature) {

    // Propser formatting
    html = "<div style=\"font-family: 'Open Sans',sans-serif; display:block; width: 340px; font-size:13px;\">";

    html += "<span style=\"font-size:19px;\">";

    html += feature.properties.name;
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
      html += "<br><img width=\"340 px\" src=\"images/";
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
latitude,longitude,name,description,directions,index,image,svg_array,source
32.760213,-117.206305,Estuary and Southern Wildlife Preserve,"When the River passes beneath Interstate 5, it enters the City of San Diego's Mission Bay Park. At this point, its meandering route to the Pacific Ocean takes it through the Southern Wildlife Preserve. The Preserve is part of the River’s estuary - you may view many migrant bird species as they make their journeys along the Pacific Flyway, as well as permanent residents of the marshes. There are bicycle and walking trails on both the north and south sides of the river, providing superb bird viewing and photography opportunities.","Sea World Drive and South Shores Park San Diego, CA 92109",11,RiverTourBrochure-11a.png,"bicycle-trail-black-24,scenic-viewpoint-black-24",
33.011713,-116.712567,Eagle Peak Preserve,"The San Diego River Park Foundation’s Eagle Peak Preserve is one of those special places that can be transformational for many. It is a place of rare beauty that is matched by its natural, recreational and cultural resources.","1/2 mile from the end of Eagle Peak Road Julian, CA 92036",3,RiverTourBrochure-3.png,"bicycle-trail-black-24,trailhead-black-24,horseback-riding-black-24,picnic-area-black-24,scenic-viewpoint-black-24",
32.995765,-116.756198,Cedar Creek Falls Trailheads,"At the end of Eagle Peak Road are amazing views of the River gorge and Mildred Falls. Hike, permit required, two miles down to beautiful Cedar Creek Falls..","Thornbush Road Ramona, CA 92065",4,RiverTourBrochure-4.png,"trailhead-black-24,horseback-riding-black-24,scenic-viewpoint-black-24,waterfall-black-24,parking-black-24",
33.002366,-116.715161,Cedar Creek Falls Trailheads,"At the end of Eagle Peak Road are amazing views of the River gorge and Mildred Falls. Hike, permit required, two miles down to beautiful Cedar Creek Falls. The falls are also accesible via the Thornbush trailhead across the river.","End of Eagle Peak Road Julian, CA 92036",4,RiverTourBrochure-4.png,"trailhead-black-24,horseback-riding-black-24,scenic-viewpoint-black-24,waterfall-black-24",
32.989977,-116.729646,Cedar Creek Falls,,,,RiverTourBrochure-4.png,"scenic-viewpoint-black-24,waterfall-black-24",
32.752339,-117.228689,Famosa Slough,The Famosa Slough is a 37-acre wetland between Ocean Beach and the San Diego Sports Arena area. The slough is an excellent place for bird watching or just going on a relaxing walk through nature.,"W. Point Loma Boulevard and Famosa Boulevard San Diego, CA 92107",12,RiverTourBrochure-12.png,scenic-viewpoint-black-24,
33.125774,-116.652002,Santa Ysabel Open Space Preserve,"Located between Julian and Santa Ysabel, this preserve is ideal for hiking and mountain biking and its internal trail system totals approximately 20 miles.","Farmers Rd,1.2 miles north of intersection with Wynola Road Julian, CA 92036",1,RiverTourBrochure-1.png,"bicycle-trail-black-24,trailhead-black-24,horseback-riding-black-24,picnic-area-black-24,scenic-viewpoint-black-24",
32.865522,-116.927925,Lakeside’s River Park,"Maintained by Lakeside’s River Park Conservancy, this park has a lovely 3/4 mile trail that runs from Riverside Drive to Channel Road on the northern bank of the San Diego River.","Along the San Diego River at the intersection of Rio Camino and Riverside Drive Lakeside, CA 92040",6,RiverTourBrochure-6.png,"bicycle-trail-black-24,trailhead-black-24,scenic-viewpoint-black-24",
32.860415,-117.007872,Santee Lakes,"This is a 190-acre park adjacent to Sycamore Creek. The park offers fishing, boating, birding, overnight camping and more. This is a popular destination, as well as a recreational treasure.","9040 Carlton Oaks Dr, Santee, CA 92071",8,RiverTourBrochure-8.png,,
32.89161,-116.848093,El Monte County Park,"Just below El Capitan Reservoir, the River enters a beautiful agricultural and equestrian valley which is home to El Monte County Park. The park is a terrific place for a family picnic and affords wonderful views.","15805 El Monte Rd, Lakeside, CA 92040,",5,RiverTourBrochure-5.png,"trailhead-black-24,picnic-area-black-24,scenic-viewpoint-black-24",
32.848415,-116.969503,Walker Preserve,"Walker Preserve contains a 1.13 mile stretch of the San Diego River Trail that connects Santee to the trail in Lakeside.  This area has great opportunities for walking, cycling, boating and fishing.","9333 N. Magnolia Ave, Santee, CA 92071",,,"bicycle-trail-black-24,trailhead-black-24,canoe-access-black-24,fishing-black-24,horseback-riding-black-24,picnic-area-black-24,scenic-viewpoint-black-24",
32.819533,-117.055888,Mission Trails Regional Park,"At more than 6,000 acres, Mission Trails Regional Park is one of the largest urban parks in the United States. It is a wilderness within a city, full of wondrous vistas and close-up glimpses of native plants and animals. The park surrounds the San Diego River as it passes through Mission Gorge. MTRP is a naturalist's and hiker's paradise, and any visit should include a walk, ride, or slow drive from the Visitor's Center along Junipero Serra Trail to Old Mission Dam, a distance of about 2.5 miles.","1 Father Junipero Serra Trl, San Diego, CA 92119",9,RiverTourBrochure-9a.png,"bicycle-trail-black-24,campground-black-24,fishing-black-24,trailhead-black-24,picnic-area-black-24,scenic-viewpoint-black-24,visitor-center-black-24,parking-black-24",
32.763542,-117.193831,Mission Valley Preserve,"The River turns westward below the mouth of Mission Gorge and flows through Mission Valley before reaching the 51-acre Mission Valley Preserve at the west end of the valley. The Preserve includes riparian and estuarine wildlife habitat for species such as the endangered Least Bell's Vireo and Southwestern Willow Flycatcher. Work is ongoing to restore native plants and provide habitat for animals and, ultimately, to provide educational and recreational opportunities for all San Diegans. The Preserve has a native plant garden and interpretive area for visitors to enjoy.","Friars Road and Napa Street, San Diego, CA 92110",10,RiverTourBrochure-10b.png,picnic-area-black-24,
33.098369,-116.664807,Inaja Memorial,"High above the headwaters of the San Diego River, the viewpoint at Inaja looks south and west down the wild and beautiful San Diego River Gorge. Deep in this canyon the San Diego River begins it’s journey to the ocean.","1 mile East of Santa Ysabel on Hwy 78/79 Santa Ysabel, CA 92070",2,RiverTourBrochure-2.png,"trailhead-black-24,picnic-area-black-24,scenic-viewpoint-black-24,parking-black-24",http://www.sandiegoriver.org/docs/Resources_Brochures/RiverTourBrochure.pdf
32.754134,-117.250372,Dog Beach,Dog Beach can be found where the river meets the Pacific Ocean. This is a popular recreation area as well as an excellent and accessible location for experiencing an emerging sand dune habitat.,"Northwest end of Voltaire Street Ocean Beach, CA 92107",13,RiverTourBrochure-13.png,"pets-off-leash-black-24,picnic-area-black-24,scenic-viewpoint-black-24",
32.844278,-116.996792,Mast Park,"Mast Park provides opportunities to stroll along the River, play basketball, and have a family get-together. Mast Park is also a summertime home for the Least Bell's Vireo, an endangered songbird which is making a comeback along the River.","9125 Carlton Hills Boulevard Santee, CA 92071",7,RiverTourBrochure-7.png,"bicycle-trail-black-24,pets-off-leash-black-24,fishing-black-24,horseback-riding-black-24,picnic-area-black-24",
`;
