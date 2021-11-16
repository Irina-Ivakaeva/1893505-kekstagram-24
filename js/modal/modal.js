
const bodyNode = document.querySelector('body');
let isOpenModal = false;

function toggleModal(modalWindow, flag) {
  modalWindow.classList.toggle('hidden', !flag);
  bodyNode.classList.toggle('modal-open', flag);
}

function openModal(modalWindow) {
  isOpenModal = true;
  toggleModal(modalWindow, true);
}

function closeModal(modalWindow) {
  isOpenModal = false;
  toggleModal(modalWindow, false);
}

function getModalStatusOpen() {
  return isOpenModal;
}

export {openModal, closeModal, getModalStatusOpen};
