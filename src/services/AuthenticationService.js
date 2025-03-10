import axiosClient from "../utils/AxiosClient";

const authenticationService = {
  signIn: async (credentials) => {
    try {
      const response = await axiosClient.post("/auth/sign/in", credentials);
      return response.data;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default authenticationService;
