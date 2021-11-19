import {checkLengthElement} from './util.js';

const HASHTAGS_SETTINGS = {
  REGEXP: /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/,
  MAX_LENGTH: 20,
  REQUIRE_FIRST_ELEMENT: '#',
};

// строка после решётки должна состоять из букв и чисел и не может
// содержать пробелы, спецсимволы (#, @, $ и т. п.),
// символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
function checkValues(hashTag) {
  return HASHTAGS_SETTINGS.REGEXP.test(hashTag);
}

// один и тот же хэш-тег не может быть использован дважды;
function checkDoubleHashTag(array) {
  const hashTags = [];
  let count = 0;
  array.forEach((element) => {
    if (hashTags.indexOf(element.toUpperCase()) === -1) {
      hashTags.push(element.toUpperCase());
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
function checkAllHash(arrayHashTags) {
  let checkCount = 0;
  if (checkEmptyValue(arrayHashTags)) {
    return true;
  }

  arrayHashTags
    .forEach((hashTag) => {
      const [firstElement] = hashTag;
      if (firstElement !== HASHTAGS_SETTINGS.REQUIRE_FIRST_ELEMENT || hashTag.length === 1 ) {
        checkCount++;
      }

      if (!checkValues(hashTag) || !checkLengthElement(hashTag, 20)) {
        checkCount++;
      }
    });

  if (!checkDoubleHashTag(arrayHashTags) || !checkLengthElement(arrayHashTags, 5)) {
    checkCount++;
  }
  return checkCount === 0;
}

// Все проверки для поля Комментарий
function allChecksComment(comment) {
  if (checkEmptyValue(comment)) {
    return true;
  }
  return checkLengthElement(comment, 140);
}

export { checkAllHash, allChecksComment };
