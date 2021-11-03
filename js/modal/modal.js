
const modalOverlay = document.querySelector('.img-upload__overlay');
const bodyNode = document.querySelector('body');
let isOpenModal = false;

function toggleModal(flag) {
  modalOverlay.classList.toggle('hidden', !flag);
  bodyNode.classList.toggle('modal-open', flag);
}

function openModal() {
  isOpenModal = true;
  toggleModal(true);
}

function closeModal() {
  isOpenModal = false;
  toggleModal(false);
}

export {openModal, closeModal, isOpenModal};
