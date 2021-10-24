import {checkAllHash, allChecksComment} from './checks.js';

// Очистка значения у полей
function clearValue(input) {
  input.value = null;
}

function getFile() {
  const modalWindow = document.querySelector('.img-upload__overlay');
  modalWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  modalWindow.focus();
}

// Закрытие модального окна и очистка полей и выбранного файла
function closeEditImgWindow(inputPole) {
  const modalWindow = document.querySelector('.img-upload__overlay');
  modalWindow.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  modalWindow.blur();
  clearValue(inputPole);
  clearValue(document.querySelector('input.text__hashtags'));
  clearValue(document.querySelector('textarea.text__description'));
}

// Запуск всех проверок для поля Хэштэг
function checkValidHash(inputBox) {
  const inputValue = inputBox.value.split(' ');
  if (!checkAllHash(inputValue)) {
    inputBox.setCustomValidity('Вы ввели неверный хэштэг!');
  }
}

// Запуск проверок для поля Комментарий
function checkValidComment(inputComment) {
  const comment = inputComment.value;
  if (!allChecksComment(comment)) {
    inputComment.setCustomValidity('Вы ввели неверный комментарий!');
  }
}

// Редактирование формы для отправки
function editPostForm() {
  const postForm = document.querySelector('.img-filters__form');
  postForm.action = 'https://24.javascript.pages.academy/kekstagram';
  postForm.method = 'POST';
  postForm.enctype = 'multipart/form-data';
}

export {editPostForm, getFile, closeEditImgWindow, checkValidHash, checkValidComment};
