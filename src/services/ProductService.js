import axiosClient from "../utils/AxiosClient";

const productService = {
  findAll: () => axiosClient.get("/products?page=0&size=100"),
};

export default productService;
