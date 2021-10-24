import {generateRandomUserData} from './data.js';
import {drawElement} from './draw-pictures.js';
import { editPostForm, getFile, closeEditImgWindow, checkValidHash, checkValidComment } from './editForm.js';

const photoContainer = document.querySelector('.pictures');
const photo = generateRandomUserData();

const modalWindow = document.querySelector('#upload-file');
if (modalWindow) {
  modalWindow.addEventListener('change', function() {
    getFile(modalWindow.value);
  });
}

const closeBtn = document.querySelector('#upload-cancel');
if(closeBtn) {
  closeBtn.addEventListener('click', function() {
    closeEditImgWindow(el);
});
}

const inputHashtag = document.querySelector('input.text__hashtags');
if (inputHashtag) {
  inputHashtag.addEventListener('click', function() {
    document.activeElement.blur();
    inputHashtag.focus();
  });
}

const inputComment = document.querySelector('textarea.text__description');
if (inputComment) {
  inputComment.addEventListener('click', function() {
    document.activeElement.blur();
    inputComment.focus();
  });
}

const submitBtn = document.querySelector('button#upload-submit');
submitBtn.addEventListener('click', function() {
  checkValidHash(inputHashtag);
  checkValidComment(inputComment);
});

document.onkeydown = function(element) {
  const keyCode = element.keyCode;
  if (keyCode === 27 && inputHashtag !== document.activeElement) {
    closeEditImgWindow(el);
  } else if (keyCode === 27 && inputComment !== document.activeElement) {
    closeEditImgWindow(el);
  }
};

drawElement(photo, photoContainer);
editPostForm();
