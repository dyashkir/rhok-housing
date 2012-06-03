$(document).ready(function(){



    $.getJSON("/addresses", function(addresses) {

        // initialize the map on the "map" div
        // var map = new L.Map('map');

        // create a CloudMade tile layer (or use other provider of your choice)
        var cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/eae6fac6c8324a20b7195cb899df7419/997/256/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
        });


        var toronto = new L.LatLng(43.6481, -79.4042); // geographical point (longitude and latitude)


        // Layer groups

        var littletonMarker = new L.Marker(new L.LatLng(43.6481, -79.4242)).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>"),
            denverMarker = new L.Marker(new L.LatLng(43.6461, -79.4042)).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>"),
            auroraMarker = new L.Marker(new L.LatLng(43.6491, -79.4142)).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>");


        var littletonMarker1 = new L.Marker(new L.LatLng(43.6581, -79.4142)).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>"),
            denverMarker1 = new L.Marker(new L.LatLng(43.6561, -79.4142)).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>"),
            auroraMarker1 = new L.Marker(new L.LatLng(43.6591, -79.4242)).bindPopup("Property Address.<br /><a href=\"addresses/XXXXX\">View details.</a>");



        // Layer control

        var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/eae6fac6c8324a20b7195cb899df7419/997/256/{z}/{x}/{y}.png',
            cloudmadeAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            cloudmadeOptions = {maxZoom: 18, attribution: cloudmadeAttribution};

        var minimal = new L.TileLayer(cloudmadeUrl, cloudmadeOptions, {styleId: 22677}),
            midnightCommander = new L.TileLayer(cloudmadeUrl, cloudmadeOptions, {styleId: 999});

        var citydatapoints = new L.LayerGroup();

        // start loop
        console.log(addresses);

        // var citydatapoints = new L.LayerGroup();
        // var pointMarker;

        for (i=0;i<addresses.length;i++){
            var latlon = new L.LatLng(addresses[i].lat, addresses[i].lon);
	        var popupText = addresses[i].line;
	        popupText = popupText + '<br /><a href="report_toronto.html?id='+addresses[i].id+'"> View details </a>';
            var pointMarker = new L.Marker(latlon);
            pointMarker.bindPopup(popupText);
            citydatapoints.addLayer(pointMarker);
        }
        
        /*
        for (i=0;i<addresses.length;i++){
            
            var pointMarker = new L.Marker(new L.LatLng(addresses[i].lat, addresses[i].lon)).bindPopup("Property Address.<br /><a href=\"addresses/\"+>View details.</a>");
            citydatapoints.addLayer(pointMarker);
        }
        
        // map.addLayer(citydatapoints);

        //

        // citydatapoints.addLayer(littletonMarker)
        //        .addLayer(denverMarker)
        //        .addLayer(auroraMarker);

        */
        var userdatapoints = new L.LayerGroup();

        userdatapoints.addLayer(littletonMarker1)
               .addLayer(denverMarker1)
               .addLayer(auroraMarker1);


        var map = new L.Map('map', {
            center: toronto,
            zoom: 13,
            layers: [userdatapoints, citydatapoints]
        });

        var baseMaps = {
            "Minimal": minimal,
            "Night View": midnightCommander
        };

        var overlayMaps = {
            "User Data": userdatapoints,
            "City Data": citydatapoints
        };

        var layersControl = new L.Control.Layers(null, overlayMaps);

        // map.addLayer(citydatapoints);
        map.addLayer(cloudmade);
        map.addControl(layersControl);

        
    });



});

