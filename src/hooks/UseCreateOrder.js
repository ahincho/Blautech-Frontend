import { useState, useContext } from "react";
import { toast } from "react-toastify";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { StoreContext } from "../contexts/StoreContext";
import orderService from "../services/OrderService";

const useCreateOrder = () => {
  const { user } = useContext(AuthenticationContext); // Obtiene el usuario del contexto de autenticación
  const { cartItems, products } = useContext(StoreContext); // Obtiene el carrito y los productos del contexto de la tienda
  const [loading, setLoading] = useState(false);

  const createOrder = async () => {
    if (!user) {
      toast.error("You must be logged in to create an order.");
      return;
    }

    // Crear el objeto details basado en los productos en el carrito
    const orderDetails = Object.keys(cartItems).map((productId) => {
      const product = products.find((prod) => prod.id === Number(productId));
      if (product) {
        return {
          productId: product.id,
          quantity: cartItems[productId],
        };
      }
      return null;
    }).filter(item => item !== null); // Filtra productos inválidos o inexistentes

    // Crear el objeto de la orden
    const orderData = {
      userId: user.id,
      details: orderDetails,
    };

    // Verifica que haya al menos un producto en la orden
    if (orderDetails.length === 0) {
      toast.error("Your cart is empty. Add items to your cart before placing an order.");
      return;
    }

    setLoading(true);
    try {
      const response = await orderService.createOneOrder(orderData);
      toast.success("Order created successfully!");
      return response.data; // Retorna la respuesta de la orden creada
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to create order";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading };
};

export default useCreateOrder;
