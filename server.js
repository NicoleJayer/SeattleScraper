// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

//Define port
var port = process.env.PORT || 3001

// have every request go through router
app.use(router);

// Make public a static dir
app.use(express.static(__dirname + "/public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
})
