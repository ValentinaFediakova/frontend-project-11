import axios from 'axios';

const getRssData = (url) => {
  console.log('url', url)
  axios.get(url)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
}



export default getRssData;