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
		this.nodes = [];
		this.options.formats.forEach((function(format) {
			switch(this.options.outputFormat) {
				case "html":
					this.processor = html.format;
				break;
				case "markdown":
					// this.processor = markdown.format;
				break;
				default: this.processor = html.format;
			}
			this.nodes.push({pos: format.start, val: this.processor(format.type, true), level: format.level});
			this.nodes.push({pos: format.end, val: this.processor(format.type, false), level: format.level});
		}).bind(this));
		this.nodes = this.nodes.sort(this.sorter(this.nodes, 'level', false));
		this.nodes = this.nodes.sort(this.sorter(this.nodes, 'pos', true));
	}

	//Starting from the end, update the raw string each node at position.
	this.updateStringWithNodes = function() {
		this.output = this.options.string;
		this.nodes.forEach((function(node) { 
	    		this.output  = this.output .splice( node.pos, 0, node.val );
		}).bind(this));
	    console.log(this.output);
		// document.getElementById('output').innerHTML = this.output; //Browser testing
	}

	//Generates sorting function for given field based on ASC/DESC direction of sort on a given object
	this.sorter = function(obj, field, dir) {
		return (function(a,b) {
			return Number(dir ? this.lessThan(a[field], b[field]) : this.moreThan(a[field], b[field]));
		}).bind(this);
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