function getRandomInt(from, to) {
  from = Math.ceil(from);
  to = Math.floor(to);
  if (to <= from) {
    throw new Error ('Параметр \'to\' не может быть меньше или равен параметру \'from\'');
  } else if (from < 0 || to < 0) {
    throw new Error ('Введенные параметры должны быть больше или равны нулю');
  }
  return Math.floor(Math.random() * (to - from)) + from;
}
getRandomInt(15, 90);

function checkLength(checkedElement, maxLength) {
  return checkedElement.length === maxLength;
}
checkLength('abc', 3);

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
let generateRandomUserData = function() {
  let photos = [];
  for (let photoIndex=1; photoIndex<=QUANTITY_PHOTOS; photoIndex++) {
    photos.push(returnRandomPhoto(photoIndex));
  }
  return photos;
}

let returnRandomPhoto = function(index) {
  const obj = {
    id: index,
    url: `photos/{{${index}}}.jpg`,
    description: `Описание ${index}`,
    likes: getRandomInt(15, 200),
    comments: {
      id: index + 100,
      avatar: `img/avatar-{{${getRandomInt(1, 6)}}}.svg`,
      message: getRandomMessage(),
      name: getRandomName()}};
  return obj;
};

let getRandomMessage = function() {
  return STRINGS[getRandomInt(0, STRINGS.length - 1)];
};

let getRandomName = function() {
  return NAMES[getRandomInt(0, NAMES.length - 1)];
};
