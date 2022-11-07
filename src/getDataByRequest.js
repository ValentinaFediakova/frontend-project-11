import axios from 'axios';

const getRssData = (url) => {
  console.log('url', url);
  axios.get(url)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getRssData;
