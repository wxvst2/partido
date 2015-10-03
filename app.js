/*
 * Main Application file.
 * This is responsible for starting the application server
 * and initializing the application. 
 */
var express = require('express'),
  d = require('domain').create(),
  nconf = require('nconf'),
  app = express(),
  connect = require('connect'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  routes = require('./routes'),
  config = require('./config'),
  util = require('util'),
  appConfig, pool;



/*
  nconf is the config manager
  It is set to use the command line arguments, then environment values
*/
nconf.argv().env();

/*
  This is the universal error handler, in order to catch any
  uncaught exception. Reference : http://nodejs.org/api/domain.html
*/
d.on('error', function(err) {
  console.log(util.inspect(err));
});

function startApp() {
  /*
    The node process should be started with the NODE_ENV variable.
    Otherwise the app assumes the default config (development).
    You can also place the NODE_ENV var in your .bashrc
  */
  appConfig = config[nconf.get("NODE_ENV")] || config["development"];
  pool = mysql.createPool(appConfig.MySQL);
  MongoClient.connect(appConfig.mongoDB, function(err, mongoDb) {
    if (err) {
      console.error("Error connecting to the mongo database" + err.stack);
      throw err;
    }

    app.set("view options", {
      layout: false
    });

    app.use(express.static(__dirname + '/public'));
    //middleware to parse the request body
    app.use(bodyParser());
    //middleware to use http verbs like get, put
    app.use(methodOverride());
    app.use(app.router);
    // app.user(logErrors);
    // app.use(clientErrorHandler);
    routes(app, mongoDb, pool);
    var server = app.listen(appConfig.port, function() {
      console.log("Listening on port %d", server.address().port);
    });
  });
}

d.run(startApp);

/*
  This is the universal error handler, in order to catch any
  uncaught exception. Reference : http://nodejs.org/api/domain.html
*/
d.on('error', function(err) {
  console.log(util.inspect(err));
});

function startApp() {
  /*
    The node process should be started with the NODE_ENV variable.
    Otherwise the app assumes the default config (development).
    You can also place the NODE_ENV var in your .bashrc
  */
  appConfig = config[nconf.get("NODE_ENV")] || config["development"];


    app.set("view options", {
      layout: false
    });

    app.use(express.static(__dirname + '/public'));
    //middleware to parse the request body
    app.use(bodyParser());
    //middleware to use http verbs like get, put
    app.use(methodOverride());
    app.use(app.router);
    // app.user(logErrors);
    // app.use(clientErrorHandler);
    routes(app);
    var server = app.listen(appConfig.port, function() {
      console.log("Listening on port %d", server.address().port);
    });
}

d.run(startApp);