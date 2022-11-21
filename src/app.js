import * as yup from 'yup';

import getRssData from './getDataByRequest.js';
import { watchedState } from './state.js';
import sheduleTimeOut from './timer.js';
import { createStateAndDictionary } from './listeners.js';

const app = () => {
  const inputValue = document.getElementById('url-input');
  const form = document.querySelector('.rss-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (watchedState.validate !== null) {
      watchedState.validate = null;
    }

    const urlValid = yup.string().url('validateError_bad_link').notOneOf(watchedState.urls, 'validateError_already_exist');

    urlValid.validate(inputValue.value, { abortEarly: false })
      .then(() => {
        watchedState.isDataDownload = false;
        const rssData = getRssData(inputValue.value);
        rssData.then((data) => {
          createStateAndDictionary(data.contents, watchedState);
          watchedState.isDataDownload = true;
          watchedState.validate = 'validateError_valid';
          watchedState.urls.unshift(inputValue.value);

          if (watchedState.isTimerWork === false) {
            sheduleTimeOut();
            watchedState.isTimerWork = true;
          }
        });
      })
      .catch((err) => {
        console.log('err', err);
        watchedState.validate = err.errors.join();
      });
  });
};

export default app;
