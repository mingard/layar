'usestrict';

function format(val, start) {
	if (start) {
		return ["<", val , ">"].join("");
	} else {
		return ["</", val , ">"].join("");
	}
}

module.exports.format = format;