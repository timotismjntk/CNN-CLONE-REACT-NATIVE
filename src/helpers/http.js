import {default as axios} from 'axios';

const http = (
  url = 'https://newsapi.org/v2/everything?q=sport&language=en&pageSize=5&page=1&apiKey=445938e7b4214f4988780151868665cc',
  data,
) => {
  return axios.create({
    baseURL: `${url}/`,
  });
};

export default http;
