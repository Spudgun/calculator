let num1 = null;
let operator = null;
let num2 = null;
let decimal = false;

let buttons = document.querySelectorAll('.button');
const screen = document.getElementById('screen-text');

const keyEvents = {
	Backspace: { type: 'clear', value: 'ac' },
	Delete: { type: 'clear', value: 'c' },
	0: { type: 'num', value: '0' },
	1: { type: 'num', value: '1' },
	2: { type: 'num', value: '2' },
	3: { type: 'num', value: '3' },
	4: { type: 'num', value: '4' },
	5: { type: 'num', value: '5' },
	6: { type: 'num', value: '6' },
	7: { type: 'num', value: '7' },
	8: { type: 'num', value: '8' },
	9: { type: 'num', value: '9' },
	'.': { type: 'num', value: '.' },
	'+': { type: 'operator', value: '+' },
	'-': { type: 'operator', value: '-' },
	'*': { type: 'operator', value: '*' },
	'/': { type: 'operator', value: '/' },
	'%': { type: 'operator', value: '%' },
	'=': { type: 'equal', value: null },
	Enter: { type: 'equal', value: null },
};

buttons.forEach((element) => {
	let buttonData = element.dataset;
	element.addEventListener('click', function () {
		handleAllInput(buttonData.type, buttonData.value);
	});
});

document.addEventListener('keydown', function (event) {
	let data = keyEvents[event.key];
	handleAllInput(data.type, data.value);
});

function handleAllInput(eventType, eventValue) {
	if (eventType == 'clear') {
		handleClearInput(eventValue);
	} else if (eventType == 'num') {
		handleNumberInput(eventValue);
	} else if (eventType == 'operator') {
		handleOperatorInput(eventValue);
	} else if (eventType == 'equal') {
		handleEqualInput();
	}
	test();
}

function handleClearInput(value) {
	if (value == 'ac') {
		resetCalculator('0');
	} else {
		if (num2 != null) {
			num2 = null;
			decimal = false;
			setScreenText(operator);
		} else if (operator != null) {
			operator = null;
			setScreenText(num1);
		} else {
			resetCalculator('0');
		}
	}
}

function handleNumberInput(value) {
	if (value === '.') {
		if (decimal === true) {
			return;
		}
		decimal = true;
	}
	if (operator !== null) {
		num2 = num2 === null ? value : num2 + value;
		setScreenText(num2);
	} else {
		num1 = num1 === null ? value : num1 + value;
		setScreenText(num1);
	}
}

function handleOperatorInput(value) {
	if (num1 !== null) {
		if (num2 !== null) {
			handleEqualInput();
		}
		operator = value;
		decimal = false;
		setScreenText(value);
	}
}

function handleEqualInput() {
	if (num1 !== null && operator !== null && num2 !== null) {
		const n1 = Number(num1);
		const n2 = Number(num2);

		let result = operate(operator, n1, n2);
		if (result !== 'Error') {
			result = Number.isInteger(result) ? result : result.toFixed(2);
			setScreenText(result);
			num1 = result;
			operator = null;
			num2 = null;
		} else {
			resetCalculator(result);
		}
	}
}

function operate(operation, n1, n2) {
	if (operation === '+') return n1 + n2;
	if (operation === '-') return n1 - n2;
	if (operation === '*') return n1 * n2;
	if (operation === '/') return n2 === 0 ? 'Error' : n1 / n2;
	if (operation === '%') return n1 % n2;

	return null;
}

function resetCalculator(text) {
	num2 = null;
	num1 = null;
	operator = null;
	setScreenText(text);
}

function setScreenText(text) {
	if (text === 'Error') {
		screen.style.color = 'red';
		screen.style.opacity = 1;
	} else {
		screen.style.color = 'black';
		screen.style.opacity = text === '0' && num1 === null ? 0.5 : 1;
	}
	screen.innerHTML = text;
}

function test() {
	console.log(typeof num1, num1, typeof operator, operator, typeof num2, num2);
}
