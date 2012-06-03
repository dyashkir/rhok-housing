$(document).ready(function(){

    var local_data = "address.json";
    var remote_data = "/addresses";

    $.getJSON(remote_data, function(addresses) {
        // console.log(addresses);
        // style ids
        // 41036
        // 40906
        // 999
        // 22677
        var city_data_points_options = {
            color: null,
            fillColor: 'blue',
            fillOpacity: 1.0
        };

        var user_data_points_options = {
            color: null,
            fillColor: 'red',
            fillOpacity: 1.0
        };

        var toronto = new L.LatLng(43.6481, -79.4042); // geographical point (longitude and latitude)
        var citydatapoints = new L.LayerGroup();
        var userdatapoints = new L.LayerGroup();

        var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/eae6fac6c8324a20b7195cb899df7419/40906/256/{z}/{x}/{y}.png';
        var cloudmadeAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>';
        var cloudmadeOptions = { maxZoom: 18, attribution: cloudmadeAttribution };

        var minimal = new L.TileLayer(cloudmadeUrl, cloudmadeOptions, {styleId: 22677});
        var midnightCommander = new L.TileLayer(cloudmadeUrl, cloudmadeOptions, {styleId: 40906});

        var map = new L.Map('map', {
            center: toronto,
            zoom: 13,
            layers: [midnightCommander, userdatapoints, citydatapoints]
        });
        
        map.addLayer(minimal);

        // User data (manual points)
        var littletonMarker1 = new L.Marker(new L.LatLng(43.6581, -79.4142)).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>");
        var denverMarker1 = new L.Marker(new L.LatLng(43.6561, -79.4142)).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>");
        var auroraMarker1 = new L.Marker(new L.LatLng(43.6591, -79.4242)).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>");

        var user_data_point1 = new L.Circle(new L.LatLng(43.6581, -79.4142), 80, user_data_points_options).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>");
        var user_data_point2 = new L.Circle(new L.LatLng(43.6561, -79.4142), 80, user_data_points_options).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>");
        var user_data_point3 = new L.Circle(new L.LatLng(43.6591, -79.4242), 80, user_data_points_options).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>");

        userdatapoints.addLayer(user_data_point1)
               .addLayer(user_data_point2)
               .addLayer(user_data_point3);

        // City Data (start loop)
        for (i=0;i<addresses.length;i++){
            var city_data_points_loc = new L.LatLng(addresses[i].lat, addresses[i].lon);
            var popupText = addresses[i].line;
            popupText = popupText + '<br /><a href="report_toronto.html?id='+addresses[i].id+'"> View details </a>';
            var city_data_point = new L.Circle(city_data_points_loc, 80, city_data_points_options);
            city_data_point.bindPopup(popupText);
            citydatapoints.addLayer(city_data_point);
        }
        
        var baseMaps = {
            "Minimal": minimal,
            "Night View": midnightCommander
        };

        var overlayMaps = {
            "User Data": userdatapoints,
            "City Data": citydatapoints
        };

        var layersControl = new L.Control.Layers(null, overlayMaps);

        map.addControl(layersControl);
        
    });

    function sizeContent() {
        var newHeight = $("#container").height() + "px";
        $("#container").css("height", newHeight);
    }

    sizeContent();

});

