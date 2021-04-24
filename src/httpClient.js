import axios from "axios";
let url = "https://reqres.in/api/login";
const httpClient = {
  get: () => axios.get(url),
  post: ({ data }) => axios.post(url, data),
  put: ({ data }) => axios.put(url, data),
  delete: ({ data }) => axios.delete(url, { data: data }),
};
export default httpClient;
