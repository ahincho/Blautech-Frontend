import axiosClient from "../utils/AxiosClient";

const orderService = {
  createOneOrder: () => axiosClient.get("/orders"),
};

export default orderService;
