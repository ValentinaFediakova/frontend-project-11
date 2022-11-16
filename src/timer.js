import getRssData from './getDataByRequest';
import { state, watchedState } from './state.js';
import { createStateAndDictionary } from './listeners.js';

const sheduleTimeOut = () => {
  const arrayPromisesDataRss = [];
  const stateUrl = state.urls;
  stateUrl.forEach((url) => {
    const dataPromiseRss = getRssData(url);
    arrayPromisesDataRss.unshift(dataPromiseRss);
  });

  Promise.all(arrayPromisesDataRss).then((items) => {
    items.forEach((item) => {
      watchedState.feeds = [];
      watchedState.posts = [];
      const isDataFromTimer = true;
      createStateAndDictionary(item.contents, isDataFromTimer);
      console.log('again');
    });
  });

  setTimeout(sheduleTimeOut, 5000);
};

export default sheduleTimeOut;
