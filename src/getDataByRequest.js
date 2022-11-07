import axios from 'axios';

const getRssData = (url) => {
  console.log('url', url);

  return axios(url, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin',
  }).then(response => {
    console.log('response', response);
  })
  .catch((error) => {
    console.log('error', error);
  });
};

export default getRssData;
