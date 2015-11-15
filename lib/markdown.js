'usestrict';

var map = require('./markup-map.js').map;

function format(val, start) {
	if (start && map[val].markdown.start) {
		return map[val].markdown.start;
	} else if(!start && map[val].markdown.end) {
		return map[val].markdown.end;
	} else {
		return '';
	}
}

module.exports.format = format;