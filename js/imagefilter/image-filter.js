import { getRandomInt } from '../util.js';

const imageFiltersWrapper = document.querySelector('.img-filters');
let lastActive = document.querySelector('.img-filters__button--active');

const activeClassName = 'img-filters__button--active';

function toggleActive(flag) {
  imageFiltersWrapper.classList.toggle('img-filters--inactive', flag);
}

function setActiveFilter() {
  toggleActive(false);
}

function setActiveFilterButton(filterButton) {
  if (lastActive) {
    lastActive.classList.remove(activeClassName);
  }
  filterButton.classList.add(activeClassName);
  lastActive = filterButton;
}

function getRandomPhotos(photos) {
  const photosCopy = photos.slice();
  const newPhotos = [];
  for (let index = 0; index < 10; index++) {
    const generatedRandomItem = getRandomInt(0, photosCopy.length);
    newPhotos.push(photosCopy[generatedRandomItem]);
    photosCopy.splice(generatedRandomItem, 1);
  }
  return newPhotos;
}

function getSortPhotosByComments(photos) {
  return photos.sort((photoA, photoB) => {
    const commentA = photoA.comments.length;
    const commentB = photoB.comments.length;
    return commentB - commentA;
  });
}

export {
  setActiveFilter,
  getRandomPhotos,
  getSortPhotosByComments,
  setActiveFilterButton
};
