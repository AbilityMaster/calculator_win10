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
				if (resultPressed) {
					currentValue += ValueForProgressive;
					display.innerHTML = currentValue; 
				} else {
					currentValue += +display.innerHTML;
					display.innerHTML = currentValue; 
				}
			},
			'-': function() {
				if (resultPressed) {
					currentValue -= ValueForProgressive;
					trimValue();
					display.innerHTML = currentValue; 
				} else {
					currentValue -= +display.innerHTML;
					display.innerHTML = currentValue; 
				}
			},
			'*': function() {
				if (resultPressed) {
					currentValue *= ValueForProgressive;
					display.innerHTML = currentValue; 
				} else {
					currentValue *= +display.innerHTML;
					display.innerHTML = currentValue; 
				}
			},
			'÷': function() {
				if (resultPressed) {
					currentValue /= ValueForProgressive;
					display.innerHTML = Math.round(currentValue); 
				} else {
					currentValue /= +display.innerHTML;
					display.innerHTML = Math.round(currentValue);
				}
			}
		};

		function trimValue() {
			if (String(currentValue).indexOf('.')) {
				var positionPoint = currentValue.toFixed(10).indexOf('.');
				currentValue = currentValue.toFixed(maxLength - positionPoint);
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
			enteredValue = true;
			if (display.innerHTML === '0.') {
				display.innerHTML += number;
			} else
			if ((display.innerHTML === '0' || (needNewValue))) {
				display.innerHTML = number;
				needNewValue = false;
				operationPressedFlag = false;
			}
			else
				display.innerHTML += number;
		}

		this.operation = function(operation) {
			smallDisplay.innerHTML = operation;
			needNewValue = true;
			needValueForProgressive = true;
			if (operationPressed) {
				if (+display.innerHTML !== currentValue || (operationPressed && enteredValue)) {
					operations[typeOperation]();
				}
				enteredValue = false;
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