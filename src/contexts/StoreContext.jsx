import { createContext, useState } from "react";
import useCategories from "../hooks/UserCategories";
import useProducts from "../hooks/UseProducts";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const { categories, loading: loadingCategories, error: errorCategories } = useCategories();
  const { products, loading: loadingProducts, error: errorProducts } = useProducts();
  const [cartItems, setCartItems] = useState({});
  /* Add Item to Cart by Id */
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };
  /* Remove Item from Cart by Id */
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        return {
          ...prev,
          [itemId]: prev[itemId] - 1,
        };
      } else {
        const updatedCart = { ...prev };
        delete updatedCart[itemId];
        return updatedCart;
      }
    });
  };
  /* Compute Total Cart Items Amount */
  const getTotalCartAmount = () => {
    if (!products || loadingProducts) return 0;
    let totalAmount = 0;
    for (const item in cartItems) {
      const itemInfo = products.find((product) => String(product.id) === String(item));
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return Number(totalAmount.toFixed(2));
  };
  /* Values */
  const contextValue = {
    products,
    loadingProducts,
    errorProducts,
    categories,
    loadingCategories,
    errorCategories,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };
  /* Export */
  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
