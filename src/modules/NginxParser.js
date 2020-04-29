// Created by hiedt-2054 on 29/04/2020
module.exports = function(format){
	var factors = format.match(/(\")?(\$)?[a-zA-Z_-]+(\")?/g);

	return function(line){
		var text, array, data = {}, mark = false, key;
		line.replace(/[ ]{2,}/g, '');
		text = line.split("").map(char => { 
			if(char == "\"" || /[\[\]]/.test(char)) mark = !mark; 
			if(mark && char == " "){
				return '\u0000'; 
            }

			return char; 
        }).join("");

		array = text.split(" ");
		array.map((str, i) => {
			if(!factors[i]) return "";
			key = factors[i].replace(/[\$\"]/g, "");
			data[key] = str.replace(/\u0000/g, ' ');
        });

		return data;
	};
};