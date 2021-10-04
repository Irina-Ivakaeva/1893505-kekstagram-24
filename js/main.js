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

let names = ['Артем',
'Борис',
'Екатерина',
'Алексей',
'Инна',
'Маргарита',
'Денис',
'Наталья',
'Владимир',
'Оксана'];
let strings = ['Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
let photos = [];
for (let i=1; i<=25; i++) {
  let obj = {
    id: i,
    url: 'photos/{{' + i + '}}.jpg',
    description: 'Описание' + i,
    likes: getRandomInt(15, 200),
    comments: {
      id: i + 100,
      avatar: 'img/avatar-{{' + getRandomInt(1, 6) + '}}.svg',
      message: strings[getRandomInt(0, 5)],
      name: names[getRandomInt(0, 9)]
    }
  };
  photos.push(obj);
};
