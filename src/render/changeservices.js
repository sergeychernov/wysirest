(function(){function changeservices(it
/*``*/) {
var out='<html><body><div>Update Services</div><form action="/updateservice" method="post"><div><textarea id="services" name="services" style="height:90%; width:90%;">'+(it.json)+'</textarea></div><input type="submit" value="Update" /></form></body></html>';return out;
}var itself=changeservices, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {_page.render=_page.render||{};_page.render['changeservices']=itself;}}());