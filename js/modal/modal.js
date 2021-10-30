
const modalOverlay = document.querySelector('.img-upload__overlay');
const bodyNode = document.querySelector('body');

function toggleModal(flag) {
  modalOverlay.classList.toggle('hidden', !flag);
  bodyNode.classList.toggle('modal-open', flag);
}

function openModal() {
  toggleModal(true);
}

function closeModal() {
  toggleModal(false);
}

export {openModal, closeModal};
