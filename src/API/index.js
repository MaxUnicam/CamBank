var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bodyParser  = require('body-parser');

var User = require('./Models/User');

var appConfig = require('./config');


// Connect to Mongo db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Correctly connected with database");
});


mongoose.connect(appConfig.mongoConnectionString, {
    useMongoClient: true,
});


// Setup web server
var app = express();
var port = 8080;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.set("superSecret", appConfig.secret);


// Non - authenticated API
app.get("/", (req, res) => {
    res.status(200).send("Questa è la home page");
});


app.post('/authenticate', function(req, res) {

    User.findOne({ name: req.body.name }, function(err, user) {
        
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 60 * 60 * 2 // expires in 2 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });

            }
        }

    });

});






// route middleware to verify a token
app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});




app.get('/users', function(req, res) {
    res.status(200).send("Questa è la lista degli utenti con l'utente autenticato");
});




app.listen(port, (error) => {
    if (!error)
        console.log("Server listening on port: " + port);
});
