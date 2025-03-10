import { useState, useContext } from "react";
import { toast } from "react-toastify";
import authenticationService from "../services/AuthenticationService";
import AuthenticationContext from "../contexts/AuthenticationContext";

const useSignIn = () => {
  const { login } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const signIn = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authenticationService.signIn(credentials);
      toast.success("Login successful!");
      login(data);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to sign in";
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { signIn, loading, error };
};

export default useSignIn;
