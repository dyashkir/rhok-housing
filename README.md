Random Hack of Kindness Toronto ACORN housing project
============

Project Brief: To develop an interactive mapping platform that would overlay municipal apartment inspection data with user & organizational contributed data with the goal of growing the number of low income tenants involved in campaigns for fair housing. 

The project will utilize the Municipal Licensing and Standards Open Data set, evaluate and utilize a mapping platform and hopefully include SMS contributed data.


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
  
