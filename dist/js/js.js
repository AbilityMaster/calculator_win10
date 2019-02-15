"use strict"


window.onload = function() {

		//alert(document.querySelector("#select").childNodes.length);

		
		function sum(arr) {
			return arr.reduce(function(a, b) {
				return a + b;
			});
		}

	function sumArgs() {
		var arguments.join = [].join;
		var str = arguments.join('')
	}
	alert(sumArgs(1,2,3));

	}

