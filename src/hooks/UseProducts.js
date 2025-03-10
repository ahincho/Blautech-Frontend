import { useEffect, useState } from "react";
import productService from "../services/ProductService";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    productService
      .findAll()
      .then((response) => {
        setProducts(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  return { products, loading, error };
};

export default useProducts;
