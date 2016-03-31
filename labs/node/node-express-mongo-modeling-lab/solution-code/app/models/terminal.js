var mongoose = require('mongoose');


var TerminalSchema = new mongoose.Schema({
  name:           String,
  flights:        [{ type: mongoose.Schema.ObjectId, ref: 'Flight' }],
  capacity: 	    Number
});

var Terminal = mongoose.model('Terminal', TerminalSchema);

module.exports = Terminal;
