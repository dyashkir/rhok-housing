Random Hack of Kindness Toronto ACORN housing project
============
Project Brief:
To develop an interactive mapping platform that would overlay municipal apartment inspection data with user & organizational contributed data with the goal of growing the number of low income tenants involved in campaigns for fair housing. 

Due to the fact that the dataset is somewhat limited, the second portion of the solution we put forward was to augment this data set with user contributed data. This will bey a key part in helping ACORN achieve their objectives, as providing an insight into what needs to be done, and clearly isn't, can serve as a sort of embarrassment for the city. More so if/when paired with an awareness campaign that directs people to the site to get a better idea of how bad the housing situation is.

Hopefully this has the intended affect of more people bringing the issue to the attention of city officials and subsequently getting more inspections and work orders done.

Platforms, Data, Technologies:
City of Toronto Open Data:
SQLite Database: http://www.sqlite.org/

node.js: http://nodejs.org/

Leaflet Javascript Mapping Library: http://leaflet.cloudmade.com/

Twitter's Bootstrap framework: http://twitter.github.com/bootstrap/

Cure web server hosting: http://cure.willsave.me/

Live link:
http://108.166.97.76/pages/map.html



API
===

All addresses
=============

    /addresses
    
 
    [
    {
        "id": 1,
        "lat": 43.64,
        "lon": -79.39,
        "line": "Toronto something"
    },
    {
        "id": 2,
        "lat": 43.64,
        "lon": -79.39,
        "line": "Toronto something"
    },
    {
        "id": 3,
        "lat": 43.64,
        "lon": -79.39,
        "line": "Toronto something"
    },
    {
        "id": 4,
        "lat": 43.64,
        "lon": -79.39,
        "line": "Toronto something"
    },
    {
        "id": 5,
        "lat": 43.64,
        "lon": -79.39,
        "line": "Toronto something"
    },
    {
        "id": 6,
        "lat": 43.64,
        "lon": -79.39,
        "line": "Toronto something"
    },
    {
        "id": 7,
        "lat": 43.64,
        "lon": -79.39,
        "line": "Toronto something"
    },
    {
        "id": 8,
        "lat": 43.64,
        "lon": -79.39,
        "line": "Toronto something"
    },
    {
        "id": 9,
        "lat": 43.64,
        "lon": -79.39,
        "line": "Toronto something"
    },
    {
        "id": 10,
        "lat": 43.64,
        "lon": -79.39,
        "line": "Toronto something"
    }
    ]

All incidents for specific address
==================================

    /addresses/<id>  

    [
    {
        "investigationId": 6882,
        "location": "Side Of Building",
        "desc": "Roof drainage discharging at more than one hundred and fifty (150) millimeters above grade.",
        "status": "Open",
        "address": "12 King St",
        "date": "March 12, 2012"
    }
    ]
  
