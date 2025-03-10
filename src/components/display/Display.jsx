import React, { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../contexts/StoreContext";
import Item from "../item/Item";
import "./Display.css";

const Display = ({ category }) => {
  const { products, loading, error } = useContext(StoreContext);
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message || "No se pudo obtener los productos"}`);
    }
  }, [error]);
  return (
    <div className="display" id="display">
      <h2>Top dishes near you</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="display-list">
          {products.length > 0 ? (
            products.map((item) =>
              category === "All" || category === item.category ? (
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              ) : null
            )
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Display;
