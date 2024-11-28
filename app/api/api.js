
import axios from "axios";

const Api = () => {
  const AxiosRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_END,
    headers: { "X-Custom-Header": "foobar", "Content-Type": "application/json" },
  });
  const getProduct = (query) => AxiosRequest.get(`/product?${query}`);
  const getOneProduct = (id) => AxiosRequest.get(`/product/${id}`);
  const getFilter = () => AxiosRequest.get(`/product/filter`);
  

  return {
    getProduct,
    getFilter,
    getOneProduct,
  };
};

export default Api;
