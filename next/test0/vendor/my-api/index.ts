import axios from 'axios';

export default class HelloApi {
  public async hello() {
    const response = axios
      .get('/api/hello?hoge')
      .then((response) => {
        return { status: 'success', data: response };
      })
      .catch((error) => {
        return { status: 'error', data: error };
      });

    return response;
  }
}
