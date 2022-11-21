import getRssData from './getDataByRequest';
import { watchedState } from './state.js';
import { createStateAndDictionary } from './listeners.js';

const sheduleTimeOut = () => {
  setTimeout(function getNewPosts() {
    const arrayPromisesDataRss = [];
    const stateUrl = watchedState.urls;
    stateUrl.forEach((url) => {
      const dataPromiseRss = getRssData(url);
      arrayPromisesDataRss.unshift(dataPromiseRss);
    });

    Promise.all(arrayPromisesDataRss).then((items) => {
      items.forEach((item) => {
        createStateAndDictionary(item.contents, watchedState);
        console.log('again');
      });
    });

    setTimeout(getNewPosts, 9000);
  }, 9000);
};

export default sheduleTimeOut;

