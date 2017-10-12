var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bodyParser  = require('body-parser');
var cors = require('cors')

var BankTransaction = require('./Models/banktransaction');

var appConfig = require('./config');
var Utils = require('./utils');

var authRoutes = require('./Routes/authenticate');
var transactionsRoutes = require('./Routes/transactions');
var reportsRoutes = require('./Routes/reports');
var contactsRoutes = require('./Routes/contacts');
var utilsRoutes = require('./Routes/utils');
var statisticsRoutes = require('./Routes/statistics');

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

// Non - authenticated API
app.use("/api/auth", authRoutes);

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
app.use("/api/transactions", transactionsRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/utils", utilsRoutes);
app.use("/api/statistics", statisticsRoutes);

// Effettuiamo il seed del database
utils.AddDefaultOperators();


var distDir = __dirname + "../WebClient/dist/";
app.use(express.static(distDir));


var port = process.env.PORT || 8080;
app.listen(port, (error) => {
    if (!error)
        console.log("Server listening on port: " + port);
});