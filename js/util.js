import {closeModal} from './modal/modal.js';
const ALERT_SHOW_TIME = 5000;
const body = document.querySelector('body');

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
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function workWithModal(button) {
  body.classList.add('modal-open');
  const elementRemoved = document.querySelector('section[data="removed"]');

  button.addEventListener('click', () => {
    body.removeChild(elementRemoved);
    body.classList.remove('modal-open');
  });

  document.addEventListener('click', (el) => {
    if(!el.target.classList.contains('error__inner')) {
      body.removeChild(elementRemoved);
      body.classList.remove('modal-open');
    }
  });
}

function showErrorSend() {
  closeModal();
  const templateFragment = document.querySelector('#error').content;
  const template = templateFragment.querySelector('section');
  const element = template.cloneNode(true);
  element.setAttribute('data', 'removed');
  const errorButton = element.querySelector('.error__button');
  body.appendChild(element);

  workWithModal(errorButton);
}

function showSuccessSend() {
  closeModal();
  const templateFragment = document.querySelector('#success').content;
  const template = templateFragment.querySelector('section');
  const element = template.cloneNode(true);
  element.setAttribute('data', 'removed');
  const closeButton = element.querySelector('.error__button');
  body.appendChild(element);

  workWithModal(closeButton);
}

export {getRandomInt, showAlert, showErrorSend, showSuccessSend};
