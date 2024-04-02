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
    'plus-button': "<div class='madculator-black-button input-button' style='order:16'><p>+</p></div>",
    'minus-button': "<div class='madculator-black-button input-button' style='order:12'><p>-</p></div>",
    'multiplication-button': "<div class='madculator-black-button input-button' style='order:8'><p>*</p></div>",
    'degree-button': "<div class='madculator-black-button input-button' style='order:4'><p>/</p></div>",
    'percentagee-button': "<div class='madculator-black-button input-button' style='order:3'><p>%</p></div>",

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

//Увы, ивенты сами себе объекты, их придётся по отдельности
const turnOnButton = document.querySelector('.turn-on');
const display = document.querySelector('.display');

turnOnButton.addEventListener('click',
  function() {
    if(display.classList.contains('on')) {
      display.innerHTML = '';
      display.classList.remove('on');
      madculator['display-text-value'] = "0";
    } else {
      display.innerHTML = madculator['display-text-open-tag'] + madculator['display-text-value'] + madculator['display-text-closing-tag'];
      display.classList.add('on');
      display.classList.add('starting-value');
    }
  }
)

const displayText = document.querySelector('#display-text');
const madculatorButtons = document.getElementsByClassName('input-button');
const madculatorButtonsText = document.querySelectorAll('.input-button p');
let inputButtons = Array.from(madculatorButtons);
let inputButtonsValue = Array.from(madculatorButtonsText);

for(let i = 0; i < inputButtons.length; i++) {
  inputButtons[i].addEventListener('click', 
    function() {
      if(!(display.classList.contains('on'))) {
        return;
      } else if(display.classList.contains('starting-value')) {       
        madculator['display-text-value'] = inputButtonsValue[i].innerText;
        display.innerHTML = madculator['display-text-open-tag'] + madculator['display-text-value'] + madculator['display-text-closing-tag']; //Без этого значения на дисплее не меняются
        display.classList.remove('starting-value');
      } else {
        madculator['display-text-value'] = madculator['display-text-value'] + inputButtonsValue[i].innerText;
        display.innerHTML = madculator['display-text-open-tag'] + madculator['display-text-value'] + madculator['display-text-closing-tag'];
      }     
    }
  );
}


const equalButton = document.querySelector('#equal-button');

equalButton.addEventListener('click',
  function() {
    if(display.classList.contains('on')) {
      //Используется бибилиотека Math js, чтобы снизить риски безопасности метода eval()
      madculator['display-text-value'] = math.evaluate(madculator['display-text-value']);
      display.innerHTML = madculator['display-text-open-tag'] + madculator['display-text-value'] + madculator['display-text-closing-tag'];
    }  
  }
);

const clearButton = document.querySelector('#clear-button');

clearButton.addEventListener('click',
  function() {
    if(display.classList.contains('on')) {
      madculator['display-text-value'] = '0';
      display.classList.add('starting-value');
      display.innerHTML = madculator['display-text-open-tag'] + madculator['display-text-value'] + madculator['display-text-closing-tag'];
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

      display.innerHTML = madculator['display-text-open-tag'] + madculator['display-text-value'] + madculator['display-text-closing-tag'];
    } else {
      return;
    }
  }
);