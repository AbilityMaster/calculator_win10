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
		var self = this;
		this.ValueForProgressive = undefined;
		this.currentValue = undefined;
		this.resultPressed = false;
		this.operationPressed = false;
		this.needNewValue = false;
		this.needValueForProgressive = false;
		this.enteredNewValue = false;
		this.typeOperation = '';
		this.maxLength = 10;
		this.singleFunction = false;
		this.operations = {
			disabled: false, 
			'+': function() {
				if (self.resultPressed) {
					self.currentValue += self.ValueForProgressive;
				}
				else {
					console.log(self.currentValue);
					self.currentValue += parseFloat(display.innerHTML);
				}

				display.innerHTML = self.trimmer(self.currentValue);
			},
			'-': function() {
				if (self.resultPressed) {
					self.currentValue -= self.ValueForProgressive;
				}
				else {
					self.currentValue -= parseFloat(display.innerHTML);
				}

				display.innerHTML = self.trimmer(self.currentValue);
			},
			'*': function() {
				if (self.resultPressed) {
					self.currentValue *= self.ValueForProgressive;
				}
				else {
					self.currentValue *= parseFloat(display.innerHTML);
				}
				display.innerHTML = self.trimmer(self.currentValue);
			},
			'÷': function() {
				if (self.ValueForProgressive === 0 || parseFloat(display.innerHTML) === 0)
				{	
					operations.disabled = true;
					disableButtons();
					display.style.fontSize = '20px';
					display.innerHTML = 'Деление на 0 невозможно';
				} else {
					if (self.resultPressed) {
						self.currentValue /= self.ValueForProgressive;
					}
					else {
						self.currentValue /= +display.innerHTML;
					}

					display.innerHTML = self.trimmer(self.currentValue);
				} 
			},
			'POW': function() {
				self.currentValue = Math.pow(self.currentValue,2);
				display.innerHTML = self.trimmer(self.currentValue);
			},
			'FRAC': function() {
				self.currentValue = 1 / self.currentValue;
				display.innerHTML = self.trimmer(self.currentValue);
			},
			'SQRT': function() {
				self.currentValue = Math.sqrt(self.currentValue);
				display.innerHTML = self.trimmer(self.currentValue);
			}


		}
	}

	Calculator.prototype.trimmer = function(temp) {
		temp = +temp.toPrecision(6);
		if (String(temp).length > this.maxLength) {
			temp = temp.toPrecision(6);
		}

		return temp;
	}

	Calculator.prototype.backspace = function() {
		var length = display.innerHTML.length;
		if (length === 2 && display.innerHTML[0] === '-' || length === 1) {
			display.innerHTML = '0';
			return;
		}

		if (display.innerHTML === 'Деление на 0 невозможно') {
			display.style.fontSize = '45px';
			Calculator.prototype.operations.disabled = false;
			display.innerHTML = '0';
			activateButtons();
			return;
		}

		display.innerHTML = display.innerHTML.slice(0,length-1);	
	}

	Calculator.prototype.clear = function() {
		if (Calculator.prototype.operations.disabled) {
			display.style.fontSize = '45px';
			Calculator.prototype.operations.disabled = false;
			activateButtons();
		}

		display.innerHTML = '0';
		this.currentValue = undefined;
		this.resultPressed = false;
		this.operationPressed = false;
		this.needNewValue = false;
		this.typeOperation = '';
		this.ValueForProgressive = undefined;
		this.needValueForProgressive = false,
		this.enteredNewValue = false;
		this.singleFunction = false;
		smallDisplay.innerHTML = '';
	}

	Calculator.prototype.result = function() {
		if (this.operations.disabled) {
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

		if ((this.operationPressed || this.resultPressed) && this.currentValue !== undefined) {
			this.operations[this.typeOperation]();
		}

	}

	Calculator.prototype.operation = function(operation) {
		if (this.operations.disabled) {
			return;
		}

		this.stroke = ' '+display.innerHTML + ' ' + operation;

		if (this.enteredNewValue) {
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
			this.currentValue = parseFloat(display.innerHTML);
			this.typeOperation = operation;		
			this.operations[this.typeOperation]();
			this.singleFunction = false;
			this.needNewValue = true;
			this.enteredNewValue = false;
			this.currentValue = 0;
			return;
		}

		this.needValueForProgressive = true;

		if (this.operationPressed) {
			if (this.enteredNewValue) {
				this.operations[this.typeOperation]();
				this.enteredNewValue = false;
			}
			this.typeOperation = operation;
		} else {
			this.currentValue = parseFloat(display.innerHTML);

			this.typeOperation = operation;				
			this.operationPressed = true;
				this.enteredNewValue = false; // 
			}

			this.needNewValue = true;
		}

		Calculator.prototype.addPoint = function(text) {
			if (this.operations.disabled) {
				return;
			}

			if (text.indexOf('.') === -1 && this.needNewValue ||
				text.indexOf('.') === -1 && this.resultPressed ||
				text.indexOf('.') !== -1 && this.needNewValue ||				
				text.indexOf('.') !== -1 && this.resultPressed
				) {
				display.innerHTML = '0.';
			this.needNewValue = false;
			return;
		} 

		if (text.indexOf('.') === -1) {
			display.innerHTML += '.';
		}
	}

	Calculator.prototype.negate = function(data) {
		if (this.operations.disabled) {
			return;
		}

		display.innerHTML = +data * -1;
	}

	Calculator.prototype.percent = function() {
		if (this.operations.disabled) {
			return;
		}

		if (!this.currentValue) {
			display.innerHTML = 0;
			return;
		}

		var temp = parseFloat(display.innerHTML)/100*this.currentValue;
		display.innerHTML = trimmer(temp);
	}

	Calculator.prototype.numberPress = function(number) {
		if (this.operations.disabled) {
			this.operations.disabled = false;
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

		if ((display.innerHTML === '0' || (this.needNewValue) || (this.resultPressed) || display.innerHTML === 'Деление на 0 невозможно')) {
			display.innerHTML = number;
			this.needNewValue = false;
			this.resultPressed = false;
		} else {
			display.innerHTML += number;
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