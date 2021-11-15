import {showErrorSend, showSuccessSend} from './modal/AjaxModals.js';
import {showAlert} from './alerts/send-alert.js';

function request(url, options, onSuccess, onFailed) {
  return fetch(url, options)
    .then((response) => {
      if (response.ok) {
        onSuccess && onSuccess();
        return response;
      }
      onFailed && onFailed();
    });
}

const getData = () => {
  const url = 'https://24.javascript.pages.academy/kekstagram/data';
  const options = {};
  const failedFunction = () => showAlert('При загрузке данных произошла ошибка');
  return request(url, options, null, failedFunction)
    .then((response) => response.json())
    .then((data) => data);
};

const sendData = (post) => {
  const url = 'https://24.javascript.pages.academy/kekstagram';
  const options = {
    method: 'POST',
    body:post,
  };
  const failedFunction = showErrorSend;
  const successFunction = showSuccessSend;
  return request(url, options, successFunction, failedFunction);
};

export {getData, sendData};
