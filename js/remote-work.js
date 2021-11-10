import { showAlert } from './util.js';
import { showErrorSend, showSuccessSend } from './util.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    }).catch((err) => {
      showAlert(`При загрузке данных произошла ошибка \n ${err}`);
    });
};

const sendData = (post) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify(post),
    },
  )
    .then((response) => {
      if (response.ok) {
        showSuccessSend();
      } else {
        showErrorSend();
      }
    })
    .catch(() => {
      showErrorSend();
    });
};


export {getData, sendData};
