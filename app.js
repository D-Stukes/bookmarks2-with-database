// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const bookmarksController = require("./controllers/bookmarkController.js");
//const reviewsController = require("./controllers/reviewsController.js");
// not needed since bookmarkController now points to reviewsController based on id param

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/bookmarks", bookmarksController)
//app.use("/reviews", reviewsController) 
// not needed since bookmarkController now points to reviewsController based on id param

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});

// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
  });

// EXPORT
module.exports = app;

// REMOVED THIS CODE after linking reviewsController as part of path in bookmarkController to retrieve only reviews pertaining to selected bookmark
//const reviewsController = require("./controllers/reviewsController.js");
//app.use("/reviews", reviewsController);