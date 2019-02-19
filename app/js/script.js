'use strict'

window.onload = function() {
	var numbers = document.querySelectorAll('.calc__button_number'),
	display = document.querySelector('.display'),
	smallDisplay = document.querySelector('.small-display'),
	operationList = document.querySelectorAll('.calc__button_operation'),
	reverse = document.querySelector('.calc__button_reverse'),
	point = document.querySelector('.calc__button_add-point'),
	resultButton = document.querySelector('.calc__button_get-result');

	numbers.forEach(function(element){
		element.addEventListener('click', function() {
			calc.numberPress(this.innerHTML);
		});
	});
	operationList.forEach(function(element){
		element.addEventListener('click', function() {
			calc.operation(this.innerHTML);
		});
	});
	function Calculator() {
		var self = this,
		ValueForProgressive = 0,
		currentValue = undefined,
		resultPressed = false,
		operationPressed = false,
		needNewValue = false,
		needValueForProgressive = false,
		enteredNewValue = false,
		typeOperation = '',
		maxLength = 10,
		operations = {
			disabled: false, 
			'+': function() {
				if (resultPressed) {
					currentValue += ValueForProgressive;
				}
				else {
					currentValue += +display.innerHTML;
				}
				trimmer();
				display.innerHTML = currentValue; 
			},
			'-': function() {
				if (resultPressed) {
					currentValue -= ValueForProgressive;
				}
				else {
					currentValue -= +display.innerHTML;
				}
				trimmer();
				display.innerHTML = currentValue;
			},
			'*': function() {
				if (resultPressed) {
					currentValue *= ValueForProgressive;
				}
				else {
					currentValue *= +display.innerHTML;
				}
				trimmer();
				display.innerHTML = currentValue; 
			},
			'÷': function() {
				if (ValueForProgressive === 0 || +display.innerHTML === 0)
				{	
					operations.disabled = true;
					disableButtons();
					display.style.fontSize = '20px';
					display.innerHTML = 'Деление на 0 невозможно';
				} else {
					if (resultPressed) {
						currentValue /= ValueForProgressive;
					}
					else {
						currentValue /= +display.innerHTML;
					}
					trimmer();
					display.innerHTML = currentValue; 
				} 
			}
		};

		function disableButtons() {
			reverse.classList.remove('calc__button_enabled');
			reverse.classList.add('calc__button_disabled');
			point.classList.remove('calc__button_enabled');
			point.classList.add('calc__button_disabled');
			resultButton.classList.remove('calc__button_enabled');
			resultButton.classList.add('calc__button_disabled');
			operationList.forEach(function(element){
				element.classList.remove('calc__button_enabled');
				element.classList.add('calc__button_disabled');
			});
		}

		function activateButtons() {
			reverse.classList.add('calc__button_enabled');
			reverse.classList.remove('calc__button_disabled');
			point.classList.add('calc__button_enabled');
			point.classList.remove('calc__button_disabled');
			resultButton.classList.add('calc__button_enabled');
			resultButton.classList.remove('calc__button_disabled');
			operationList.forEach(function(element){
				element.classList.add('calc__button_enabled');
				element.classList.remove('calc__button_disabled');
			});
		}

		function trimmer() {
			currentValue = +currentValue.toPrecision(6);
			if (String(currentValue).length > maxLength) {
				currentValue = currentValue.toPrecision(6);
			}
		}

		this.clear = function() {
			if (operations.disabled) {
				display.style.fontSize = '45px';
				operations.disabled = false;
				activateButtons();
			}
			display.innerHTML = '0';
			currentValue = undefined;
			resultPressed = false;
			operationPressed = false;
			needNewValue = false;
			typeOperation = '';
			ValueForProgressive = 0;
			needValueForProgressive = false,
			enteredNewValue = false;
		}

		this.addPoint = function(text) {
			if (operations.disabled) {
				return;
			}
			if (text.indexOf('.') === -1 && needNewValue ||
				text.indexOf('.') === -1 && resultPressed ||
				text.indexOf('.') !== -1 && needNewValue ||				
				text.indexOf('.') !== -1 && resultPressed
				) {
				display.innerHTML = '0.';
			needNewValue = false;
			return;
		} 
		if (text.indexOf('.') === -1) {
			display.innerHTML += '.';
		}
	}

	this.negate = function(data) {
		if (operations.disabled) {
			return;
		}
		display.innerHTML = +data * -1;
	}

	this.numberPress = function(number) {
		if (operations.disabled) {
			operations.disabled = false;
			this.clear();
			activateButtons();
		}
		enteredNewValue = true;
		display.style.fontSize = '45px';
		if (display.innerHTML === '0.') {
			display.innerHTML += number;
			needNewValue = false;
			resultPressed = false;
			console.log('+');
			return;
		} 
		if ((display.innerHTML === '0' || (needNewValue) || (resultPressed) || display.innerHTML === 'Деление на 0 невозможно')) {
			display.innerHTML = number;
			needNewValue = false;
			resultPressed = false;
		} else {
			display.innerHTML += number;
		}
	}

	this.operation = function(operation) {
		if (operations.disabled) {
			return;
		}
		needValueForProgressive = true;
		if (operationPressed) {
			if (enteredNewValue) {
				operations[typeOperation]();
				enteredNewValue = false;
			}
			typeOperation = operation;
		} else {
			currentValue = +display.innerHTML;
			typeOperation = operation;				
			operationPressed = true;
		}
		needNewValue = true;
	}

	this.result = function() {
		if (operations.disabled) {
			return;
		}
		resultPressed = true;
		operationPressed = false;
		if (needValueForProgressive) {
			ValueForProgressive = +display.innerHTML;
			needValueForProgressive = false;
		}
		if ((operationPressed || resultPressed) && currentValue != undefined) {
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