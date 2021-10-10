import {NAMES, STRINGS} from './data.js';

function getRandomInt(from, to) {
  from = Math.ceil(from);
  to = Math.floor(to);
  if (to <= from) {
    throw new Error ('Параметр \'to\' не может быть меньше или равен параметру \'from\'');
  } else if (from < 0 || to < 0) {
    throw new Error ('Введенные параметры должны быть больше или равны нулю');
  }
  return Math.floor(Math.random() * (to - from)) + from;
}
getRandomInt(15, 90);

function checkLength(checkedElement, maxLength) {
  return checkedElement.length === maxLength;
}
checkLength('abc', 3);

const getRandomMessage = function() {
  return STRINGS[getRandomInt(0, STRINGS.length - 1)];
};

const getRandomName = function() {
  return NAMES[getRandomInt(0, NAMES.length - 1)];
};

export {getRandomInt, getRandomName, getRandomMessage};
