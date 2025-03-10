import React, { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../contexts/StoreContext";
import "./Explore.css";

const Explore = ({ category, setCategory }) => {
  const { categories, loadingCategories: loading, errorCategories: error } = useContext(StoreContext);
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message || "Failed to load categories"}`);
    }
  }, [error]);
  return (
    <div className="explore" id="explore">
      <h1>Explore our products</h1>
      <p className="explore-text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio magnam aut nisi, facere magni voluptates error ullam. Molestiae odio quaerat rem, quibusdam dolores corrupti quam illo quisquam et, eos ullam?
      </p>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="explore-list">
          {categories.map((item) => (
            <div
              key={item.id}
              onClick={() => setCategory((prev) => (prev === item.name ? "All" : item.name))}
              className="explore-list-item"
            >
              <img className={category === item.name ? "active" : ""} src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      )}
      <hr />
    </div>
  );
};

export default Explore;
