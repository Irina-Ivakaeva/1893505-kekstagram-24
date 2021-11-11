const ALERT_SHOW_TIME = 5000;

const alertParams = {
  zIndex: 100,
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  padding: '10px 3px',
  fontSize: '30px',
  textAlign: 'center',
  backgroundColor: 'red',
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  for (const key in alertParams) {
    alertContainer.style[key] = alertParams[key];
  }
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert};
