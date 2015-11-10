module.exports = require('./lib/layar');
var fs = require('fs');
var sample = require('./lib/sample.js');

var example = function() {
	var layarExample = module.exports.layar(sample.data);
	layarExample.run();
}

var compileExample = function() {
	var sample = {
		data: {
			outputFormat: "html"
		}
	};

	getFile('./bin/in.txt', function(res) {
		if (res) {
			sample.data.string = res;
			getFile('./bin/map.json', function(json) {
				if (json) {
					sample.data.formats = JSON.parse(json);
					var layarExample = module.exports.layar(sample.data);
					layarExample.run();
				}
			})	
		}
	});

}

var getFile = function(fileName, next) {
	fs.exists(fileName, function(exists) {
		if (exists) {
			fs.stat(fileName, function(error, stats) {
				fs.open(fileName, "r", function(error, fd) {
					var buffer = new Buffer(stats.size);	
					fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
						var data = buffer.toString("utf8", 0, buffer.length);	
						next(data);
						fs.close(fd);
					});
				});
			});
		} else {
			return "file " + fileName + " does not exist";
		}
	});
}

compileExample();

//example();