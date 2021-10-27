const minimalNumber = 48;
const maximalNumber = 57;
const minimalUpperChar = 65;
const maximalUpperChar = 90;
const minimalLowerChar = 97;
const maximalLowerChar = 122;

// хэш-тег начинается с символа # (решётка) / хэш-теги разделяются пробелами;
function firstSymbolIsHashTag(element) {
  return element === '#';
}

// Проверка, что введденые символы это буквы или числа
function checkAscii(arrayElements) {
  let check = false;
  arrayElements.forEach((element) => {
    const item = element.charCodeAt(0);
    if (item <= maximalNumber && item >= minimalNumber){
      check = true;
    } else if ((item >= minimalUpperChar && item <= maximalUpperChar) || (item >= minimalLowerChar && item <= maximalLowerChar)) {
      check = true;
    } else {
      return false;
    }
  });
  return check;
}

// хеш-тег не может состоять только из одной решётки;
function checkOneLength(array) {
  return array.length > 1;
}

// нельзя указать больше пяти хэш-тегов / максимальная длина одного хэш-тега 20 символов, включая решётку;
// максимальная длина комментария 140
function checkLengthElement(element, maxLength) {
  return element.length <= maxLength;
}

// один и тот же хэш-тег не может быть использован дважды;
function checkDoubleHashTag(array) {
  const trueArray = [];
  let count = 0;
  array.forEach((element) => {
    if (trueArray.indexOf(element.toUpperCase()) === -1) {
      trueArray.push(element.toUpperCase());
    } else {
      count++;
    }
  });
  return count === 0;
}

function checkEmptyValue(value) {
  return value.length === 1 && value[0] === '';
}

// Все проверки для поля Хэштэг
function checkAllHash(array) {
  let checkCount = 0;

  if (checkEmptyValue(array)) {
    return true;
  }

  array.forEach((element) => {
    const [firstElement, ...otherElement] = element;
    if (!firstSymbolIsHashTag(firstElement) || !checkAscii(otherElement) || !checkOneLength(element)
    || !checkLengthElement(element, 20)) {
      checkCount++;
    }
  });
  if (!checkDoubleHashTag(array) || !checkLengthElement(array, 5)) {
    checkCount++;
  }
  return checkCount === 0;
}

// Все проверки для поля Комментарий (пока только одна)
function allChecksComment(comment) {
  if (checkEmptyValue(comment)) {
    true;
  }
  return checkLengthElement(comment, 140);
}

export {checkAllHash, allChecksComment};
