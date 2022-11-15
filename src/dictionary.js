import i18next from 'i18next';
import resources from './locales/index.js';

const dictionaryData = i18next.createInstance();

dictionaryData.init({
  lng: 'ru',
  ns: ['translations'],
  defaultNS: 'translations',
  resources,
});

export default dictionaryData;
