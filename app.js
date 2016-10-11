var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var parseServer = require('parse-server').ParseServer;

var config = require('./config');

var routes = require('./routes/index');
var users = require('./routes/users');
var student = require('./routes/student');
var coach = require('./routes/coach');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/student', student);
app.use('/coach', coach);

//allow CORS domain configuration
var CORS = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Parse-Application-Id');

  next();
}

app.use(CORS);

//Parse server configuration
var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost');
}

var api = new parseServer({
  databaseURI: databaseUri || config.parse.dataBaseUri,
  cloud: process.env.ClOUD_CODE_MAIN || config.parse.cloud,
  appId: process.env.APP_ID || config.parse.appId,
  masterKey: process.env.MASTER_KEY || config.parse.masterKey,
  serverURL: process.env.SERVER_URL || config.parse.serverURL,
  liveQuery: config.parse.liveQuery
});

var mounthPath = process.env.PARSE_MOUNT || '/parse';
app.use(mounthPath, api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
