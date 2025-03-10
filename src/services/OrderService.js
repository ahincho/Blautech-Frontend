import axiosClient from "../utils/AxiosClient";

const orderService = {
  createOneOrder: async (order) => {
    try {
      const response = await axiosClient.post("/orders", order);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default orderService;
