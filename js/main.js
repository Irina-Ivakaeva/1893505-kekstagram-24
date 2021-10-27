import {generateRandomUserData} from './data.js';
import {drawElement} from './draw-pictures.js';
import { editPostForm, openModalWindow, closeEditImgWindow, checkValidHash, checkValidComment, clearValue } from './editForm.js';

const ESC = 'Escape';
const photoContainer = document.querySelector('.pictures');
const photo = generateRandomUserData();

const inputPhoto = document.querySelector('#upload-file');
if (inputPhoto) {
  inputPhoto.addEventListener('change', () => {
    openModalWindow();
  });
}

const modalWindow = document.querySelector('.img-upload__overlay');
const inputHashtag = document.querySelector('input.text__hashtags');

if (inputHashtag) {
  inputHashtag.addEventListener('click', () => {
    document.activeElement.blur();
    inputHashtag.focus();
  });
}

const inputComment = document.querySelector('textarea.text__description');

if (inputComment) {
  inputComment.addEventListener('click', () => {
    document.activeElement.blur();
    inputComment.focus();
  });
}

function clearAllValue() {
  clearValue(inputPhoto);
  clearValue(inputHashtag);
  clearValue(inputComment);
}

const closeBtn = document.querySelector('#upload-cancel');
if(closeBtn) {
  closeBtn.addEventListener('click', () => {
    closeEditImgWindow(modalWindow);
    clearAllValue();
  });
}

const submitBtn = document.querySelector('button#upload-submit');
submitBtn.addEventListener('click', () => {
  checkValidHash(inputHashtag);
  checkValidComment(inputComment);
});

// Ошибка: Не работает inputComment !== document.activeElement
document.onkeydown = function(element) {
  const keyCode = element.key;

  if (keyCode === ESC && inputHashtag !== document.activeElement && inputComment !== document.activeElement) {
    closeEditImgWindow(modalWindow);
    clearAllValue();
  }
};

drawElement(photo, photoContainer);
editPostForm();
