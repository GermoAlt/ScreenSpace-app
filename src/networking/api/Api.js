import axios from 'axios';
import config from '../../config/config';

axios.defaults.baseURL = config.baseURL;
axios.defaults.timeout = config.timeout;
axios.defaults.headers.common = {
  Accept: 'application/json', // el formato que espero que la info vuelva
  'Content-Type': 'application/json', // el formato en que le mando la info
};

axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})
function setClientToken(token) {
  axios.defaults.headers.common = {
    Authorization: 'bearer ' + {token},
  };
}
export default axios;
