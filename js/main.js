
import {drawElement} from './draw-pictures.js';
import {addAttributesToForm, checkValidHash, checkValidComment, clearAllValue} from './edit-photo/editForm.js';
import {workWithScale, postScaleValue, actualEffect} from './edit-photo/photo-edit-logic.js';
import {ESC} from './constants.js';
import {openModal, closeModal, isOpenModal} from './modal/modal.js';
import {openFullPhoto, isOpenFullPhoto, closeFullPhoto} from './full-photo/fullphoto.js';
import { getData, sendData } from './remote-work.js';

const photoContainer = document.querySelector('.pictures');
const inputHashtag = document.querySelector('input.text__hashtags');
const inputComment = document.querySelector('textarea.text__description');
const inputPhoto = document.querySelector('#upload-file');
const closeBtn = document.querySelector('#upload-cancel');
const submitBtn = document.querySelector('button#upload-submit');
const postForm = document.querySelector('#upload-select-image');
const editPhotoModalWindow = document.querySelector('.img-upload__overlay');

if (inputPhoto) {
  inputPhoto.addEventListener('change', () => {
    openModal(editPhotoModalWindow);
    workWithScale();
  });
}

function closeModalAndClearValues() {
  closeModal(editPhotoModalWindow);
  clearAllValue(inputPhoto, inputHashtag, inputComment);
}

if(closeBtn) {
  closeBtn.addEventListener('click', () => {
    closeModalAndClearValues();
  });
}

submitBtn.addEventListener('click', (event) => {
  if (checkValidHash(inputHashtag) && checkValidComment(inputComment)) {
    const formData = new FormData();
    formData.append('filename', inputPhoto.files[0]);
    formData.append('scale', postScaleValue);
    formData.append('effect', actualEffect);
    event.preventDefault();
    sendData(formData);
    closeModalAndClearValues();
  }
});

document.addEventListener('keydown', (element) => {
  const keyCode = element.key;
  if (keyCode === ESC && isOpenFullPhoto) {
    return closeFullPhoto();
  }

  if (keyCode === ESC && isOpenModal) {
    const isActiveHashtag = inputHashtag === document.activeElement;
    const isActiveComment = inputComment === document.activeElement;
    if (keyCode === ESC && !isActiveHashtag && !isActiveComment) {
      return closeModalAndClearValues();
    }
  }
});

let photosFromServer = null;

getData().then((photos) => {
  photosFromServer = photos;
  drawElement(photos, photoContainer);
});

document.addEventListener('click', (evt) => {
  const element = evt.target;
  const isPhoto = element.closest('.picture');
  if (isPhoto) {
    openFullPhoto(element, photosFromServer);
  }
});

addAttributesToForm(postForm);
