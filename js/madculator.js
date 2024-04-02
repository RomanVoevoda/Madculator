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
  display: "<div class='display-container'><div class='display'><p class='display-text'></p></div></div>",
  buttons: {
    [Symbol.toPrimitive](hint) {
      if((hint == 'string') || (hint == 'default')) {
        return (this['plus-button'] + this['minus-button'] + this['multiplication-button'] + this['degree-button'] + this['percentagee-button'] + 
        this['clear-button'] + this['equal-button'] + this['comma-button'] + this['delete-button'] +
        this['zero-button'] + this['one-button'] + this['two-button'] + this['three-button'] +
        this['four-button'] + this['five-button'] + this['six-button'] + this['seven-button'] + this['eight-button'] + this['nine-button']);
      }
    },

    //Порядок прописан прямо здесь, так как нет смысла выделять его в отдельные классы
    'plus-button': "<div class='madculator-black-button' style='order:16'><p>+</p></div>",
    'minus-button': "<div class='madculator-black-button' style='order:12'><p>-</p></div>",
    'multiplication-button': "<div class='madculator-black-button' style='order:8'><p>x</p></div>",
    'degree-button': "<div class='madculator-black-button' style='order:4'><p>÷</p></div>",
    'percentagee-button': "<div class='madculator-black-button' style='order:3'><p>%</p></div>",

    'delete-button': "<div class='madculator-orange-button icon-button' style='order:2'><i class='fa-solid fa-delete-left'></i></div>",
    'clear-button': "<div class='madculator-orange-button' style='order:1'><p>С</p></div>",
    'equal-button': "<div class='madculator-orange-button' style='order:19'><p>=</p></div>",
    
    'comma-button': "<div class='madculator-normal-button' style='order:18'><p>.</p></div>",
    'zero-button': "<div class='madculator-normal-button' style='order:17'><p>0</p></div>",
    'one-button': "<div class='madculator-normal-button' style='order:13'><p>1</p></div>",
    'two-button': "<div class='madculator-normal-button' style='order:14'><p>2</p></div>",
    'three-button': "<div class='madculator-normal-button'style='order:15'><p>3</p></div>",
    'four-button': "<div class='madculator-normal-button' style='order:9'><p>4</p></div>",
    'five-button': "<div class='madculator-normal-button' style='order:10'><p>5</p></div>",
    'six-button': "<div class='madculator-normal-button' style='order:11'><p>6</p></div>",
    'seven-button': "<div class='madculator-normal-button' style='order:5'><p>7</p></div>",
    'eight-button': "<div class='madculator-normal-button'style='order:6'><p>8</p></div>",
    'nine-button': "<div class='madculator-normal-button'style='order:7'><p>9</p></div>",
  }
}

madculator.setButtons(); //Обязательно вызываем методы, чтобы калькулятор появился