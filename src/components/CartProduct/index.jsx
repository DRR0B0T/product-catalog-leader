import React from "react";
import { Input } from "../Input";
import { AppContext } from "../../App";
import axios from "axios";

export const CartProduct = ({ id, image, title, price, inStock, counter }) => {
  const { setCartProducts } = React.useContext(AppContext);
  const handleDelete = () => {
    try {
      setCartProducts((cart) => cart.filter((product) => product.id !== id));
      axios.delete(`https://62f8eba8e0564480352f4384.mockapi.io/cart/${id}`);
    } catch (error) {
      alert("Не удалось удалить товар!");
    }
  };
  return (
    <>
      <div className="cart__product">
        <img src={image} alt="product-img" />
        <p>{title}</p>
        <Input id={id} counter={counter} inStock={inStock} />
        <span>{price} ₽</span>
        <button onClick={handleDelete} className="cart__product_button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <hr
        style={{
          marginBottom: 30,
          marginTop: 30,
          width: "100%",
          color: "#A8AFBB",
        }}
      />
    </>
  );
};
