/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
var express    = require("express");
var bodyParser = require("body-parser");
var path       = require("path");

var app  = express();
var PORT = process.env.PORT || 3000;

// Set up Express to handle parsing data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.text());
app.use(bodyParser.json({"type": "application/vnd.api+json"}));

// Initialize our array of reservations
// (the first 5 entries are reservations, the rest are on the waitlist)
var reservations = [];



/****************************************************************************
 ****************************************************************************
    
    Set up routes
    
*****************************************************************************
*****************************************************************************/
// HTML routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/make", function(req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

// API routes
app.get("/api/clear", function(req, res) {
    reservations = [];
});

app.post("/api/new", function(req, res) {
    // Assume that input validation is done on the client side
    reservations.push(req.body);

    res.send({"redirectUrl": "/view"});
});

app.get("/api/reservations", function(req, res) {
    var numReservations = Math.min(reservations.length, 5);

    res.json(reservations.slice(0, numReservations));
});

app.get("/api/waitlist", function(req, res) {
    res.json((reservations.length > 5) ? reservations.slice(5) : []);
});



/****************************************************************************
 ****************************************************************************
    
    Helper functions
    
*****************************************************************************
*****************************************************************************/
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});