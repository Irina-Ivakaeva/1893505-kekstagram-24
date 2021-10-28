import {generateRandomUserData} from './data.js';
import {drawElement} from './draw-pictures.js';
import { editPostForm, openModalWindow, closeEditImgWindow, checkValidHash, checkValidComment, clearValue } from './editForm.js';
import {ESC} from './constants.js';

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
const inputComment = document.querySelector('textarea.text__description');

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
  if (checkValidHash(inputHashtag) &&  checkValidComment(inputComment)) {
    true;
  }
});

document.addEventListener('keydown', (element) => {
  const keyCode = element.key;

  if (keyCode === ESC && inputHashtag !== document.activeElement && inputComment !== document.activeElement) {
    closeEditImgWindow(modalWindow);
    clearAllValue();
  }
});

drawElement(photo, photoContainer);
editPostForm();
