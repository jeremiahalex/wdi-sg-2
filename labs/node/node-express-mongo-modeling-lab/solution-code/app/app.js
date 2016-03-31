var path = require('path');
var logger = require('morgan');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose-modeling');

var Passenger = require("./models/passenger");
var Flight    = require("./models/flight");
var Terminal  = require("./models/terminal");
var Airport   = require("./models/airport");


var flight1 = new Flight({
  from:                 "CDG France",
  to:                   "JFK New-York, USA",
  airline:              "American Airline",
  passengers:           []
});

flight1.save();
console.log(flight1)


var flight2 = new Flight({
  from:                 "Heathrow UK",
  to:                   "JFK New-York, USA",
  airline:              "British Airways",
  passengers:           []
});

flight2.save();
console.log(flight2)



var airport1 = new Airport({
    name:           "JFK",
    country:        "USA",
    opened:         ((new Date()).setYear(1990))
  });


airport1.terminals.push({
    name:           "Terminal 1",
    capacity:       234324,
    flights:        [flight1, flight2]
  })
console.log(airport1)
console.log(airport1.terminals)
airport1.save()
