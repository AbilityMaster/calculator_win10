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

	let MESSAGES = {
		OVERFLOW: 'Переполнение',
		DIVIDE_BY_ZERO: 'Деление на 0 невозможно',
		UNCORRECT_DATA: 'Введены неверные данные'
	};

	let OPERATIONS = {
		PERCENT: 'PERCENT'
	}

	class Operations {
		constructor() {
			this.operations = {
				'+': function() {
					if (this.resultPressed) {
						this.currentValue += this.ValueForProgressive;
					}
					else {
						this.currentValue += parseFloat(display.innerHTML);
					}
					if (!isFinite(this.currentValue)) {
						disableButtons();
						display.style.fontSize = '20px';
						display.innerHTML = MESSAGES.OVERFLOW;
						this.operationsDisabled = true;
						return;
					}
					display.innerHTML = this.trimmer(this.currentValue);
				},
				'-': function() {
					if (this.resultPressed) {
						this.currentValue -= this.ValueForProgressive;
					}
					else {
						this.currentValue -= parseFloat(display.innerHTML);
					}
					if (!isFinite(this.currentValue)) {
						disableButtons();
						display.style.fontSize = '20px';
						display.innerHTML = MESSAGES.OVERFLOW;
						this.operationsDisabled = true;
						return;
					}
					display.innerHTML = this.trimmer(this.currentValue);
				},
				'*': function() {
					if (this.resultPressed) {
						this.currentValue *= this.ValueForProgressive;
					}
					else {
						this.currentValue *= parseFloat(display.innerHTML);
					}
					if (!isFinite(this.currentValue)) {
						disableButtons();
						display.style.fontSize = '20px';
						display.innerHTML = MESSAGES.OVERFLOW;
						this.operationsDisabled = true;
						return;
					}
					display.innerHTML = this.trimmer(this.currentValue);
				},
				'÷': function() {
					if (this.ValueForProgressive === 0 || parseFloat(display.innerHTML) === 0)
					{	
						this.operationsDisabled = true;
						disableButtons();
						display.style.fontSize = '20px';
						display.innerHTML = MESSAGES.DIVIDE_BY_ZERO;
						return;
					} 

					if (this.resultPressed) {
						this.currentValue /= this.ValueForProgressive;
					}
					else {
						this.currentValue /= +display.innerHTML;
					}

					display.innerHTML = this.trimmer(this.currentValue);
				},
				'POW': function() {
					var temp = Math.pow(parseFloat(display.innerHTML),2);
					if (!isFinite(temp)) {
						disableButtons();
						display.style.fontSize = '20px';
						display.innerHTML = MESSAGES.OVERFLOW;
						this.operationsDisabled = true;
						return;
					}
					display.innerHTML = this.trimmer(Math.pow(parseFloat(display.innerHTML),2));
				},
				'FRAC': function() {
					if (parseFloat(display.innerHTML) === 0)	{	
						this.operationsDisabled = true;
						disableButtons();
						display.style.fontSize = '20px';
						display.innerHTML = MESSAGES.DIVIDE_BY_ZERO;
						return;
					} 
					var temp = 1 / parseFloat(display.innerHTML)
					if (!isFinite(temp)) {
						disableButtons();
						display.style.fontSize = '20px';
						display.innerHTML = MESSAGES.OVERFLOW;
						this.operationsDisabled = true;
						return;
					}
					display.innerHTML = this.trimmer(temp);
				},
				'SQRT': function() {
					if (parseFloat(display.innerHTML) < 0) {
						disableButtons();
						display.style.fontSize = '20px';
						display.innerHTML =  MESSAGES.UNCORRECT_DATA;
						this.operationsDisabled = true;
						return;
					}
					var temp = Math.sqrt(parseFloat(display.innerHTML));
					if (!isFinite(temp)) {
						disableButtons();
						display.style.fontSize = '20px';
						display.innerHTML = MESSAGES.OVERFLOW;
						this.operationsDisabled = true;
						return;
					}
					display.innerHTML = this.trimmer(temp);
				},
				'NEGATE': function() {
					var temp = parseFloat(display.innerHTML) * -1;
					if (!isFinite(temp)) {
						disableButtons();
						display.style.fontSize = '20px';
						display.innerHTML = MESSAGES.OVERFLOW;
						this.operationsDisabled = true;
						return;
					}
					display.innerHTML = this.trimmer(temp);
				},
				'PERCENT': function() {
					var temp = parseFloat(display.innerHTML)/100*this.currentValue;
					if (!isFinite(temp)) {
						disableButtons();
						display.style.fontSize = '20px';
						display.innerHTML = MESSAGES.OVERFLOW;
						this.operationsDisabled = true;
						return;
					}
					if (!this.currentValue) {
						display.innerHTML = 0;
						return;
					}
					return this.trimmer(temp);
				},
				nameOp: {
					'POW': 'sqr',
					'FRAC': '1/',
					'SQRT': '√',
					'NEGATE': 'negate'
				}


			}


		}

	}

	

	class Calculator extends Operations {
		constructor() {
			super();
			this.operationsDisabled = false;
			this.resultPressed = false;
			this.operationPressed = false;
			this.needNewValue = false;
			this.valueArray = [];
			this.currentValue = null;
			this.needValueForProgressive = false;
			this.enteredNewValue = false;
			this.typeOperation = '';
			this.pressedSingleOperation = false;
			this.maxLength = 11;
			this.singleFunction = false;
		}

		trimmer(temp) {
			temp = parseFloat(temp)
			temp.toPrecision(6);
			if (String(temp).length > this.maxLength) {
				temp = temp.toPrecision(6);
			}
			return temp;
		}

		backspace() {
			var length = display.innerHTML.length;
			if (length === 2 && display.innerHTML[0] === '-' || length === 1) {
				display.innerHTML = '0';
				return;
			}

			if (display.innerHTML === MESSAGES.DIVIDE_BY_ZERO || display.innerHTML === MESSAGES.OVERFLOW || display.innerHTML === MESSAGES.UNCORRECT_DATA) {
				smallDisplay.innerHTML = '';
				display.style.fontSize = '45px';
				this.operationsDisabled = false;
				display.innerHTML = '0';
				activateButtons();
				return;
			}

			display.innerHTML = display.innerHTML.slice(0,length-1);	
		}

		clear() {
			if (this.operationsDisabled) {
				display.style.fontSize = '45px';
				this.operationsDisabled = false;
				activateButtons();
			}

			display.innerHTML = '0';
			smallDisplay.innerHTML = '';
			smallDisplay.style.width = '';
			hiddenDisplay.innerHTML = '';
			hiddenDisplay.style.width = '';
			arrowLeft.style.visibility = 'hidden';
			arrowRight.style.visibility = 'hidden';
			this.currentValue = null;
			this.resultPressed = false;
			this.operationPressed = false;
			this.needNewValue = false;
			this.typeOperation = '';
			this.needValueForProgressive = false,
			this.enteredNewValue = false;
			this.singleFunction = false;
			smallDisplay.innerHTML = '';
			this.valueArray = [];
		}

		singleOperation(operation) {
			if (this.operationsDisabled) {
				return;
			}
			if (!this.pressedSingleOperation) {
				this.data = smallDisplay.innerHTML;
				this.dataWidth = smallDisplay.clientWidth;
				if (operation === OPERATIONS.PERCENT) {
					this.valueArray.push(this[operation]());
					smallDisplay.innerHTML += '&nbsp;' + this.valueArray[this.valueArray.length-1];
				} else {
					this.valueArray.push(this.nameOp[operation] + '('+ display.innerHTML +')');
					hiddenDisplay.innerHTML = '&nbsp;' + this.valueArray[this.valueArray.length-1];
					if ((this.dataWidth + hiddenDisplay.clientWidth) >= 286) {
						smallDisplay.style.width = this.dataWidth + hiddenDisplay.clientWidth;
					}
					smallDisplay.innerHTML += '&nbsp;' + this.nameOp[operation] + '('+ display.innerHTML +')';
				}
			}
			if (this.pressedSingleOperation) {
				if (operation ===  OPERATIONS.PERCENT) {
					this.valueArray[this.valueArray.length-1] = this[operation]();
					smallDisplay.innerHTML = this.data + '&nbsp;' + this.valueArray[this.valueArray.length - 1] + '&nbsp;';
				} else {
					this.valueArray[this.valueArray.length-1] = this.nameOp[operation] + '(' + this.valueArray[this.valueArray.length - 1] + ')';
					hiddenDisplay.innerHTML = '&nbsp;' + this.valueArray[this.valueArray.length-1] + '&nbsp;';
					if ((this.dataWidth + hiddenDisplay.clientWidth) >= 286) {
						arrowLeft.style.visibility = 'visible';
						arrowRight.style.visibility = 'visible';
						smallDisplay.style.width = this.dataWidth + hiddenDisplay.clientWidth;
					} 
					smallDisplay.innerHTML = this.data + '&nbsp;' + this.valueArray[this.valueArray.length - 1] + '&nbsp;';
				}
			}

			this.pressedSingleOperation = true;
			this.singleFunction = false;
			this.needNewValue = true;
			this.enteredNewValue = true;

			if (operation ===  OPERATIONS.PERCENT) {
				display.innerHTML = super[operation]();
				return;
			}

			super[operation]();
		}

		result() {
			if (this.operationsDisabled) {
				return;
			}

			smallDisplay.innerHTML = '';
			this.resultPressed = true;
			this.operationPressed = false;
			this.enteredNewValue = true;

			if (this.needValueForProgressive) {
				this.ValueForProgressive = parseFloat(display.innerHTML);
				this.needValueForProgressive = false;
			}

			if ((this.operationPressed || this.resultPressed) && this.currentValue !== null) {
				this.operations[this.typeOperation]();
			}

		}

		operation(operation) {
			if (this.operationsDisabled) {
				return;
			}

			if (this.enteredNewValue && this.pressedSingleOperation) {
				this.valueArray.push(operation);
				hiddenDisplay.innerHTML = '&nbsp;' + this.valueArray[this.valueArray.length-1];
				if ((smallDisplay.clientWidth + hiddenDisplay.clientWidth) >= 286) {
					arrowLeft.style.visibility = 'visible';
					arrowRight.style.visibility = 'visible';
					smallDisplay.style.width = smallDisplay.clientWidth + hiddenDisplay.clientWidth + 1;
				}
				smallDisplay.innerHTML += this.valueArray[this.valueArray.length-1];
			} else if (this.enteredNewValue) {
				this.valueArray.push(display.innerHTML);
				this.valueArray.push(operation);
				hiddenDisplay.innerHTML = '&nbsp;' + this.valueArray[this.valueArray.length-2] + '&nbsp;' + this.valueArray[this.valueArray.length-1];
				if ((smallDisplay.clientWidth + hiddenDisplay.clientWidth) >= 286) {
					arrowLeft.style.visibility = 'visible';
					arrowRight.style.visibility = 'visible';
					smallDisplay.style.width = smallDisplay.clientWidth + hiddenDisplay.clientWidth;
				}
				smallDisplay.innerHTML += '&nbsp;' + this.valueArray[this.valueArray.length-2];
				smallDisplay.innerHTML += '&nbsp;' + this.valueArray[this.valueArray.length-1];
			}

			this.valueArray[this.valueArray.length - 1] = operation;	
			smallDisplay.innerHTML = smallDisplay.innerHTML.slice(0,smallDisplay.innerHTML.length-1) + this.valueArray[this.valueArray.length-1];
			this.pressedSingleOperation = false;
			this.needValueForProgressive = true;

			if (this.operationPressed) {
				if (this.enteredNewValue) {
					this[this.typeOperation]();
					this.enteredNewValue = false;
				}
				this.typeOperation = operation;
			} else {
				this.currentValue = parseFloat(display.innerHTML);
				this.typeOperation = operation;				
				this.operationPressed = true;
				this.enteredNewValue = false; 
			}

			this.needNewValue = true;
		}


		addPoint(text) {
			if (this.operationsDisabled) {
				return;
			}

			if (text.indexOf('.') === -1 && this.needNewValue ||
				text.indexOf('.') === -1 && this.resultPressed ||
				text.indexOf('.') !== -1 && this.needNewValue ||				
				text.indexOf('.') !== -1 && this.resultPressed) {
				display.innerHTML = '0.';
			this.needNewValue = false;
			return;
		} 

		if (text.indexOf('.') === -1) {
			display.innerHTML += '.';
		}
	}

	numberPress(number) {
		if (this.operationsDisabled) {
			this.operationsDisabled = false;
			this.clear();
			activateButtons();
		}

		this.enteredNewValue = true;
		display.style.fontSize = '45px';

		if (display.innerHTML === '0.') {
			display.innerHTML += number;
			this.needNewValue = false;
			this.resultPressed = false;
			return;
		}

		if ((display.innerHTML === '0' || (this.needNewValue) || (this.resultPressed) || display.innerHTML === MESSAGES.DIVIDE_BY_ZERO)) {
			display.innerHTML = number;
			this.needNewValue = false;
			this.resultPressed = false;
			this.pressedSingleOperation = false;
		} else {
			if (display.innerHTML.length > this.maxLength) {
				return;
			}
			display.innerHTML += number;
		}
	}

}

var calc = new Calculator();

console.log(calc);

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