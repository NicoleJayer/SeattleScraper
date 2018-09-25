var scrape = require("../scripts/scrape");

var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");








module.exports = function(router) {

    //this route renders the homepage
  router.get("/", function(req, res) {
    res.render("home");
  });

  // this route renders the saved handlebars homepage
  router.get("/saved", function(req, res) {
    res.render("saved");
  });

//api route to fetch all new articles
  router.get("/api/fetch", function(req, res) {
    headlinesController.fetch(function(err, docs) {
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "No new articles today. Check back tomorrow!"
        });
      }
      else {
        res.json({
          message: "Added " + docs.insertedCount + " new articles!"
        });
      }
    });
  });
  
}
