'use strict'

window.onload = function() {
	var numbers = document.querySelectorAll('.calc__button_number'),
	display = document.querySelector('.display'),
	smallDisplay = document.querySelector('.small-display__block'),
	hiddenDisplay = document.querySelector('.small-display__add'),
	operationList = document.querySelectorAll('.calc__button_operation'),
	reverse = document.querySelector('.calc__button_reverse'),
	point = document.querySelector('.calc__button_add-point'),
	resultButton = document.querySelector('.calc__button_get-result'),
	percent = document.querySelector('.calc__button_percent'),
	sqrt = document.querySelector('.calc__button_sqrt'),
	pow = document.querySelector('.calc__button_pow'),
	frac = document.querySelector('.calc__button_frac'),
	arrowLeft = document.querySelector('.small-display__button_left'),
	arrowRight = document.querySelector('.small-display__button_right');

	numbers.forEach(function(element){
		element.addEventListener('click', function() {
			calc.numberPress(this.innerHTML);			
			smallDisplay.style.removeProperty('left');
			smallDisplay.style.right = 0;
		});
	});

	operationList.forEach(function(element){
		element.addEventListener('click', function() {
			calc.operation(this.innerHTML);
			smallDisplay.style.removeProperty('left');
			smallDisplay.style.right = 0;
		});
	});

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

	function Calculator() {
		var self = this,
		ValueForProgressive = undefined,
		currentValue = undefined,
		resultPressed = false,
		operationPressed = false,
		needNewValue = false,
		valueArray = [],
		needValueForProgressive = false,
		enteredNewValue = false,
		typeOperation = '',
		maxLength = 11,
		singleFunction = false,
		widthDisplay = smallDisplay.clientWidth,
		operations = {
			disabled: false, 
			'+': function() {
				if (resultPressed) {
					currentValue += ValueForProgressive;
				}
				else {
					currentValue += parseFloat(display.innerHTML);
				}
				console.log(currentValue);
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
				display.innerHTML = trimmer(Math.pow(parseFloat(display.innerHTML),2));
			},
			'FRAC': function() {
				display.innerHTML = trimmer(1 / parseFloat(display.innerHTML));
			},
			'SQRT': function() {
				display.innerHTML = trimmer(Math.sqrt(parseFloat(display.innerHTML)));
			},
			'NEGATE': function() {
				display.innerHTML = trimmer(parseFloat(display.innerHTML) * -1);
			},
			'PERCENT': function() {
				if (!currentValue) {
					display.innerHTML = 0;
					return;
				}
				return trimmer(parseFloat(display.innerHTML)/100*currentValue);
			},
			nameOp: {
				'POW': 'sqr',
				'FRAC': '1/',
				'SQRT': '√',
				'NEGATE': 'negate'
			}
		};

		function trimmer(temp) {
			temp = parseFloat(temp)
			temp.toPrecision(6);
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
			smallDisplay.innerHTML = '';
			smallDisplay.style.width = '';
			arrowLeft.style.visibility = 'hidden';
			arrowRight.style.visibility = 'hidden';
			currentValue = undefined;
			resultPressed = false;
			operationPressed = false;
			needNewValue = false;
			typeOperation = '';
			ValueForProgressive = undefined;
			needValueForProgressive = false,
			enteredNewValue = false;
			this.singleFunction = false;
			this.pressedSingleOperation = false;
			valueArray = [];
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
				text.indexOf('.') !== -1 && resultPressed) {
				display.innerHTML = '0.';
			needNewValue = false;
			return;
		} 

		if (text.indexOf('.') === -1) {
			display.innerHTML += '.';
		}
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

		if (this.pressedSingleOperation) {
			smallDisplay.innerHTML = '';
		}

		if ((display.innerHTML === '0' || (needNewValue) || (resultPressed) || display.innerHTML === 'Деление на 0 невозможно')) {
			display.innerHTML = number;
			needNewValue = false;
			resultPressed = false;
			this.pressedSingleOperation = false;
		} else {
			if (display.innerHTML.length > maxLength) {
				return;
			}
			display.innerHTML += number;
		}
	}

	this.singleOperation = function(operation) {
		if (operations.disabled) {
			return;
		}
		if (!this.pressedSingleOperation) {
			this.data = smallDisplay.innerHTML;
			if (operation === 'PERCENT') {
				valueArray.push(operations[operation]());
				smallDisplay.innerHTML += valueArray[valueArray.length-1];
			} else {
				valueArray.push(operations.nameOp[operation] + '('+ display.innerHTML +')');
				smallDisplay.innerHTML += ' ' + operations.nameOp[operation] + '('+ display.innerHTML +')';
			}
		} 
		if (this.pressedSingleOperation) {
			if (operation === 'PERCENT') {
				valueArray[valueArray.length-1] = operations[operation]();
				smallDisplay.innerHTML = this.data + valueArray[valueArray.length - 1];
			} else {
				valueArray[valueArray.length-1] = operations.nameOp[operation] + '(' + valueArray[valueArray.length - 1] + ')';
				smallDisplay.innerHTML = this.data + ' ' +valueArray[valueArray.length - 1] + ' ';
			}
		}

		this.pressedSingleOperation = true;
		this.singleFunction = false;
		needNewValue = true;
		enteredNewValue = true;

		if (operation === 'PERCENT') {
			display.innerHTML = operations[operation]();
			return;
		}

		operations[operation]();
	}

	this.operation = function(operation) {
		if (operations.disabled) {
			return;
		}	

		if (enteredNewValue && this.pressedSingleOperation) {
			valueArray.push(operation);
			if ((smallDisplay.clientWidth + hiddenDisplay.clientWidth) >= 286) {
				arrowLeft.style.visibility = 'visible';
				arrowRight.style.visibility = 'visible';
				smallDisplay.style.width = smallDisplay.clientWidth + hiddenDisplay.clientWidth + 20;
			}
			smallDisplay.innerHTML += valueArray[valueArray.length-1];
		} else if (enteredNewValue) {
			valueArray.push(display.innerHTML);
			valueArray.push(operation);
			hiddenDisplay.innerHTML = valueArray[valueArray.length-2] + valueArray[valueArray.length-1];
			if ((smallDisplay.clientWidth + hiddenDisplay.clientWidth) >= 286) {
				arrowLeft.style.visibility = 'visible';
				arrowRight.style.visibility = 'visible';
				smallDisplay.style.width = smallDisplay.clientWidth + hiddenDisplay.clientWidth + 20;
			}
			smallDisplay.innerHTML += ' ' + valueArray[valueArray.length-2];
			smallDisplay.innerHTML += ' ' + valueArray[valueArray.length-1];
		}

		valueArray[valueArray.length - 1] = operation;	
		smallDisplay.innerHTML = smallDisplay.innerHTML.slice(0,smallDisplay.innerHTML.length-1) + valueArray[valueArray.length-1];
		this.pressedSingleOperation = false;
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
			enteredNewValue = false; 
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
	smallDisplay.style.removeProperty('left');
	smallDisplay.style.right = 0;
	calc.addPoint(display.innerHTML);
}
document.querySelector('.calc__button_reverse').onclick = function() {		
	smallDisplay.style.removeProperty('left');
	smallDisplay.style.right = 0;
	calc.singleOperation('NEGATE');
}
document.querySelector('.calc__button_clear').onclick = function() {
	calc.clear();
}
document.querySelector('.calc__button_pow').onclick = function() {
	smallDisplay.style.removeProperty('left');
	smallDisplay.style.right = 0;
	calc.singleOperation('POW');
}
document.querySelector('.calc__button_frac').onclick = function() {
	calc.singleOperation('FRAC');
	smallDisplay.style.removeProperty('left');
	smallDisplay.style.right = 0;
}
document.querySelector('.calc__button_sqrt').onclick = function() {
	calc.singleOperation('SQRT');
	smallDisplay.style.removeProperty('left');
	smallDisplay.style.right = 0;
}

document.querySelector('.calc__button_percent').onclick = function() {
	calc.singleOperation('PERCENT');
	smallDisplay.style.removeProperty('left');
	smallDisplay.style.right = 0;
}
document.querySelector('.calc__button_backspace').onclick = function() {
	calc.backspace();
}
document.querySelector('.small-display__button_left').onclick = function() {
	if (smallDisplay.clientWidth > 286) {
		smallDisplay.style.removeProperty('right');
		smallDisplay.style.left = 0;
	} else {
		return;
	}
}
document.querySelector('.small-display__button_right').onclick = function() {
	if (smallDisplay.clientWidth > 286) {
		smallDisplay.style.removeProperty('left');
		smallDisplay.style.right = 0;
	} else {
		return;
	}
}
}