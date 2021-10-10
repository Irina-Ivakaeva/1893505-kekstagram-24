import getRandomInt from './util.js';
import getRandomMessage from './util.js';
import getRandomName from './util.js';

const NAMES = [
  'Артем',
  'Борис',
  'Екатерина',
  'Алексей',
  'Инна',
  'Маргарита',
  'Денис',
  'Наталья',
  'Владимир',
  'Оксана'];
const STRINGS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const QUANTITY_PHOTOS = 25;

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
export {NAMES, STRINGS};
