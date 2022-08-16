import React from "react";
import { AppContext } from "../../App";
import axios from "axios";

export const Button = ({ id, image, title, price, inStock }) => {
  const { cartProducts, setCartProducts } = React.useContext(AppContext);
  const obj = {
    id,
    parentId: id,
    image,
    title,
    price,
    inStock,
    counter: 1,
    totalCount: price,
  };
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartProducts.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartProducts((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://62f8eba8e0564480352f4384.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartProducts((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://62f8eba8e0564480352f4384.mockapi.io/cart",
          obj
        );
        setCartProducts((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка добавления товара в корзину!");
      console.error(error);
    }
  };
  return (
    <button
      onClick={() => onAddToCart(obj)}
      className={
        cartProducts.some((item) => item.title === title)
          ? "button active"
          : "button"
      }
    >
      {cartProducts.some((item) => item.title === title)
        ? "В корзине"
        : "Добавить в корзину"}
    </button>
  );
};
