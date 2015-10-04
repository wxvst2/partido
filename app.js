/*
 * Main Application file.
 * This is responsible for starting the application server
 * and initializing the application. 
 */
var express = require('express'),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  d = require('domain').create(),
  nconf = require('nconf'),
  app = express(),
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


    app.set("view options", {
      layout: false
    });

    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
    // app.user(logErrors);
    // app.use(clientErrorHandler);
    routes(app);
    var server = app.listen(appConfig.port, function() {
      console.log("Listening on port %d", server.address().port);
    });
}

d.run(startApp);