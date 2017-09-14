// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Table Reservations (DATA)
// =============================================================
// The first 5 entries are reservations, the rest are waitlist
var reservations = [];
var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/make", function(req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
  });

  //This needs to clear the reservations array
app.get("/clear", function(req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
  });

// Get all characters
app.get("/api/view", function(req, res) {
  res.json(reservations);
  for (var i = 0; i < 5; i++) {
      reservations.push(res[i]);
  };
});

app.get("/api/waitlist", function(req, res) {
    res.json(waitlist);
  for (var j = 5; j < res.length; j++) {
      waitlist.push(res[j]);
  }
  });

// Search for Specific Character (or all characters) - provides JSON

// app.get("/api/reservations", function(req, res) {
//   var chosen = req.params.characters;

//   if (chosen) {
//     console.log(chosen);

//     for (var i = 0; i < characters.length; i++) {
//       if (chosen === characters[i].routeName) {
//         return res.json(characters[i]);
//       }
//     }
//     return res.json(false);
//   }
//   return res.json(characters);
// });

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  var newcharacter = req.body;
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
