'usestrict';

var map = {
	p: { 
		markdown: {
			start: '\r \n', 
			end: '  \r\n'
		}
	},
	h1: { 
		markdown: {
			start: '#'
		}
	},
	h2: { 
		markdown: {
			start: '##'
		}
	},
	h3: { 
		markdown: {
			start: '###'
		}
	},
	h4: { 
		markdown: {
			start: '####'
		}
	},
	h5: { 
		markdown: {
			start: '#####'
		}
	},
	h6: { 
		markdown: {
			start: '######'
		}
	},
	i: { 
		markdown: {
			start: "*", 
			end: "*"}
	},
	b: { 
		markdown: {
			start: "**", 
			end: "**"
		}
	},
	code: { 
		markdown: {
			start: "`", 
			end: "`"
		}
	},
	br: { 
		markdown: {
			start: "\r\n"
		}
	}
}

module.exports.map = map;