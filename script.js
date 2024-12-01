let num1 = null;
let operator = null;
let num2 = null;

let buttons = document.querySelectorAll('.button');
const screen = document.getElementById('screen-text');

buttons.forEach((element) => {
	let buttonData = element.dataset;
	element.addEventListener('click', function () {
		if (buttonData.type == 'clear') {
			handleClearButton(buttonData.value);
		} else if (buttonData.type == 'num') {
			handleNumberInput(buttonData.value);
		} else if (buttonData.type == 'operator') {
		}
		test();
	});
});

function handleClearButton(value) {
	if (value == 'ac') {
		resetCalculator();
	} else {
		if (typeof num2 != 'undefined') {
			num2 = null;
			setScreenText(operator);
		} else if (typeof operator != 'undefined') {
			operator = null;
			setScreenText(num1);
		} else {
			num1 = null;
			setScreenText();
		}
	}
}

function handleNumberInput(value) {
	if (operator !== null) {
		num2 = num2 === null ? value : num2 + value;
		screen.innerHTML = num2;
	} else {
		num1 = num1 === null ? value : num1 + value;
		screen.innerHTML = num1;
	}
	screen.style.opacity = 1;
}

function operation(num) {}

function resetCalculator() {
	setScreenText();
}

function setScreenText(text) {
	if (typeof text == 'undefined') {
		text = '00000000';
		screen.style.opacity = 0.5;
	}
	screen.innerHTML = text;
}

function test() {
	console.log(typeof num1, num1, typeof operator, operator, typeof num2, num2);
}
