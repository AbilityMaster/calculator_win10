"use strict"

window.onload = function() {
	
	var numbers = document.querySelectorAll('.calc__button_number');
	var display = document.querySelector('.display');
	var operations = document.querySelectorAll('.calc__button_operation');

	numbers.forEach(function(element){
		element.addEventListener('click', function() {
			numberPress(this.innerHTML);
		});
	})

	document.querySelector('.calc__button_clear').onclick = function () {
		document.querySelector('.display').innerHTML = '';
		delete calc.result;
		delete calc.b;
		delete calc.textTable;
		delete calc.operation;
		delete calc.endOfOperations;
		delete calc.isnewValueInDisplay;
	}

	
	function numberPress(number) {
		if (display.innerHTML === '0') 
			display.innerHTML = number;
		else
			display.innerHTML += number;
	};



	function Calculator() {
		var self = this;
		var operations = {
			'+': function() {
				document.querySelector('.display').innerHTML = self.result + self.b;
			},
			'-': function() {
				document.querySelector('.display').innerHTML = self.result - self.b;
			},
			'*': function() {
				document.querySelector('.display').innerHTML = self.result * self.b;
			},
			'÷': function() {
				if (self.b == 0) {
					document.querySelector('.display').innerHTML = 'Деление на 0 невозможно';
					document.querySelector('.display').style.fontSize = '22px';
				}
				else
				document.querySelector('.display').innerHTML = (self.result / self.b).toFixed(10);
			},
			'pow': function() {
				document.querySelector('.display').innerHTML = Math.pow()
			}
		}

		this.addPoint = function(textTable) {
			if (textTable.indexOf('.') == -1) {
				this.textTable = textTable + '.';
			}
		}

		this.pressOperation = function(operation) {
			if (this.activateOperation) {
					if (!calc.isnewValueInDisplay) {
						this.b = +document.querySelector('.display').innerHTML;
						if (this.b != 0 && this.operation != '%')
						operations[this.operation]();
						document.querySelector('.small-display').innerHTML += this.result + ' ' +this.operation;
						this.activateOperation = false;
				}
					this.operation = operation;
			} else {
				this.result = +document.querySelector('.display').innerHTML;
				this.operation = operation;
				this.activateOperation = true;
				this.isnewValueInDisplay = true;
				document.querySelector('.small-display').innerHTML += this.result + '  ' +this.operation;
				delete this.b;
			}
		};

		this.negate = function(data) {
			this.textTable = +data * -1;
		}

		this.getResult = function() {
			document.querySelector('.small-display').innerHTML = '';
			if (!this.b) {
				this.b = +document.querySelector('.display').innerHTML;
				if (this.b != 0 && this.operation != '%')
				operations[this.operation]();					
				this.activateOperation = false;
				this.endOfOperations = true;				
			} else {
				this.result = +document.querySelector('.display').innerHTML;
				operations[this.operation]();
				this.activateOperation = false;
				this.endOfOperations = true;
			}
		}
	}

	var calc = new Calculator();


	var es = document.querySelectorAll('.calc__button_operation');
	es.forEach(function(element){
		element.addEventListener('click', function() {
			calc.pressOperation(this.innerHTML);
		});
	});

	document.querySelector('.calc__button_get-result').onclick = function () {
		calc.getResult();
	}

	document.querySelector('.calc__button_add-point').onclick = function () {
		calc.addPoint(document.querySelector('.display').innerHTML);
		document.querySelector('.display').innerHTML = calc.textTable;
	}

	document.querySelector('.calc__button_reverse').onclick = function () {
		calc.negate(document.querySelector('.display').innerHTML);
		document.querySelector('.display').innerHTML = calc.textTable;
	}

}