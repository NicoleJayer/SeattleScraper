var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {

  request("http://mynorthwest.com/", function(err, res, body) {

    var $ = cheerio.load(body);

    var articles = [];

    $(".story").each(function(i, element) {

      var head = $(this).children("h3").text().trim();

      var url = $(this).children("h3").children("a").attr("href");

      var sum = $(this).children(".tease").text().trim();

     if (head && sum && url) {

        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();



        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
      }
    });

    cb(articles);
  });
};

module.exports = scrape;
