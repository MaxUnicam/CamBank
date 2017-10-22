var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bodyParser  = require('body-parser');
var cors = require('cors')

var BankTransaction = require('./API/Models/banktransaction');

var appConfig = require('./API/config');
var Utils = require('./API/utils');

var authRoutes = require('./API/Routes/authenticate');
var transactionsRoutes = require('./API/Routes/transactions');
var reportsRoutes = require('./API/Routes/reports');
var contactsRoutes = require('./API/Routes/contacts');
var utilsRoutes = require('./API/Routes/utils');
var statisticsRoutes = require('./API/Routes/statistics');

const utils = new Utils();


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

// abilito le CORS, da valutare per la consegna
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));


// Non - authenticated API
app.use("/auth", authRoutes);

// middleware to verify a token
app.use(function(req, res, next) {

  var token = req.headers['x-access-token'];

  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, appConfig.secret, function(err, decoded) {
      if (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        req.currentIban = decoded._doc.iban;
        next();
      }
    });

  } else {
    // if there is no token return an error
    return res.status(401).send({
        success: false, 
        message: 'No token' 
    });

  }
});

// Authenticated APIs
app.use("/transactions", transactionsRoutes);
app.use("/contacts", contactsRoutes);
app.use("/reports", reportsRoutes);
app.use("/utils", utilsRoutes);
app.use("/statistics", statisticsRoutes);

// Effettuiamo il seed del database
utils.AddDefaultOperators();


var distDir = __dirname + "/dist/";
app.use(express.static(distDir));


var port = process.env.PORT || 8080;
app.listen(port, (error) => {
    if (!error)
        console.log("Server listening on port: " + port);
});