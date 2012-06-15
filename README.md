# Random Hacks of Kindness Toronto ACORN Fair Housing Project

---

## Description

An interactive map that plots apartment inspection data from multiple data sources. The first data set being the [Municipal Licensing & Standards, Investigative Services](http://www.toronto.ca/investigationactivity/index.htm) from [Toronto City Open Data](http://toronto.ca/open) and the second from a user contributed system we built in conjunction with [ACORN Canada](http://www.acorncanada.org/).

## Project Goals

The aim is to provide an insight into what is being done, what isn't and what needs to be by visualising the available data, ultimately leading to a more effective solution being developed for getting inspections and work orders completed.

- Make deficiency report data publicly available, and display in a meaningful and accessible format
- Allow tenants to report deficiencies via simple and user-friendly web form
- Create awareness for issues of inadequate housing, improve housing standards, set stronger enforcements

## Future Directions

- Improved filtering and display of map data (open/closed status, date ranges, etc.)
- Bidirectional SMS Communication (Twilio, OneAPI, etc.)
- Compliance to and two-way integration with Open 311 Report Standards
- Search for specific property or using criteria

## Demo URL:

[http://108.166.97.76/pages/map.html](http://108.166.97.76/pages/map.html)

## Platforms, Data, Technologies:

- City of Toronto Open Data [http://toronto.ca/open](http://toronto.ca/open)
- SQLite3 [http://www.sqlite.org/](http://www.sqlite.org/)
- Node.js [http://nodejs.org/](http://nodejs.org/)
- Leaflet Javascript Mapping Library [http://leaflet.cloudmade.com/](http://leaflet.cloudmade.com/)
- Twitter Bootstrap [http://twitter.github.com/bootstrap/](http://twitter.github.com/bootstrap/)
- Cure web server hosting [http://cure.willsave.me/](http://cure.willsave.me/)


## API

### All addresses


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
    }
    ]

### All incidents for specific address


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
  
