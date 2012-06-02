

// initialize the map on the "map" div
// var map = new L.Map('map');

// create a CloudMade tile layer (or use other provider of your choice)
// var cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/eae6fac6c8324a20b7195cb899df7419/997/256/{z}/{x}/{y}.png', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
//     maxZoom: 18
// });

var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/eae6fac6c8324a20b7195cb899df7419/997/256/{z}/{x}/{y}.png',
    cloudmadeAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    cloudmadeOptions = {maxZoom: 18, attribution: cloudmadeAttribution};

var minimal = new L.TileLayer(cloudmadeUrl, cloudmadeOptions, {styleId: 22677}),
    midnightCommander = new L.TileLayer(cloudmadeUrl, cloudmadeOptions, {styleId: 999}),
    motorways = new L.TileLayer(cloudmadeUrl, cloudmadeOptions, {styleId: 46561});

var map = new L.Map('map', {
    center: new L.LatLng(39.73, -104.99),
    zoom: 10,
    layers: [minimal, motorways, citydatapoints]
});

var baseMaps = {
    "Minimal": minimal,
    "Night View": midnightCommander
};

var overlayMaps = {
    "Motorways": motorways,
    "Cities": citydatapoints
};

var layersControl = new L.Control.Layers(baseMaps, overlayMaps);

map.addControl(layersControl);



var toronto = new L.LatLng(43.6481, -79.4042); // geographical point (longitude and latitude)

// add the CloudMade layer to the map set the view to a given center and zoom
map.addLayer(cloudmade);
map.setView(toronto, 13);

// create a marker in the given location and add it to the map
// var marker = new L.Marker(new L.LatLng(43.6481, -79.4242));
// var marker2 = new L.Marker(new L.LatLng(43.6461, -79.4042));
// var marker3 = new L.Marker(new L.LatLng(43.6491, -79.4142));
// map.addLayer(marker);
// map.addLayer(marker2);
// map.addLayer(marker3);


// Layer groups

var littletonMarker = new L.Marker(new L.LatLng(43.6481, -79.4242)).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>"),
    denverMarker = new L.Marker(new L.LatLng(43.6461, -79.4042)).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>"),
    auroraMarker = new L.Marker(new L.LatLng(43.6491, -79.4142)).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>");

var citydatapoints = new L.LayerGroup();

citydatapoints.addLayer(littletonMarker)
           .addLayer(denverMarker)
           .addLayer(auroraMarker);

map.addLayer(citydatapoints);


// Layer control





// Circle

circleOptions = {
    color: '',
    fillColor: '#f03',
    fillOpacity: 0.2
};

var circle = new L.Circle(toronto, 5000, circleOptions);
map.addLayer(circle);
// circle.bindPopup("I am a circle.");



// attach a given HTML content to the marker and immediately open it
marker.bindPopup("Property Address.<br /><a href=\"#\">View details.</a>").openPopup();