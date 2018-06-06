var path = require('path')
	, fs = require('fs');

function req(name) {
	var module = require("./render/" + name);
	delete exports[name];
	return exports[name] = module;
}
fs.readdirSync(__dirname+'/render').forEach(function(file) {
	if ((file === 'index.js') || (file[0] === '_')) { return; }
	var ext = path.extname(file);
	var stats = fs.statSync(__dirname + '/render/' + file);
	if (stats.isFile() && !(ext in require.extensions)) { return; }
	var basename = path.basename(file, '.js');
	exports.__defineGetter__(basename, function(){ return req(basename); });
});