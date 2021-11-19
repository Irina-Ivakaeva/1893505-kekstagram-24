import {showErrorSend, showSuccessSend} from './modal/ajax-modals.js';
import {showAlert} from './alerts/send-alert.js';

function request(url, options, onSuccess, onFailed) {
  return fetch(url, options)
    .then((response) => {
      if (response.ok) {
        onSuccess && onSuccess();
        return response;
      }
      throw new Error(`При загрузке данных произошла ошибка: ${response.status} ${response.statusText}`);
    })
    .catch(() => {
      onFailed && onFailed();
    });
}

const getData = () => {
  const url = 'https://24.javascript.pages.academy/kekstagram/data';
  const options = {};
  const returnFailedFunction = () => showAlert('При загрузке данных произошла ошибка');
  return request(url, options, null, returnFailedFunction)
    .then((response) => response.json());
};

const sendData = (post) => {
  const url = 'https://24.javascript.pages.academy/kekstagram';
  const options = {
    method: 'POST',
    body:post,
  };
  const returnFailedFunction = showErrorSend;
  const returnSuccessFunction = showSuccessSend;
  return request(url, options, returnSuccessFunction, returnFailedFunction);
};

export {getData, sendData};
