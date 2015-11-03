'usestrict';

var layar = function(options) {
	this.options = options ? options : null;

	this.run = function() {
		return true;
	}
	return this;
}

// var string = "This is a string with some bold text. There are two paragraphs here.";
// var htmlString = "";

// var formats = [
//     {
//      	type: "b",
//         start: 27,
//         end: 37,
//         level: 1
//     },
//     {
//      	type: "p",
//         start: 37,
//         end: 68,
//         level: 0
//     },
//     {
//      	type: "p",
//         start: 0,
//         end: 37,
//         level: 0
//     }
// ]

// var nodes;

// String.prototype.splice = function( idx, rem, s ) {
//     return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
// };

// function compileDocumentNodes() {
//     nodes = [];
//     formats.forEach(function(format) {
//    		nodes.push({pos: format.start, val: ["<",format.type, ">"].join(""), level: format.level});
// 		nodes.push({pos: format.end, val: ["</",format.type, ">"].join(""), level: format.level});
//     });
//     nodes = nodes.sort(sorter(nodes, 'level', false));
//     nodes = nodes.sort(sorter(nodes, 'pos', true));
// }

// function sorter(obj, field, dir) {
// 	return function(a,b) {
//         return Number(dir ? lessThan(a[field], b[field]) : moreThan(a[field], b[field]));
// 	}
// }

// function lessThan(a,b) {
//  	return a < b;   
// }

// function moreThan(a,b) {
//  	return b < a;   
// }


// function updateStringWithNodes() {
// 	htmlString = string;
// 	nodes.forEach(function(node) { 
//     	htmlString = htmlString.splice( node.pos, 0, node.val );
// 	});
//     console.log(htmlString);
// 	document.getElementById('output').innerHTML = htmlString;
// }


// function run() {
//     console.clear();
//  	compileDocumentNodes(); 
//     updateStringWithNodes();
// }

module.exports.layar = layar;