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
let isOpenFullPhoto = false;

function getOpenPhoto(element, photos) {
  const clickPhotoUrl = element.src.replace('http://localhost:3000/', '');
  let fullElement;
  for (let index = 0; index < photos.length; index++) {
    if (clickPhotoUrl === photos[index].url) {
      fullElement = photos[index];
      break;
    }
  }
  return fullElement;
}

function closeFullPhoto() {
  isOpenFullPhoto = false;
  fullPhoto.classList.add('hidden');
}

btnFullPhotoClose.addEventListener('click', () => {
  closeFullPhoto();
});

// Не поняла как работать с таким шаблоном, создавала вручную (function addComments)
/*function getCommentTemplate() {
  return `<li class="social__comment">
  <img
      class="social__picture"
      src="{{аватар}}"
      alt="{{имя комментатора}}"
      width="35" height="35">
  <p class="social__text">{{текст комментария}}</p>
</li>`;
}*/

function clearDefaultComments() {
  const defaultComments = socialCommentsWrapper.querySelectorAll('.social__comment');
  defaultComments.forEach((element) => {
    socialCommentsWrapper.removeChild(element);
  });
}

function addComments(arrayComments) {
  arrayComments.forEach((comment) => {
    const liTag = document.createElement('li');
    liTag.classList.add('social__comment');
    const imgTag = document.createElement('img');
    imgTag.classList.add('social__picture');
    imgTag.src = comment.avatar;
    imgTag.alt = 'Аватар комментатора фотографии';
    imgTag.width = '35';
    imgTag.height = '35';
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

function setData(element, photos) {
  const photoObject = getOpenPhoto(element, photos);
  fullPhotoImg.src = photoObject.url;
  fullPhotoLikes.textContent = photoObject.likes;
  fullPhotoCommentsCount.textContent = photoObject.comments.length;
  socialCaption.textContent = photoObject.description;
  setComments(photoObject.comments);
}

function openFullPhoto(element, photos) {
  isOpenFullPhoto = true;
  socialComment.classList.add('hidden');
  loader.classList.add('hidden');
  body.classList.add('modal-open');
  fullPhoto.classList.remove('hidden');
  setData(element, photos);
}

export {openFullPhoto, isOpenFullPhoto, closeFullPhoto};
