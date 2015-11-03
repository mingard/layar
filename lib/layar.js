'usestrict';

var html = require('./html.js');

var layar = function(options) {

	this.options = options ? options : null;
	this.nodes; //All  auto generated output speicific nodes, e.g. {pos: 2, level: 0, val: "<p>"}
	this.output; //Output value

	//===============================
	//			UTILITIES
	//------------------------------------------------------

	this.compileDocumentNodes = function() {
		var _self = this;
		_self.nodes = [];
		_self.options.formats.forEach(function(format) {
			switch(_self.options.outputFormat) {
				case "html":
					_self.processor = html.format;
				break;
				case "markdown":
					// _self.processor = markdown.format;
				break;
				default: _self.processor = html.format;
			}
			_self.nodes.push({pos: format.start, val: _self.processor(format.type, true), level: format.level});
			_self.nodes.push({pos: format.end, val: _self.processor(format.type, false), level: format.level});
		});
		_self.nodes = _self.nodes.sort(_self.sorter(_self.nodes, 'level', false));
		_self.nodes = _self.nodes.sort(_self.sorter(_self.nodes, 'pos', true));
	}

	//Starting from the end, update the raw string each node at position.
	this.updateStringWithNodes = function() {
		var _self = this;
		_self.output = _self.options.string;
		_self.nodes.forEach(function(node) { 
	    		_self.output  = _self.output .splice( node.pos, 0, node.val );
		});
	    	console.log(_self.output );
		// document.getElementById('output').innerHTML = _self.output; //Browser testing
	}

	//Generates sorting function for given field based on ASC/DESC direction of sort on a given object
	this.sorter = function(obj, field, dir) {
		var _self = this;
		return function(a,b) {
			return Number(dir ? _self.lessThan(a[field], b[field]) : _self.moreThan(a[field], b[field]));
		}
	}

	//Self explanatory sorting method
	this.lessThan = function(a,b) {
	 	return a < b;   
	}

	//Self explanatory sorting method
	this.moreThan = function(a,b) {
	 	return b < a;   
	}

	//===============================
	//		EXPOSED METHODS
	//------------------------------------------------------

	this.run = function() {
		this.compileDocumentNodes(); 
		this.updateStringWithNodes();
	}

	return this;
}

//Global utilities
String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

module.exports.layar = layar;