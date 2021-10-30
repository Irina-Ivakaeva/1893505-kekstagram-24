import {generateRandomUserData} from './data.js';
import {drawElement} from './draw-pictures.js';
import { addAttributesToForm, checkValidHash, checkValidComment, clearAllValue } from './editForm.js';
import {ESC} from './constants.js';
import {openModal, closeModal} from './modal/modal.js';

const photoContainer = document.querySelector('.pictures');
const photo = generateRandomUserData();
const inputHashtag = document.querySelector('input.text__hashtags');
const inputComment = document.querySelector('textarea.text__description');
const inputPhoto = document.querySelector('#upload-file');
const closeBtn = document.querySelector('#upload-cancel');
const submitBtn = document.querySelector('button#upload-submit');
const postForm = document.querySelector('.img-filters__form');
if (inputPhoto) {
  inputPhoto.addEventListener('change', () => {
    openModal();
  });
}

function closeModalAndClearValues() {
  closeModal();
  clearAllValue(inputPhoto, inputHashtag, inputComment);
}

if(closeBtn) {
  closeBtn.addEventListener('click', () => {
    closeModalAndClearValues();
  });
}

submitBtn.addEventListener('click', () => {
  checkValidHash(inputHashtag);
  checkValidComment(inputComment);
});

document.addEventListener('keydown', (element) => {
  const keyCode = element.key;
  const isActiveHashtag = inputHashtag === document.activeElement;
  const isActiveComment = inputComment === document.activeElement;
  if (keyCode === ESC && !isActiveHashtag && !isActiveComment) {
    return closeModalAndClearValues();
  }
});

drawElement(photo, photoContainer);
addAttributesToForm(postForm);
