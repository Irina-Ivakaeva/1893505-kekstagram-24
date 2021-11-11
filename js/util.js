const getRandomInt = function(from, to) {
  from = Math.ceil(from);
  to = Math.floor(to);
  if (to <= from) {
    throw new Error ('Параметр \'to\' не может быть меньше или равен параметру \'from\'');
  } else if (from < 0 || to < 0) {
    throw new Error ('Введенные параметры должны быть больше или равны нулю');
  }
  return Math.floor(Math.random() * (to - from)) + from;
};
getRandomInt(15, 90);

const checkLength = function(checkedElement, maxLength) {
  return checkedElement.length === maxLength;
};
checkLength('abc', 3);

export {getRandomInt};
