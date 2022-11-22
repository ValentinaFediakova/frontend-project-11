import axios from 'axios';

const getRssData = (url) => {
  return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then(function (response) {
    return response.data;
  })
}

export default getRssData;
