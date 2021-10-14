import {getRandomInt} from './util.js';
import {NAMES, STRINGS, QUANTITY_PHOTOS} from './constants.js';

const getRandomMessage = function() {
  return STRINGS[getRandomInt(0, STRINGS.length - 1)];
};

const getRandomName = function() {
  return NAMES[getRandomInt(0, NAMES.length - 1)];
};

const returnRandomComment = function(numberComment) {
  return { id: numberComment + 100,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomMessage(),
    name: getRandomName()};
};

const generateComments = function() {
  const COMMENTS = [];
  const maxCommentsCount = getRandomInt(1, 10);
  for (let numberComment = 1; numberComment <= maxCommentsCount; numberComment++) {
    COMMENTS.push(returnRandomComment(numberComment));
  }
  return COMMENTS;
};

const returnRandomPhoto = function(index) {
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: `Описание ${index}`,
    likes: getRandomInt(15, 200),
    comments: generateComments()};
};

const generateRandomUserData = function() {
  const photos = [];
  for (let photoIndex=1; photoIndex<=QUANTITY_PHOTOS; photoIndex++) {
    photos.push(returnRandomPhoto(photoIndex));
  }
  return photos;
};

export {generateRandomUserData};
