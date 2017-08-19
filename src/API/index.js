var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bodyParser  = require('body-parser');
var cors = require('cors')

var BankTransaction = require('./Models/BankTransaction');

var appConfig = require('./config');

var authRoutes = require('./Routes/authenticate');
var transactionsRoutes = require('./Routes/transactions');
var reportsRoutes = require('./Routes/reports');
var contactsRoutes = require('./Routes/contacts');



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

// abilito le CORS, da valutare per la consegna
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Non - authenticated API
app.use("/auth", authRoutes);
app.use("/reports", reportsRoutes);


// route middleware to verify a token
app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, appConfig.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token. '  });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        req.currentIban = decoded._doc.iban;
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


// Authenticated APIs
app.use("/transactions", transactionsRoutes);
app.use("/contacts", contactsRoutes);


app.listen(port, (error) => {
    if (!error)
        console.log("Server listening on port: " + port);
});
