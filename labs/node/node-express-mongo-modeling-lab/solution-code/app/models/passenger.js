var mongoose = require('mongoose');


var PassengerSchema = new mongoose.Schema({
  first_name:     String,
  last_name:      String,
  dob: 		  			Date
});

var Passenger = mongoose.model('Passenger', PassengerSchema);

module.exports = Passenger;
