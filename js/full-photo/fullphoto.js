const fullPhoto = document.querySelector('.big-picture');
const socialComment = fullPhoto.querySelector('.social__comment-count');
const loader = fullPhoto.querySelector('.comments-loader');
const body = document.querySelector('body');
const fullPhotoImg = fullPhoto.querySelector('.big-picture__img img');
const fullPhotoLikes = fullPhoto.querySelector('.likes-count');
const fullPhotoCommentsCount = fullPhoto.querySelector('.comments-count');
const socialCommentsWrapper = fullPhoto.querySelector('.social__comments');
const socialCaption = fullPhoto.querySelector('.social__caption');
const btnFullPhotoClose = document.querySelector('#picture-cancel');
const avatarAlt = 'Аватар комментатора фотографии';
const avatarSize = '35';
let isOpenFullPhoto = false;

function getOpenPhoto(element, photos) {
  const clickPhotoId = element.dataset.id;
  let fullElement;
  photos.forEach((photo) => {
    if (Number(clickPhotoId) === photo.id) {
      fullElement = photo;
    }
  });
  return fullElement;
}

function closeFullPhoto() {
  isOpenFullPhoto = false;
  fullPhoto.classList.add('hidden');
}

btnFullPhotoClose.addEventListener('click', () => {
  closeFullPhoto();
});

function clearDefaultComments() {
  socialCommentsWrapper.innerHTML = '';
}

function addComments(arrayComments) {
  arrayComments.forEach((comment) => {
    const liTag = document.createElement('li');
    liTag.classList.add('social__comment');
    const imgTag = document.createElement('img');
    imgTag.classList.add('social__picture');
    imgTag.src = comment.avatar;
    imgTag.alt = avatarAlt;
    imgTag.width = avatarSize;
    imgTag.height = avatarSize;
    const pTag = document.createElement('p');
    pTag.classList.add('social__text');
    pTag.textContent = comment.message;
    liTag.appendChild(imgTag);
    liTag.appendChild(pTag);
    socialCommentsWrapper.appendChild(liTag);
  });
}

function setComments(arrayComments) {
  clearDefaultComments();
  addComments(arrayComments);
}

function setData(photoObject) {
  fullPhotoImg.src = photoObject.url;
  fullPhotoLikes.textContent = photoObject.likes;
  fullPhotoCommentsCount.textContent = photoObject.comments.length;
  socialCaption.textContent = photoObject.description;
}

function openFullPhoto(element, photos) {
  const photoObject = getOpenPhoto(element, photos);
  isOpenFullPhoto = true;
  socialComment.classList.add('hidden');
  loader.classList.add('hidden');
  body.classList.add('modal-open');
  fullPhoto.classList.remove('hidden');
  setData(photoObject);
  setComments(photoObject.comments);
}

export {openFullPhoto, isOpenFullPhoto, closeFullPhoto};
