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

// Initialize our array of reservations
// (the first 3 entries are reservations, the rest are on the waitlist)
var reservations = [], numReservationsAllowed = 3;



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
app.get("/api/reservations", function(req, res) {
    var numReservations = Math.min(reservations.length, numReservationsAllowed);

    res.json(reservations.slice(0, numReservations));
});

app.get("/api/waitlist", function(req, res) {
    if (reservations.length > numReservationsAllowed) {
        res.json(reservations.slice(numReservationsAllowed));

    } else {
        res.json([]);

    }
});

app.post("/api/new", function(req, res) {
    // Assume that input validation is done on the client side
    reservations.push(req.body);

    res.send({"redirectUrl": "/view"});
});

app.delete("/api/remove", function(req, res) {
    reservations.splice(req.body.id, 1);

    res.send({"redirectUrl": "/view"});
});



/****************************************************************************
 ****************************************************************************
    
    Helper functions
    
*****************************************************************************
*****************************************************************************/
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});