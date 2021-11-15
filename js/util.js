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

// нельзя указать больше пяти хэш-тегов
// максимальная длина одного хэш-тега 20 символов, включая решётку;
// максимальная длина комментария 140
const checkLengthElement = function(checkedElement, maxLength) {
  return checkedElement.length <= maxLength;
};

export {getRandomInt, checkLengthElement};
