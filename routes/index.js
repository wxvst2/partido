/*
* Main routes file which is called to initialize the routes.
*/
module.exports = exports = function (app) {

	app.get('/ping', function (req, res, next) {
		res.send("pong");
	});
};