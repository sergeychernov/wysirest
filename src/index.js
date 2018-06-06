
require("dot").process({
	global: "_page.render"
	, destination: __dirname + "/render/"
	, path: (__dirname + "/templates/")
});

var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var index = express();


index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: true }));

routes(index);

var server = index.listen(3333, function () {
	console.log("index running on port.", server.address().port);
});