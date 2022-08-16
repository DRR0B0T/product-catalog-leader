import React from "react";
import { AppContext } from "../../App";

export const Button = ({ id, image, title, price, inStock }) => {
  const { onAddToCart, cartProducts } = React.useContext(AppContext);
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
