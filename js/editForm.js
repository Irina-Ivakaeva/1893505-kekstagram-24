import {checkAllHash, allChecksComment} from './checks.js';

// Очистка значения у полей
function clearValue(input) {
  input.value = null;
}

// Запуск всех проверок для поля Хэштэг
function checkValidHash(inputBox) {
  const inputValueArray = inputBox.value.split(' ');
  if (checkAllHash(inputValueArray)) {
    return true;
  }
  inputBox.setCustomValidity('Вы ввели неверный хэштэг!');
  return false;
}

// Запуск проверок для поля Комментарий
function checkValidComment(inputComment) {
  const comment = inputComment.value;
  if (allChecksComment(comment)) {
    return true;
  }
  inputComment.setCustomValidity('Вы ввели неверный комментарий!');
  return false;
}

// Редактирование формы для отправки
function addAttributesToForm(postForm) {
  postForm.action = 'https://24.javascript.pages.academy/kekstagram';
  postForm.method = 'POST';
  postForm.enctype = 'multipart/form-data';
}

function clearAllValue(inputPhoto, inputHashtag, inputComment) {
  clearValue(inputPhoto);
  clearValue(inputHashtag);
  clearValue(inputComment);
}

export {addAttributesToForm,  checkValidHash, checkValidComment, clearAllValue};
