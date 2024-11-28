
import axios from "axios";

const Api = () => {
  const AxiosRequest = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { "X-Custom-Header": "foobar", "Content-Type": "application/json" },
  });
  const getProduct = (query) => AxiosRequest.get(`/api/product?${query}`);
  const getOneProduct = (id) => AxiosRequest.get(`/api/product/${id}`);
  const getFilter = () => AxiosRequest.get(`/api/product/filter`);
  

  return {
    getProduct,
    getFilter,
    getOneProduct,
  };
};

export default Api;
