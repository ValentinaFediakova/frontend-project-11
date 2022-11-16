import getRssData from './getDataByRequest'
import { state, watchedState } from './state.js'
import { createStateAndDictionary } from './listeners.js'

const sheduleTimeOut = () => {
  // перебирать все урлы из стейта,
  // записывать в массив промисов результат
  // промис алл - все их решать и выводить данные
  const arrayPromisesDataRss = [];
  const stateUrl = state.urls;
  stateUrl.forEach((url) => {
    const dataPromiseRss = getRssData(url);
    arrayPromisesDataRss.unshift(dataPromiseRss)
  })

  Promise.all(arrayPromisesDataRss).then((items) => {
    items.forEach((item) => {
      watchedState.feeds = [];
      watchedState.posts = [];
      createStateAndDictionary(item.contents);
      console.log('again')
    })
  })

  setTimeout(sheduleTimeOut, 5000);
}

export default sheduleTimeOut;