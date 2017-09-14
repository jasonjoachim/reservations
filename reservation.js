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
var reservations = [
  {name: "Darth Maul",
  phoneNumber: "555-5555",
  email: "darth@maul.com"},
  {name: "Death Maul",
  phoneNumber: "555-5555",
  email: "darth@maul.com"},
  {name: "Death Maul",
  phoneNumber: "555-5555",
  email: "darth@maul.com"},
  {name: "Death Maul",
  phoneNumber: "555-5555",
  email: "darth@maul.com"},
  {name: "Death Maul",
  phoneNumber: "555-5555",
  email: "darth@maul.com"}
];
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
app.get("/api/clear", function(req, res, reservations, waitlist) {
    //res.sendFile(path.join(__dirname, "make.html"));
    reservations = [];
    waitlist = [];
  });

// Get all characters
app.get("/api/view", function(req, res) {
  res.json(reservations);
  // for (var i = 0; i < 5; i++) {
  //     reservations.push(res[i]);
  //     console.log(reservations);
  // };
});

app.get("/api/waitlist", function(req, res) {
  //   res.json(reservations);
  // for (var j = 5; j < res.length; j++) {
  //     waitlist.push(res[j]);
  // }
  // console.log(waitlist);
  if  (reservations.length > 5) {
    res.json(reservations.slice(5));
  } else {
    res.json([]);
  }

 });

// Create New Reservation - takes in JSON input
app.post("/api/new", function(req, res) {
  var newReservation = req.body;
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  reservations.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
