var express = require('express');
var path = require('path');
var debug = require("debug");
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var router = express.Router()

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animalshelter');


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts)
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.listen(3000)


require("./models/animal");
var Animal = mongoose.model("Animal");

app.get("/animals", function(req, res){
    Animal.find({}, function (err, animals) {

      res.render('animals/index', { animals: animals });
    });
  })

app.post("/animals", function(req, res){
  console.log(req.body.animal)
  Animal.create(req.body.animal, function (err, animal) {
    if(err){
      res.send("something wrong happened"+ err)
    }else{
      res.redirect('/animals');
    }

  });
})

app.get("/animals/:id/adopt", function(req, res){
  // find animal & update its status
  Animal.findByIdAndUpdate(req.params.id, {status: "adopted"}, function(err, animal){
    res.redirect('/animals');
  })
});

app.get("/animals/:id/abandon", function(req, res){
  Animal.findByIdAndUpdate(req.params.id, {status: "orphan"}, function(err, animal){
    res.redirect('/animals');
  })
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
