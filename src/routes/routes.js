const render = require('../render');

var appRouter = function (app) {
	const fs = require('fs');
	const services = JSON.parse(fs.readFileSync(__dirname+'/routes.json', 'utf8'));
	const addEndPoint = (type, path)=>{
		switch(type){
			case 'get':{
				console.log(type, path);
				app.get(path, function (req, res) {
					const data = services[type][req.route.path];
					res.status(200).send(data);
				});
			}break;
			case 'post':{
				app.post(path, function (req, res) {
					const data = services[req.route.path];
					res.status(200).send(data);
				});
			}break;
		}
	};
	app.get("/", function(req, res) {
		res.status(200).send("Welcome to our restful API");
	});
	app.get("/updateservice", function(req,res){
		res.status(200).send(render.changeservices({json:JSON.stringify(services,null, 2)}));
	});
	app.post("/updateservice", function(req,res){
		if(req.body.services){
			const newServices = JSON.parse(req.body.services);
			for (var type in newServices) {
				console.log('type',type);
				if (newServices.hasOwnProperty(type)) {
					if(!services.hasOwnProperty(type)){
						services[type]={};
					}
					for(path in newServices[type]){
						if (newServices[type].hasOwnProperty(path)) {
							addEndPoint(type,path);
							services[type][path] = newServices[type][path];
						}
				}
				}

			}
		}

		fs.writeFileSync(__dirname+'/routes.json', JSON.stringify(services, null, 2) , 'utf-8');
		res.status(200).send(render.changeservices({json:JSON.stringify(services,null, 2)}));
	});
	for (var type in services) {
		if(services.hasOwnProperty(type)){
			for(path in services[type]){
				if (services[type].hasOwnProperty(path)) {
					addEndPoint(type, path);
				}
			}
		}
	}
}

module.exports = appRouter;