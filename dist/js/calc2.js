'use strict'

window.onload = function() {
	var numbers = document.querySelectorAll('.calc__button_number');
	var display = document.querySelector('.display');	
	var smallDisplay = document.querySelector('.small-display');
	var operations = document.querySelectorAll('.calc__button_operation');

	numbers.forEach(function(element){
		element.addEventListener('click', function() {
			calc.numberPress(this.innerHTML);
		});
	});
	operations.forEach(function(element){
		element.addEventListener('click', function() {
			calc.operation(this.innerHTML);
		});
	});

	function Calculator() {
		var self = this,
		ValueForProgressive = 0,
		currentValue = 0,
		resultPressed = false,
		operationPressed = false,
		needNewValue = false,
		needValueForProgressive = false,
		typeOperation = '',
		enteredValue = false,
		maxLength = 10,
		operationPressedFlag = false,
		operations = {
			'+': function() {
				if (resultPressed)
					currentValue += ValueForProgressive;
				else
					currentValue += +display.innerHTML;
				trimValue();
				display.innerHTML = currentValue; 
			},
			'-': function() {
				if (resultPressed)
					currentValue -= ValueForProgressive;
				else
					currentValue -= +display.innerHTML;
				trimValue();
				display.innerHTML = currentValue;
			},
			'*': function() {
				if (resultPressed)
					currentValue *= ValueForProgressive;
				else
					currentValue *= +display.innerHTML;
				trimValue();
				display.innerHTML = currentValue; 
			},
			'÷': function() {
				if (resultPressed)
					currentValue /= ValueForProgressive;
				else 
					currentValue /= +display.innerHTML;
				trimValue();
				display.innerHTML = currentValue; 
			}
		};

		function trimValue() {
			var temp = currentValue,
			lengthOut = 0,
			fracLength = 0;
			if (String(currentValue).length > maxLength) {
				temp = temp.toExponential();
				if (temp.length > maxLength) {
					lengthOut = temp.length - maxLength;
					fracLength = temp.indexOf('e') - temp.indexOf('.') - 1 - lengthOut;
					currentValue = currentValue.toExponential(fracLength);
				} else {
					currentValue = temp;
				}
			}
		}

		this.clear = function() {
			display.innerHTML = '0';
			currentValue = 0;
			resultPressed = false;
			operationPressed = false;
			needNewValue = false;
			operationPressedFlag = false;
			typeOperation = '';
		}


		var newv;

		this.addPoint = function(text) {
			if (text.indexOf('.') == -1 && needNewValue ||
				text.indexOf('.') == -1 && operationPressedFlag ||
				text.indexOf('.') == -1 && resultPressed ||
				text.indexOf('.') !== -1 && needNewValue ||
				text.indexOf('.') !== -1 && operationPressedFlag ||
				text.indexOf('.') !== -1 && resultPressed
				) {
				display.innerHTML = '0.';
				needNewValue = false;
				//operationPressed = true;
				//resultPressed = false;
			} else
			if (text.indexOf('.') == -1) {
				display.innerHTML += '.';
			}
		}

		this.negate = function(data) {
			display.innerHTML = +data * -1;
		}

		this.numberPress = function(number) {
			if (display.innerHTML === '0.') {
				display.innerHTML += number;
				needNewValue = false;
				resultPressed = false;
			} else
			if ((display.innerHTML === '0' || (needNewValue) || (resultPressed))) {
				display.innerHTML = number;
				needNewValue = false;
				resultPressed = false;
				operationPressedFlag = false;
			}
			else
				display.innerHTML += number;
		}

		this.operation = function(operation) {
			needNewValue = true;
			needValueForProgressive = true;
			if (operationPressed) {
				if (+display.innerHTML !== currentValue) {
					operations[typeOperation]();
				}
				typeOperation = operation;
			} else {
				currentValue = +display.innerHTML;
				typeOperation = operation;				
				operationPressed = true;
				operationPressedFlag = true;
			}
		}

		this.result = function() {
			resultPressed = true;
			operationPressed = false;
			if (needValueForProgressive) {
				ValueForProgressive = +display.innerHTML;
				needValueForProgressive = false;
			}
			if (operationPressed || resultPressed) {
				operations[typeOperation]();
			}

		}
	}
	var calc = new Calculator();

	document.querySelector('.calc__button_get-result').onclick = function() {
		calc.result();
	}
	document.querySelector('.calc__button_add-point').onclick = function() {
		calc.addPoint(display.innerHTML);
	}
	document.querySelector('.calc__button_reverse').onclick = function() {
		calc.negate(display.innerHTML);
	}
	document.querySelector('.calc__button_clear').onclick = function() {
		calc.clear();
	}
}