import axios from 'axios';
axios.defaults.withCredentials = true;

const url = process.env.REACT_APP_URL;

export default function useFetch() {

  const fetchApi = async (route,  method = 'GET', data = {}) => {
    try{
      const result = await axios({
        method,
        url:`${url}/api/v1${route}`,
        data,
      });
      return result

    } catch (e) {
      console.log(e)
      return 'error'
    }
  }

  return fetchApi;
}