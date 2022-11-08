
// import keyBy from 'lodash/keyBy.js';
import * as yup from 'yup';
import onChange from 'on-change';

import { renderValidateError } from './render.js';


export const app = () => {
  const inputValue = document.getElementById('url-input')
  const form = document.querySelector('.rss-form');

  const state = {
    currentUrl: '',
    feeds: [],
    validateError: [],
  }

  const watchedObject = onChange(state, function (path, value) {
    if (path === 'validateError') {
      renderValidateError(path, value);
    }
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let urlValid = yup.string().url('Ссылка должна быть валидным URL').notOneOf(watchedObject.feeds, "RSS уже существует")

    urlValid.validate(inputValue.value, { abortEarly: false })
      .then(function (valid) {

        console.log('valid', valid)
        watchedObject.feeds.push(inputValue.value);
      })
      .catch(e => {
        console.log('e', e)
        watchedObject.validateError = e.errors;
      })
  });
}

app()
