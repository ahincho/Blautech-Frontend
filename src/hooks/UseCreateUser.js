import { useState } from "react";
import { toast } from "react-toastify";
import userService from "../services/UserService";

const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const createUser = async (userData) => {
    setLoading(true);
    try {
      const response = await userService.createOneUser(userData);
      toast.success("User created successfully!");
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to create user";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { createUser, loading };
};

export default useCreateUser;
