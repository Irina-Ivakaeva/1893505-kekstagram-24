import {openModal, closeModal} from './modal.js';
const modalOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
let elementRemoved;

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

export {showErrorSend, showSuccessSend};
