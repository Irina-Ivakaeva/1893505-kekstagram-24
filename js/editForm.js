import {checkAllHash, allChecksComment} from './checks.js';

// Очистка значения у полей
function clearValue(input) {
  input.value = null;
}

function openModalWindow() {
  const modalWindow = document.querySelector('.img-upload__overlay');
  modalWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
}

// Закрытие модального окна и очистка полей и выбранного файла
function closeEditImgWindow(modalWindow) {
  modalWindow.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  modalWindow.blur();
}

// Запуск всех проверок для поля Хэштэг
function checkValidHash(inputBox) {
  const inputValueArray = inputBox.value.split(' ');
  if (!checkAllHash(inputValueArray)) {
    inputBox.setCustomValidity('Вы ввели неверный хэштэг!');
    return false;
  } else {
    inputBox.setCustomValidity('');
    return true;
  }
}

// Запуск проверок для поля Комментарий
function checkValidComment(inputComment) {
  const comment = inputComment.value;
  if (!allChecksComment(comment)) {
    inputComment.setCustomValidity('Вы ввели неверный комментарий!');
    return false;
  } else {
    inputComment.setCustomValidity('');
    return true;
  }
}

// Редактирование формы для отправки
function editPostForm() {
  const postForm = document.querySelector('.img-filters__form');
  postForm.action = 'https://24.javascript.pages.academy/kekstagram';
  postForm.method = 'POST';
  postForm.enctype = 'multipart/form-data';
}

export {editPostForm, openModalWindow, closeEditImgWindow, checkValidHash, checkValidComment, clearValue};
