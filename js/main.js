import {generateRandomUserData} from './data.js';
import {drawElement} from './draw-pictures.js';
import {addAttributesToForm, checkValidHash, checkValidComment, clearAllValue} from './edit-photo/editForm.js';
import {workWithScale} from './edit-photo/photo-edit-logic.js';
import {ESC} from './constants.js';
import {openModal, closeModal, isOpenModal} from './modal/modal.js';
import {openFullPhoto, isOpenFullPhoto, closeFullPhoto} from './full-photo/fullphoto.js';
import { getData, sendData } from './remote-work.js';
import { showAlert } from './util.js';

const photoContainer = document.querySelector('.pictures');
const data1 = generateRandomUserData();
//const photo = getData().then((data) => data);
const inputHashtag = document.querySelector('input.text__hashtags');
const inputComment = document.querySelector('textarea.text__description');
const inputPhoto = document.querySelector('#upload-file');
const closeBtn = document.querySelector('#upload-cancel');
const submitBtn = document.querySelector('button#upload-submit');
const postForm = document.querySelector('.img-filters__form');

if (inputPhoto) {
  inputPhoto.addEventListener('change', () => {
    openModal();
    workWithScale();
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
  if (checkValidHash(inputHashtag) && checkValidComment(inputComment)) {
    const obj =  {
      ph: inputPhoto,
      hash: inputHashtag,
      comm: inputComment,
    };

    sendData(() => obj);
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

document.addEventListener('click', (evt) => {
  const element = evt.target;
  const isPhoto = element.closest('.picture');
  if (isPhoto) {
    getData((photo) => {
      openFullPhoto(element, photo.slice(0));
    });
  }
});

getData((photo) => {
  drawElement(photo, photoContainer);
});

addAttributesToForm(postForm);
