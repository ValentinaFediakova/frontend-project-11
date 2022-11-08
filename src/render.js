
export const renderValidateError = (path, value) => {
  const errorHtmlElem = document.querySelector('.feedback');
  const inputHtml = document.getElementById('url-input');

  errorHtmlElem.classList.add('text-danger')
  errorHtmlElem.textContent = value;

  inputHtml.classList.add('is-invalid')
}



