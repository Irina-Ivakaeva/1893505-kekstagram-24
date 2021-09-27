function getRandomInt(from, to) {
  if (to <= from) {
    throw new Error ('Параметр \'to\' не может быть меньше или равен параметру \'from\'');
  } else if (from < 0 || to < 0) {
    throw new Error ('Введенные параметры должны быть больше или равны нулю');
  }
  return Math.floor(Math.random() * (to - from)) + from;
}
getRandomInt(15, 90);

function checkLength(line, maxLength) {
  return line.length === maxLength;
}
checkLength('abc', 3);
