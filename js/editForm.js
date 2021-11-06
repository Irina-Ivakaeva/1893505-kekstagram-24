import {checkAllHash, allChecksComment} from './checks.js';

let postScaleValue;
const mainImage = document.querySelector('.img-upload__preview');
const scaleValue = document.querySelector('.scale__control--value');
const scaleValueSmaller = document.querySelector('.scale__control--smaller');
const scaleValueBigger = document.querySelector('.scale__control--bigger');

let actualEffect;
const effectOriginal = document.querySelector('.effects__preview--none');
const effectChrome = document.querySelector('.effects__preview--chrome');
const effectSepia = document.querySelector('.effects__preview--sepia');
const effectMarvin = document.querySelector('.effects__preview--marvin');
const effectPhobos = document.querySelector('.effects__preview--phobos');
const effectHeat = document.querySelector('.effects__preview--heat');

const sliderElement = document.querySelector('.effect-level__slider');

function changeImageEffect(effectType) {
  mainImage.classList.remove(actualEffect);
  actualEffect = effectType;
  mainImage.classList.add(actualEffect);
}

// Создание слайдера и обработчик передвижения слайдера
function createSlider(stepEffect, maxSize, effectType) {
  if (sliderElement.noUiSlider === undefined) {
    noUiSlider.create(sliderElement, {
      range: {
        min: 0,
        max: maxSize,
      },
      start: (maxSize / 2),
      step: stepEffect,
    });
  }
  sliderElement.noUiSlider.on('update', (...rest) => {
    const value = rest[2][0];
    switch (effectType) {
      case 'effects__preview--chrome':
        effectChrome.filter = (`grayscale(${value})`);
        break;
      case 'effects__preview--sepia':
        effectSepia.filter = (`sepia(${value})`);
        break;
      case 'effects__preview--marvin':
        effectMarvin.filter = (`invert(${value})`);
        break;
      case 'effects__preview--phobos':
        effectPhobos.filter = (`blur(${value}px)`);
        break;
      case 'effects__preview--heat':
        effectHeat.filter = (`brightness(${value})`);
        break;
    }
  });
}

// Скрытие слайдера
function hideUiSlider() {
  if (sliderElement.noUiSlider !== undefined) {
    sliderElement.noUiSlider.destroy();
  }
}

function workWithScale() {
  postScaleValue = 100;
  scaleValue.value = `${postScaleValue}%`;
  changeImageEffect('effects__preview--none');
  hideUiSlider();
}

effectOriginal.addEventListener('click', () => {
  hideUiSlider();
  changeImageEffect('effects__preview--none');
});

effectChrome.addEventListener('click', () => {
  hideUiSlider();
  changeImageEffect('effects__preview--chrome');
  createSlider(0.1, 1, 'effects__preview--chrome');
});

effectSepia.addEventListener('click', () => {
  hideUiSlider();
  changeImageEffect('effects__preview--sepia');
  createSlider(0.1, 1, 'effects__preview--sepia');
});

effectMarvin.addEventListener('click', () => {
  hideUiSlider();
  changeImageEffect('effects__preview--marvin');
  createSlider(1, 100, 'effects__preview--marvin');
});

effectPhobos.addEventListener('click', () => {
  hideUiSlider();
  changeImageEffect('effects__preview--phobos');
  createSlider(0.1, 3, 'effects__preview--phobos');
});

effectHeat.addEventListener('click', () => {
  hideUiSlider();
  changeImageEffect('effects__preview--heat');
  createSlider(0.1, 1, 'effects__preview--heat');
});

// Уменьшение размера фото
scaleValueSmaller.addEventListener('click', () => {
  if (postScaleValue > 25) {
    postScaleValue -= 25;
    mainImage.style.transform = (`scale(${postScaleValue / 100})`);
  }
  scaleValue.value = `${postScaleValue}%`;
});

// Увеличение размера фото
scaleValueBigger.addEventListener('click', () => {
  if (postScaleValue < 100) {
    postScaleValue += 25;
    mainImage.style.transform = (`scale(${postScaleValue / 100})`);
  }
  scaleValue.value = `${postScaleValue}%`;
});

// Очистка значения у полей
function clearValue(input) {
  input.value = null;
}

// Запуск всех проверок для поля Хэштэг
function checkValidHash(inputBox) {
  const inputValueArray = inputBox.value.split(' ');
  if (checkAllHash(inputValueArray)) {
    inputBox.setCustomValidity('');
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

export {addAttributesToForm,  checkValidHash, checkValidComment, clearAllValue, workWithScale};
