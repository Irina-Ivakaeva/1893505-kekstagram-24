import { drawElement } from './draw-pictures.js';
import { addAttributesToForm, checkValidHash, checkValidComment, clearAllValues } from './edit-photo/edit-form.js';
import { workWithScale, postScaleValue, actualEffect } from './edit-photo/photo-edit-logic.js';
import { ESC } from './constants.js';
import { openModal, closeModal, isOpenModal } from './modal/modal.js';
import { openFullPhoto, isOpenFullPhoto, closeFullPhoto } from './full-photo/full-photo.js';
import { getData, sendData } from './remote-work.js';
import { setActiveFilter, getRandomPhotos, getSortPhotosByComments, setActiveFilterButton } from './imagefilter/image-filter.js';
import { debounce } from './util.js';

const photoContainer = document.querySelector('.pictures');
const inputHashtag = document.querySelector('input.text__hashtags');
const inputComment = document.querySelector('textarea.text__description');
const inputPhoto = document.querySelector('#upload-file');
const closeBtn = document.querySelector('#upload-cancel');
const submitBtn = document.querySelector('button#upload-submit');
const postForm = document.querySelector('#upload-select-image');
const editPhotoModalWindow = document.querySelector('.img-upload__overlay');

let photosFromServer = null;

const FILTERS = {
  'filter-default': () => photosFromServer,
  'filter-random': getRandomPhotos,
  'filter-discussed': getSortPhotosByComments,
};

function clearErrorBorder() {
  inputHashtag.classList.remove('error_field');
  inputComment.classList.remove('error_field');
}

if (inputPhoto) {
  inputPhoto.addEventListener('change', () => {
    openModal(editPhotoModalWindow);
    workWithScale();
    clearErrorBorder();
  });
}

function closeModalAndClearValues() {
  closeModal(editPhotoModalWindow);
  clearAllValues(inputPhoto, inputHashtag, inputComment);
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    closeModalAndClearValues();
  });
}

submitBtn.addEventListener('click', (evt) => {
  const isValidHashTag = checkValidHash(inputHashtag);
  const isValidComment = checkValidComment(inputComment);

  if (!isValidHashTag) {
    inputHashtag.classList.add('error_field');
    return;
  }
  if (!isValidComment) {
    inputComment.classList.add('error_field');
    return;
  }
  const formData = new FormData();
  formData.append('filename', inputPhoto.files[0]);
  formData.append('scale', postScaleValue);
  formData.append('effect', actualEffect);
  evt.preventDefault();

  sendData(formData)
    .then(() => {
      closeModalAndClearValues();
    });
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

getData().then((photos) => {
  photosFromServer = photos;
  drawElement(photos, photoContainer);
  setActiveFilter();
});

document.addEventListener('click', (evt) => {
  const element = evt.target;
  const isPhoto = element.closest('.picture');
  const isImageFilterButton = element.classList.contains('img-filters__button');
  if (isPhoto) {
    openFullPhoto(element, photosFromServer);
  }

  if (isImageFilterButton) {
    const whichFilter = element.getAttribute('id');
    const sortFunction =  FILTERS[whichFilter];
    const newPhotos = sortFunction(photosFromServer);
    const oldPhotos = document.querySelectorAll('.picture');
    oldPhotos.forEach((lastPhoto) => lastPhoto.remove());
    setActiveFilterButton(element);
    const debounceDrawElement =  debounce(() => drawElement(newPhotos, photoContainer), 500);
    debounceDrawElement();
  }
});

addAttributesToForm(postForm);
