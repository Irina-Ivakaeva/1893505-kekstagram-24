
function getHTMLTemplate(selector1) {
  const templateFragment = document.querySelector(selector1).content;
  return templateFragment;
}

function generatePhotoTemplate(template, photos) {
  const fragment = document.createDocumentFragment();
  photos.forEach(({url, likes, comments}) =>
  {
    const element = template.cloneNode(true);
    const img = element.querySelector('img');
    img.src = url;

    const commentTemplate = element.querySelector('.picture__comments');
    commentTemplate.textContent = comments.length;

    const likesTemplate = element.querySelector('.picture__likes');
    likesTemplate.textContent = likes;

    fragment.appendChild(element);
  });
  return fragment;
}

const drawElement = function(photos, appendNode) {
  const templateFragment = getHTMLTemplate('#picture');
  const template = templateFragment.querySelector('a');

  const arrayPhotoTemplate = generatePhotoTemplate(template, photos);
  appendNode.appendChild(arrayPhotoTemplate);
};

export {drawElement};
