'usestrict';

var html = require('./html.js');
var markdown = require('./markdown.js');

var layar = function(options) {

	this.options = options ? options : null;
	this.nodes; //All  auto generated output speicific nodes, e.g. {pos: 2, level: 0, val: "<p>"}
	this.output; //Output value

	//===============================
	//			UTILITIES
	//------------------------------------------------------

	this.compileDocumentNodes = function() {
		this.nodes = [];
		switch(this.options.outputFormat) {
			case "html":
				this.processor = html.format;
			break;
			case "markdown":
				this.processor = markdown.format;
			break;
			default: this.processor = html.format;
		}
		this.options.formats.forEach((function(format) {
			if (typeof(format.start) != "undefined") {
				this.nodes.push({pos: format.start, val: this.processor(format.type, true), level: format.level});
			}
			if (typeof(format.end) != "undefined") {
				this.nodes.push({pos: format.end, val: this.processor(format.type, false), level: format.level});
			}
		}).bind(this));
		this.nodes = this.nodes.sort(this.sorter('level', true));
		this.nodes = this.nodes.sort(this.sorter( 'pos', false));

	}

	//Starting from the end, update the raw string each node at position.
	this.updateStringWithNodes = function() {
		this.output = this.options.string;
		this.nodes.forEach((function(node) { 
			if (node.val != '') {
				this.output  = this.output.splice( node.pos, 0, node.val ); 	
			}
		}).bind(this));
	    	console.log("[RESPONSE -", this.output);
		// document.getElementById('output').innerHTML = this.output; //Browser testing
	}

	//Generates sorting function for given field based on ASC/DESC direction of sort on a given object
	this.sorter = function(field, dir) {
		return (function(a,b) {
			return dir ? this.numericSort(a[field], b[field]) : this.numericSort(b[field], a[field]);
		}).bind(this);
	}

	//Self explanatory sorting method
	this.numericSort = function(a,b) {
		if (Number(b) > Number(a)) return -1;
		if (Number(b) < Number(a)) return 1;
		else return 0;
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