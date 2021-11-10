import {openModal, closeModal} from './modal/modal.js';
const modalOverlay = document.querySelector('.img-upload__overlay');
const ALERT_SHOW_TIME = 5000;
const body = document.querySelector('body');
let elementRemoved;
const alertParams = {
  zIndex: 100,
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  padding: '10px 3px',
  fontSize: '30px',
  textAlign: 'center',
  backgroundColor: 'red',
};

const getRandomInt = function(from, to) {
  from = Math.ceil(from);
  to = Math.floor(to);
  if (to <= from) {
    throw new Error ('Параметр \'to\' не может быть меньше или равен параметру \'from\'');
  } else if (from < 0 || to < 0) {
    throw new Error ('Введенные параметры должны быть больше или равны нулю');
  }
  return Math.floor(Math.random() * (to - from)) + from;
};
getRandomInt(15, 90);

const checkLength = function(checkedElement, maxLength) {
  return checkedElement.length === maxLength;
};
checkLength('abc', 3);

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  for (const key in alertParams) {
    alertContainer.style[key] = alertParams[key];
  }
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function workWithModal(button) {
  elementRemoved = document.querySelector('section[data="removed"]');
  openModal(elementRemoved);
  button.addEventListener('click', () => {
    body.removeChild(elementRemoved);
    closeModal(elementRemoved);
  });
}

document.addEventListener('click', (el) => {
  const isSendInfoWindow = el.target.classList.contains('error__inner');
  if(!isSendInfoWindow && elementRemoved) {
    body.removeChild(elementRemoved);
    closeModal(elementRemoved);
  }
});

function createSendWindow(windowType) {
  const templateFragment = document.querySelector(windowType).content;
  const template = templateFragment.querySelector('section');
  const element = template.cloneNode(true);
  element.setAttribute('data', 'removed');
  const errorButton = element.querySelector('.error__button');
  body.appendChild(element);

  workWithModal(errorButton);
}

function showErrorSend() {
  closeModal(modalOverlay);
  createSendWindow('#error');
}

function showSuccessSend() {
  closeModal(modalOverlay);
  createSendWindow('#success');
}

export {getRandomInt, showAlert, showErrorSend, showSuccessSend};
