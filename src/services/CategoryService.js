import axiosClient from "../utils/AxiosClient";

const categoryService = {
  findAll: () => axiosClient.get("/categories?page=0&size=100"),
};

export default categoryService;
