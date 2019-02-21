'use strict'

window.onload = function() {
	var numbers = document.querySelectorAll('.calc__button_number'),
	display = document.querySelector('.display'),
	smallDisplay = document.querySelector('.small-display__block'),
	operationList = document.querySelectorAll('.calc__button_operation'),
	reverse = document.querySelector('.calc__button_reverse'),
	point = document.querySelector('.calc__button_add-point'),
	resultButton = document.querySelector('.calc__button_get-result'),
	percent = document.querySelector('.calc__button_percent'),
	sqrt = document.querySelector('.calc__button_sqrt'),
	pow = document.querySelector('.calc__button_pow'),
	frac = document.querySelector('.calc__button_frac');

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
		ValueForProgressive = undefined,
		currentValue = undefined,
		resultPressed = false,
		operationPressed = false,
		needNewValue = false,
		needValueForProgressive = false,
		enteredNewValue = false,
		typeOperation = '',
		maxLength = 10,
		singleFunction = false,
		operations = {
			disabled: false, 
			'+': function() {
				if (resultPressed) {
					currentValue += ValueForProgressive;
				}
				else {
					currentValue += parseFloat(display.innerHTML);
				}

				display.innerHTML = trimmer(currentValue);
			},
			'-': function() {
				if (resultPressed) {
					currentValue -= ValueForProgressive;
				}
				else {
					currentValue -= parseFloat(display.innerHTML);
				}

				display.innerHTML = trimmer(currentValue);
			},
			'*': function() {
				if (resultPressed) {
					currentValue *= ValueForProgressive;
				}
				else {
					currentValue *= parseFloat(display.innerHTML);
				}

				display.innerHTML = trimmer(currentValue);
			},
			'÷': function() {
				if (ValueForProgressive === 0 || parseFloat(display.innerHTML) === 0)
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

					display.innerHTML = trimmer(currentValue);
				} 
			},
			'POW': function() {
				currentValue = Math.pow(currentValue,2);
				display.innerHTML = trimmer(currentValue);
			},
			'FRAC': function() {
				currentValue = 1 / currentValue;
				display.innerHTML = trimmer(currentValue);
			},
			'SQRT': function() {
				currentValue = Math.sqrt(currentValue);
				display.innerHTML = trimmer(currentValue);
			}
		};

		function isNumeric(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}

		function disableButtons() {
			reverse.classList.remove('calc__button_enabled');
			reverse.classList.add('calc__button_disabled');
			percent.classList.remove('calc__button_enabled');
			percent.classList.add('calc__button_disabled');
			sqrt.classList.remove('calc__button_enabled');
			sqrt.classList.add('calc__button_disabled');
			pow.classList.remove('calc__button_enabled');
			pow.classList.add('calc__button_disabled');
			frac.classList.remove('calc__button_enabled');
			frac.classList.add('calc__button_disabled');
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
			percent.classList.add('calc__button_enabled');
			percent.classList.remove('calc__button_disabled');
			sqrt.classList.add('calc__button_enabled');
			sqrt.classList.remove('calc__button_disabled');
			pow.classList.add('calc__button_enabled');
			pow.classList.remove('calc__button_disabled');
			frac.classList.add('calc__button_enabled');
			frac.classList.remove('calc__button_disabled');
			operationList.forEach(function(element){
				element.classList.add('calc__button_enabled');
				element.classList.remove('calc__button_disabled');
			});
		}

		this.percent = function() {
			if (operations.disabled) {
				return;
			}

			if (!currentValue) {
				display.innerHTML = 0;
				return;
			}

			var temp = parseFloat(display.innerHTML)/100*currentValue;
			display.innerHTML = trimmer(temp);
		}

		function trimmer(temp) {
			temp = +temp.toPrecision(6);
			if (String(temp).length > maxLength) {
				temp = temp.toPrecision(6);
			}

			return temp;
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
			ValueForProgressive = undefined;
			needValueForProgressive = false,
			enteredNewValue = false;
			this.singleFunction = false;
			smallDisplay.innerHTML = '';
		}

		this.backspace = function() {
			var length = display.innerHTML.length;
			if (length === 2 && display.innerHTML[0] === '-' || length === 1) {
				display.innerHTML = '0';
				return;
			}

			if (display.innerHTML === 'Деление на 0 невозможно') {
				display.style.fontSize = '45px';
				operations.disabled = false;
				display.innerHTML = '0';
				activateButtons();
				return;
			}

			display.innerHTML = display.innerHTML.slice(0,length-1);
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

		this.stroke = ' '+display.innerHTML + ' ' + operation;
		if (enteredNewValue) {
			if (smallDisplay.offsetWidth > 280) {
				smallDisplay.style.width = 1000;
			}
			smallDisplay.innerHTML += this.stroke;
		} else {
			if (parseFloat(display.innerHTML) === 0) {
				smallDisplay.innerHTML = '0 ' + operation; 
			}
			smallDisplay.innerHTML = smallDisplay.innerHTML.slice(0,smallDisplay.innerHTML.length-1) + operation;
		}

		if (this.singleFunction) {
			currentValue = parseFloat(display.innerHTML);
			typeOperation = operation;		
			operations[typeOperation]();
			this.singleFunction = false;
			needNewValue = true;
			enteredNewValue = false;
			currentValue = 0;
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
			currentValue = parseFloat(display.innerHTML);
			typeOperation = operation;				
			operationPressed = true;
				enteredNewValue = false; // 
			}

			needNewValue = true;
		}

		this.result = function() {
			if (operations.disabled) {
				return;
			}

			smallDisplay.innerHTML = '';
			resultPressed = true;
			operationPressed = false;
			enteredNewValue = true;

			if (needValueForProgressive) {
				ValueForProgressive = parseFloat(display.innerHTML);
				needValueForProgressive = false;
			}

			if ((operationPressed || resultPressed) && currentValue !== undefined) {
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
	document.querySelector('.calc__button_pow').onclick = function() {
		calc.singleFunction = true;
		calc.operation('POW');
	}
	document.querySelector('.calc__button_frac').onclick = function() {
		calc.singleFunction = true;
		calc.operation('FRAC');
	}
	document.querySelector('.calc__button_sqrt').onclick = function() {
		calc.singleFunction = true;
		calc.operation('SQRT');
	}

	document.querySelector('.calc__button_percent').onclick = function() {
		calc.percent();
	}
	document.querySelector('.calc__button_backspace').onclick = function() {
		calc.backspace();
	}
}