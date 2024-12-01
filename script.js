let num1 = 0;
let operator = 0;
let num2 = 0;

let buttons = document.querySelectorAll('.button');
const screen = document.getElementById('screen-text');

buttons.forEach((element) => {
	let buttonData = element.dataset;
	console.log(buttonData);
	element.addEventListener('click', function () {
		if (buttonData.type == 'clear') {
			handleClearButton(buttonData.value);
		}
	});
});

function handleClearButton(value) {
	if (value == 'ac') {
		resetCalculator();
	} else {
		if (num2 != 0) {
			num2 = 0;
			setScreenText();
		} else if (operator != 0) {
			setScreenText(num1);
		} else {
			setScreenText();
		}
	}
}

function operation(num) {}

function resetCalculator() {
	num1 = 0;
	operator = '+';
	num2 = 0;
	setScreenText();
}

function setScreenText(text) {
	if (typeof text == 'undefined') {
		text = '00000000';
		screen.style.opacity = 0.5;
	}
	screen.innerHTML = text;
}
