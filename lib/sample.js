var data = {
	string: "This is a string with some bold text. There are two paragraphs here.",
	outputFormat: "html",
	formats: [
		{
			type: "b",
		    	start: 27,
		    	end: 37,
		    	level: 1
		},
		{
			type: "p",
		    	start: 37,
		    	end: 68,
		    	level: 0
		},
		{
			type: "p",
		    	start: 0,
		    	end: 37,
		    	level: 0
		}
	]
}

module.exports.data = data;