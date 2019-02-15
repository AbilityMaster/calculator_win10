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
		maxLength = 10,
		operations = {
			'+': function() {
				if (resultPressed)
					currentValue += ValueForProgressive;
				else
					currentValue += +display.innerHTML;
				trimmer();
				display.innerHTML = currentValue; 
			},
			'-': function() {
				if (resultPressed)
					currentValue -= ValueForProgressive;
				else
					currentValue -= +display.innerHTML;
				trimmer();
				display.innerHTML = currentValue;
			},
			'*': function() {
				if (resultPressed)
					currentValue *= ValueForProgressive;
				else
					currentValue *= +display.innerHTML;
				trimmer();
				display.innerHTML = currentValue; 
			},
			'÷': function() {
				if (ValueForProgressive === 0 || +display.innerHTML === 0)
				{
					display.innerHTML = 'Деление на 0 невозможно'
					display.style.fontSize = '20px';
				}
				
				else {
						if (resultPressed)
					currentValue /= ValueForProgressive;
				else 
					currentValue /= +display.innerHTML;
				trimmer();
				display.innerHTML = currentValue; 
				}
			
			}
		};

		function trimmer() {
			currentValue = +currentValue.toPrecision(6);
			if (String(currentValue).length > maxLength)
						currentValue = currentValue.toPrecision(6);
			}

			this.clear = function() {
				display.innerHTML = '0';
				currentValue = 0;
				resultPressed = false;
				operationPressed = false;
				needNewValue = false;
				typeOperation = '';
				ValueForProgressive = 0;
				needValueForProgressive = false;
			}

			this.addPoint = function(text) {
				if (text.indexOf('.') === -1 && needNewValue ||
					text.indexOf('.') === -1 && resultPressed ||
					text.indexOf('.') !== -1 && needNewValue ||				
					text.indexOf('.') !== -1 && resultPressed
					) {
					display.innerHTML = '0.';
				needNewValue = false;
			} else
			if (text.indexOf('.') === -1) {
				display.innerHTML += '.';
			}
		}

		this.negate = function(data) {
			display.innerHTML = +data * -1;
		}

		this.numberPress = function(number) {
			display.style.fontSize = '45px';
			if (display.innerHTML === '0.') {
				display.innerHTML += number;
				needNewValue = false;
				resultPressed = false;
			} else
			if ((display.innerHTML === '0' || (needNewValue) || (resultPressed))) {
				display.innerHTML = number;
				needNewValue = false;
				resultPressed = false;
			}
			else
				display.innerHTML += number;
		}

		this.operation = function(operation) {
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
				needNewValue = true;
			}
		}

		this.result = function() {
			resultPressed = true;
			operationPressed = false;
			if (needValueForProgressive) {
				ValueForProgressive = +display.innerHTML;
				needValueForProgressive = false;
			}
			if ((operationPressed || resultPressed) && currentValue != null) {
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