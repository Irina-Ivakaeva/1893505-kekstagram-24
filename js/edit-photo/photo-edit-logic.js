const mainImage = document.querySelector('.img-upload__preview');
const scaleValue = document.querySelector('.scale__control--value');
const scaleValueSmaller = document.querySelector('.scale__control--smaller');
const scaleValueBigger = document.querySelector('.scale__control--bigger');
const effectOriginal = document.querySelector('.effects__preview--none');
const effectChrome = document.querySelector('.effects__preview--chrome');
const effectSepia = document.querySelector('.effects__preview--sepia');
const effectMarvin = document.querySelector('.effects__preview--marvin');
const effectPhobos = document.querySelector('.effects__preview--phobos');
const effectHeat = document.querySelector('.effects__preview--heat');

const sliderElement = document.querySelector('.effect-level__slider');

let postScaleValue;
let actualEffect;

function changeImageEffect(effectType) {
  mainImage.classList.remove(`effects__preview--${actualEffect}`);
  actualEffect = effectType;
  mainImage.classList.add(`effects__preview--${actualEffect}`);
}

// Создание слайдера и обработчик передвижения слайдера
function createSlider(stepEffect, maxSize) {
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
    switch (actualEffect) {
      case 'chrome':
        mainImage.style.filter = (`grayscale(${value})`);
        break;
      case 'sepia':
        mainImage.style.filter = (`sepia(${value})`);
        break;
      case 'marvin':
        mainImage.style.filter = (`invert(${value}%)`);
        break;
      case 'phobos':
        mainImage.style.filter = (`blur(${value}px)`);
        break;
      case 'heat':
        mainImage.style.filter = (`brightness(${value})`);
        break;
    }
  });
}

// Скрытие слайдера
function hideUiSlider() {
  if (sliderElement.noUiSlider !== undefined) {
    sliderElement.noUiSlider.destroy();
    mainImage.style.filter = null;
  }
}

function workWithScale() {
  postScaleValue = 100;
  scaleValue.value = `${postScaleValue}%`;
  mainImage.style.transform = (`scale(${postScaleValue / 100})`);
  changeImageEffect('none');
  hideUiSlider();
}

effectOriginal.addEventListener('click', () => {
  hideUiSlider();
  changeImageEffect('none');
});

effectChrome.addEventListener('click', () => {
  hideUiSlider();
  changeImageEffect('chrome');
  createSlider(0.1, 1);
});

effectSepia.addEventListener('click', () => {
  hideUiSlider();
  changeImageEffect('sepia');
  createSlider(0.1, 1);
});

effectMarvin.addEventListener('click', () => {
  hideUiSlider();
  changeImageEffect('marvin');
  createSlider(1, 100);
});

effectPhobos.addEventListener('click', () => {
  hideUiSlider();
  changeImageEffect('phobos');
  createSlider(0.1, 3);
});

effectHeat.addEventListener('click', () => {
  hideUiSlider();
  changeImageEffect('heat');
  createSlider(0.1, 1);
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

export {workWithScale, postScaleValue, actualEffect};
