var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");
var request = require("request");
var cheerio = require("cheerio");
var Headline = require("../models/Headline");

module.exports = {
  fetch: function(cb) {

    var articles = [];
  
    request("http://mynorthwest.com/", function(err, res1, body) {
  
      var $ = cheerio.load(body);
    
  
      $(".story").each(function(i, element) {
  
        var head = $(this).children("h3").text().trim();
  
        var url = $(this).children("h3").children("a").attr("href");
  
        var sum = $(this).children(".tease").text().trim();


        var dataToAdd = {
          headline: head,
          summary: sum,
          url: url
        };

        articles.push(dataToAdd);

       if (head && sum && url) {
  
          var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
          var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
  
  
  
         
        }
      });
      cb(err, articles);
    });
    // scrape(function(data) {

    //   var articles = data;

    //   for (var i = 0; i < articles.length; i++) {
    //     articles[i].date = makeDate();
    //     articles[i].saved = false;
    //   }

    //   Headline.collection.insertMany(articles, { ordered: false }, function(err, docs) {
    //     cb(err, docs);
    //   });
    // });






  },
  delete: function(query, cb) {
    Headline.remove(query, cb);
  },
  get: function(query, cb) {

    Headline.find(query)
      .sort({
        _id: -1
      })

      .exec(function(err, doc) {

        cb(doc);
      });
  },
  update: function(query, cb) {

    Headline.update({ _id: query._id }, {
      $set: query
    }, {}, cb);
  }
};
