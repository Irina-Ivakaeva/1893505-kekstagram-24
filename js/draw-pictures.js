const drawElement = function(photos) {
  const box = document.querySelector('.pictures');
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('a');
  const fragment = document.createDocumentFragment();

  photos.forEach(({url, likes, comments}) => {
    const element = template.cloneNode(true);
    const img = element.querySelector('img');
    img.src = url;

    const commentTemplate = element.querySelector('.picture__comments');
    commentTemplate.textContent = comments.length;

    const likesTemplate = element.querySelector('.picture__likes');
    likesTemplate.textContent = likes;

    fragment.appendChild(element);
  });
  box.appendChild(fragment);
};

export {drawElement};
