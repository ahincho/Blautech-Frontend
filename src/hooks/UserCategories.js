import { useEffect, useState } from "react";
import categoryService from "../services/CategoryService";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    categoryService
      .findAll()
      .then((response) => {
        setCategories(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  return { categories, loading, error };
};

export default useCategories;
