module.exports = require('./lib/layar');
var sample = require('./lib/sample.js');

var example = function() {
	var layarExample = module.exports.layar(sample.data);
	layarExample.run();
}

example();