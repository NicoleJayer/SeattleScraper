// Dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");

// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

//Define port
var PORT = process.env.PORT || 3001

//setup body bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}));

// have every request go through router
var router = express.Router();
app.use(router);

// Make public a static dir
app.use(express.static(__dirname + "/public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

//if deployed, use the deployed database. Otherwise use the local mongoHeadLines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

//Connect mongoose to our database
mongoose.connect(db, function(error){

  //log any errors connecting with mongoose
  if (error) {
    console.log(error);
  }

//or log successfully
  else {
    console.log("mongoose connection is successful");
  }
});

//port listening
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
})
