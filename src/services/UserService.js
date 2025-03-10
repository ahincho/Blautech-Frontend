import axiosClient from "../utils/AxiosClient";

const userService = {
  createOneUser: async (user) => {
    try {
      const response = await axiosClient.post("/auth/sign/up", user);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default userService;
