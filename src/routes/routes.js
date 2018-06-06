const render = require('../render');
var appRouter = function (app) {
	const fs = require('fs');
	const services = JSON.parse(fs.readFileSync(__dirname+'/routes.json', 'utf8'));
	app.get("/", function(req, res) {
		res.status(200).send("Welcome to our restful API");
	});
	app.get("/updateservice", function(req,res){
		res.status(200).send(render.changeservices({json:JSON.stringify(services,null, 2)}));
	});
	app.post("/updateservice", function(req,res){
		if(req.body.services){
			const newServices = JSON.parse(req.body.services);
			for (var key in newServices) {
				if (newServices.hasOwnProperty(key)) {
					if(!services.hasOwnProperty(key)) {
						app.get(key, function (req, res) {
							const data = services[key];
							res.status(200).send(data);
						});
					}
					services[key] = newServices[key];
				}
			}
		}
		fs.writeFileSync(__dirname+'/routes.json', JSON.stringify(services, null, 2) , 'utf-8');
		res.status(200).send(render.changeservices({json:JSON.stringify(services,null, 2)}));
	});
	for (var key in services) {
		if (services.hasOwnProperty(key)) {
			console.log('service:',key);
			app.get(key, function (req, res) {
				const data = services[req.route.path];
				res.status(200).send(data);
				console.log('service:',req.route.path);
			});

		}
	}

}

module.exports = appRouter;