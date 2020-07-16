import axios from 'axios';

export default class AxiosService {

    static api = axios.create({
        baseURL: `${process.env.REACT_APP_BASE_URL}`,
        timeout: 10000
        // headers: {'X-Custom-Header': 'foobar'}
        // API KEY here
      });
}