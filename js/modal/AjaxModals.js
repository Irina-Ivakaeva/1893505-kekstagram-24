import {openModal, closeModal} from './modal.js';
import {ESC} from '../constants.js';
const modalOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
let elementRemoved;

function workWithModal(button) {
  elementRemoved = document.querySelector('section[data="removed"]');
  openModal(elementRemoved);
  button.addEventListener('click', () => {
    elementRemoved.remove();
    closeModal(elementRemoved);
  });

  document.addEventListener('keydown', (element) => {
    const keyCode = element.key;
    if (keyCode === ESC && elementRemoved) {
      elementRemoved.remove();
      closeModal(elementRemoved);
    }
  });
}

document.addEventListener('click', (el) => {
  const isErrorInfoWindow = el.target.classList.contains('error__inner');
  const isSuccessInfoWindow = el.target.classList.contains('success__inner');
  if(!(isErrorInfoWindow || isSuccessInfoWindow) && elementRemoved) {
    elementRemoved.remove();
    closeModal(elementRemoved);
  }
});

function createSendWindow(windowType) {
  const templateFragment = document.querySelector(windowType).content;
  const template = templateFragment.querySelector('section');
  const element = template.cloneNode(true);
  element.setAttribute('data', 'removed');
  const errorButton = element.querySelector('button');
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
