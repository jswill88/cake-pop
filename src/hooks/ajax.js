import axios from 'axios';

const url = process.env.REACT_APP_URL;

export default function useFetch() {

  const fetchApi = async (route,  method = 'GET', data = {}) => {
    const result = await axios({
      method,
      url:`${url}/api/v1${route}`,
      data: {'body': 'there'}
    });

    return result.data
  }

  return fetchApi;
}