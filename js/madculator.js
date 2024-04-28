'use strict'

const body = document.querySelector('body');

const madculator = {
  setBody() {
    this.body = "<div class='madculator'>" + this.header + this.display + this['buttons-panel'] + "</div>";
    body.innerHTML = madculator.body;
    return this;
  },
  setButtons() {
    this['buttons-panel'] = "<div class='buttons-container ubuntu-mono-regular'>" + this.buttons + "</div>";
    this.setBody();
    return this;
  },
  refreshMadculator() {
    display.innerHTML = madculator['display-text-open-tag'] + madculator['display-text-value'] + madculator['display-text-closing-tag'];
  },

  fixingFractionLength(result) {
    return (result.includes('.')) ? result.slice(0, result.indexOf('.') + 5) :  result;
  },
  zerosAbbrevation(result) {
    if(result.endsWith('00000')) {
      let numberOfZeros = 5;

      for(let i = result.length - 5; (result.at(i - 1) === '0') && (i >= 0); i--) {
        numberOfZeros++;
      }
      
      return result = result.slice(0, result.length - numberOfZeros) + `e${numberOfZeros}`;
    } else {
      return result;
    }
  },

  calculate(str) {
    let arrayForCalculation = str.split('<span></span>'); 
    madculator.arrayCleaning(arrayForCalculation); //отчистка от пустых спанов и дыр в массиве только для лучшей обработки ошибок
    
    let highPriorityOperators = madculator.findOperators(arrayForCalculation, '*', '/', '%');
    let lessPriorityOperators = madculator.findOperators(arrayForCalculation, '+', '-');

    while(highPriorityOperators != undefined) {
      madculator.partialCalculation(arrayForCalculation, highPriorityOperators);

      if(isNaN(arrayForCalculation[0])) {
        return arrayForCalculation[0] = 'Ошибка!';
      }

      highPriorityOperators = madculator.findOperators(arrayForCalculation, '*', '/', '%'); 
    }

    while(lessPriorityOperators != undefined) {
      madculator.partialCalculation(arrayForCalculation, lessPriorityOperators);

      if(isNaN(arrayForCalculation[0])) {
        return arrayForCalculation[0] = 'Ошибка!';
      }


      lessPriorityOperators = madculator.findOperators(arrayForCalculation, '+', '-');
    }

    return str = arrayForCalculation[0];
  },
  findOperators(arr, operator1, operator2, operator3){
    let operatorsIndex = [];
    let operatorsValue = [];

    if(arr.includes(operator1) || arr.includes(operator2) || arr.includes(operator3)) {
      for(let item of arr) {
        if(item === operator1 || item === operator2 || item === operator3) {
          operatorsIndex.push( arr.indexOf(item) );
          operatorsValue.push(item);
        }  
      }
    } else {
      return undefined;
    }

    return [operatorsIndex, operatorsValue];
  },
  partialCalculation(calculationArray, arrayOfOperators) {

    if (isNaN(calculationArray[arrayOfOperators[0][0] - 1]) || isNaN(calculationArray[arrayOfOperators[0][0] + 1])) {
      return calculationArray[0] = NaN;
    }

    let a = Number(calculationArray[arrayOfOperators[0][0] - 1]);
    let op = arrayOfOperators[1][0];
    let b = Number(calculationArray[arrayOfOperators[0][0] + 1]);

    calculationArray[arrayOfOperators[0][0] - 1] = madculator.methods[op](a, b);

    calculationArray.splice(arrayOfOperators[0][0], 2);
  },
  methods: {
    '-': (a, b) => a - b, 
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '%': (a, b) => a % b,
  },
  arrayCleaning(arrayForCleaning) {
    while(arrayForCleaning.includes('')){
      arrayForCleaning.splice(arrayForCleaning.indexOf(''), 1);
    }

    arrayForCleaning.flat();
  },


  roll(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  },
  createFakeButton(className) {
    const buttonsContainer = document.querySelector('.buttons-container');
    const fakeButton = document.createElement('div');
    fakeButton.setAttribute('class', className);

    let randomOrder = this.roll(0, 20).toString();
    fakeButton.setAttribute('style', 'order:' + randomOrder);

    let randomButtonsArrayIndex = this.roll(0, inputButtonsValue.length - 1);
    fakeButton.innerHTML = inputButtonsValue[randomButtonsArrayIndex].innerHTML;

    fakeButton.addEventListener('click', () => {
        fakeButton.classList.add('destroy-fake-button');
    });

    buttonsContainer.appendChild(fakeButton);
  },
  setRandomOrder() {
    const buttonsArray = document.querySelectorAll('.buttons-container div');

    for(let i = 0; i < buttonsArray.length; i++){
      let randomOrder = this.roll(0, buttonsArray.length - 1).toString();
      buttonsArray[i].setAttribute('style', 'order:' + randomOrder);
    }
  },
  rotateMadculator() {
    const madculatorContainer = document.querySelector('.madculator');

    madculatorContainer.setAttribute('style', `transform: rotate(${madculator.roll(0, 361)}deg);`)
  },

  header: "<div class='header ubuntu-mono-regular'><p>CASIO</p></div>",

  display: "<div class='display-container kode-mono-display-font'><div class='display starting-value'><p id='display-text'></p></div></div>",
  'display-text-open-tag': "<p id='display-text'>",
  'display-text-closing-tag': "</p>",
  'display-text-value': "0",

  buttons: {
    [Symbol.toPrimitive](hint) {
      if((hint == 'string') || (hint == 'default')) {
        return (this['plus-button'] + this['minus-button'] + this['multiplication-button'] + this['degree-button'] + this['percentagee-button'] + 
        this['clear-button'] + this['equal-button'] + this['comma-button'] + this['delete-button'] +
        this['zero-button'] + this['one-button'] + this['two-button'] + this['three-button'] +
        this['four-button'] + this['five-button'] + this['six-button'] + this['seven-button'] + 
        this['eight-button'] + this['nine-button'] + this['turn-on-button']);
      }
    },

    //Порядок прописан прямо здесь, так как нет смысла выделять его в отдельные классы
    'plus-button': "<div class='madculator-black-button input-button methods-button' style='order:16'><p>+</p></div>",
    'minus-button': "<div class='madculator-black-button input-button methods-button' style='order:12'><p>-</p></div>",
    'multiplication-button': "<div class='madculator-black-button input-button methods-button' style='order:8'><p>*</p></div>",
    'degree-button': "<div class='madculator-black-button input-button methods-button' style='order:4'><p>/</p></div>",
    'percentagee-button': "<div class='madculator-black-button input-button methods-button' style='order:3'><p>%</p></div>",

    'delete-button': "<div class='madculator-orange-button icon-button' id='delete-button' style='order:2'><i class='fa-solid fa-delete-left'></i></div>",
    'clear-button': "<div class='madculator-orange-button' id='clear-button' style='order:1'><p>С</p></div>",
    'equal-button': "<div class='madculator-orange-button' id='equal-button' style='order:19'><p>=</p></div>",
    'turn-on-button': "<div class='madculator-orange-button icon-button turn-on' style='order:20'><p>ON</p></div>",
    
    'comma-button': "<div class='madculator-normal-button input-button' style='order:18'><p>.</p></div>",
    'zero-button': "<div class='madculator-normal-button input-button' style='order:17'><p>0</p></div>",
    'one-button': "<div class='madculator-normal-button input-button' style='order:13'><p>1</p></div>",
    'two-button': "<div class='madculator-normal-button input-button' style='order:14'><p>2</p></div>",
    'three-button': "<div class='madculator-normal-button input-button'style='order:15'><p>3</p></div>",
    'four-button': "<div class='madculator-normal-button input-button' style='order:9'><p>4</p></div>",
    'five-button': "<div class='madculator-normal-button input-button' style='order:10'><p>5</p></div>",
    'six-button': "<div class='madculator-normal-button input-button' style='order:11'><p>6</p></div>",
    'seven-button': "<div class='madculator-normal-button input-button' style='order:5'><p>7</p></div>",
    'eight-button': "<div class='madculator-normal-button input-button'style='order:6'><p>8</p></div>",
    'nine-button': "<div class='madculator-normal-button input-button'style='order:7'><p>9</p></div>",
  }
}

madculator.setButtons(); //Обязательно вызываем методы, чтобы калькулятор появился

/*
 ВКЛЮЧЕНИЕ/ВЫКЛЮЧЕНИЕ ДИСПЛЕЯ
*/

const turnOnButton = document.querySelector('.turn-on');
const display = document.querySelector('.display');

turnOnButton.addEventListener('click',
  function() {
    if(display.classList.contains('on')) {
      display.innerHTML = '';
      display.classList.remove('on');
      madculator['display-text-value'] = "0";
    } else {
      madculator.refreshMadculator();

      display.classList.add('on');
      display.classList.add('starting-value');
    }
  }
)

/*
  КНОПКИ ВВОДА ЗНАЧЕНИЯ
*/

const displayText = document.querySelector('#display-text');
const madculatorButtons = document.getElementsByClassName('input-button');
const madculatorButtonsText = document.querySelectorAll('.input-button p');
let inputButtons = Array.from(madculatorButtons);
let inputButtonsValue = Array.from(madculatorButtonsText);

for(let i = 0; i < inputButtons.length; i++) {
  inputButtons[i].addEventListener('click', () => {
      if(!(display.classList.contains('on'))) {
        return;
      } else if(display.classList.contains('starting-value')) {       
        madculator['display-text-value'] = inputButtonsValue[i].innerText;

        madculator.refreshMadculator(); 
        display.classList.remove('starting-value');
      } else {
        inputButtons[i].classList.contains('methods-button') ? (madculator['display-text-value'] = madculator['display-text-value'] + '<span></span>' + inputButtonsValue[i].innerText + '<span></span>') : 
        (madculator['display-text-value'] = madculator['display-text-value'] + inputButtonsValue[i].innerText);

        madculator.refreshMadculator();
      }     
    });
}

/*
  КНОПКИ УПРАВЛЕНИЯ
*/

const equalButton = document.querySelector('#equal-button');

equalButton.addEventListener('click',
  function() {
    if(display.classList.contains('on')) {
      let result = (madculator.calculate(madculator['display-text-value'])).toString();
      let fixedFractionResult = madculator.fixingFractionLength(result);

      madculator['display-text-value'] = madculator.zerosAbbrevation(fixedFractionResult);

      madculator.refreshMadculator();
    }  
  }
);

const clearButton = document.querySelector('#clear-button');

clearButton.addEventListener('click',
  function() {
    if(display.classList.contains('on')) {
      madculator['display-text-value'] = '0';
      display.classList.add('starting-value');

      madculator.refreshMadculator();
    } else {
      return;
    }
  }
);

const deleteButton = document.querySelector('#delete-button');

deleteButton.addEventListener('click',
  function() {
    if(display.classList.contains('on')) {

      if(madculator['display-text-value'].length > 1) {
        madculator['display-text-value'] = madculator['display-text-value'].slice(0, -1);
      } else {
        madculator['display-text-value'] = '0';
        display.classList.add('starting-value');
      }

      madculator.refreshMadculator();
    } else {
      return;
    }
  }
);

/*
  СОБЫТИЯ НА КНОПКАХ ДЛЯ ИЗМЕНЕНИЯ MADCULATORA
*/

const orangeButtons = document.getElementsByClassName('madculator-orange-button');
const blackButtons = document.getElementsByClassName('madculator-black-button');
const normalButtons = document.getElementsByClassName('madculator-normal-button');

for(let button of orangeButtons) {
  button.addEventListener('click', 
  () => {
    if(display.classList.contains('on')) {
      madculator.createFakeButton('fake-orange-button');
      madculator.createFakeButton('fake-orange-button');
      madculator.setRandomOrder();
      madculator.rotateMadculator();
    }
  });
}

for(let button of blackButtons) {
  button.addEventListener('click', 
  () => {
    if(display.classList.contains('on')) {
      madculator.createFakeButton('fake-black-button');
      madculator.createFakeButton('fake-black-button');
      madculator.setRandomOrder();
      madculator.rotateMadculator();
    }
  });
}

for(let button of normalButtons) {
  button.addEventListener('click', 
  () => {
    if(display.classList.contains('on')) {
      madculator.createFakeButton('fake-normal-button');
      madculator.createFakeButton('fake-normal-button');
      madculator.setRandomOrder();
      madculator.rotateMadculator();
    } 
  });
}