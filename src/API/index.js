var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

// var User = require('./Models/User');


// Connect to Mongo db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Correctly connected with database");
});


mongoose.connect("mongodb://localhost/cambank", {
    useMongoClient: true,
});


// Setup web server
var app = express();
var port = 8080;

app.get("/", (req, res) => {
    res.status(200).send("Questa è la home page");
});

app.listen(port, (error) => {
    if (!error)
        console.log("Server listening on port: " + port);
});