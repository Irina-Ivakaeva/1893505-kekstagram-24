import {getRandomInt} from './util.js';
import {NAMES, STRINGS, QUANTITY_PHOTOS} from './constants.js';

function getRandomMessage() {
  return STRINGS[getRandomInt(0, STRINGS.length - 1)];
}

function getRandomName() {
  return NAMES[getRandomInt(0, NAMES.length - 1)];
}

function returnRandomComment(numberComment) {
  return { commentId: numberComment + 100,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomMessage(),
    name: getRandomName()};
}

function generateComments() {
  const COMMENTS = [];
  const maxCommentsCount = getRandomInt(1, 10);
  for (let numberComment = 1; numberComment <= maxCommentsCount; numberComment++) {
    COMMENTS.push(returnRandomComment(numberComment));
  }
  return COMMENTS;
}

function returnRandomPhoto(index) {
  return {
    id: index,
    url: `photos/${getRandomInt(1, 25)}.jpg`,
    description: `Описание ${index}`,
    likes: getRandomInt(15, 200),
    comments: generateComments()};
}

function generateRandomUserData() {
  const photos = [];
  for (let photoIndex=1; photoIndex<=QUANTITY_PHOTOS; photoIndex++) {
    photos.push(returnRandomPhoto(photoIndex));
  }
  return photos;
}

export {generateRandomUserData};
