import React from "react";
import { AppContext } from "../../App";

export const Button = ({ id, image, title, price }) => {
  const { onAddToCart, cartProducts } = React.useContext(AppContext);
  const obj = { id, parentId: id, image, title, price };

  return (
    <button
      onClick={() => onAddToCart(obj)}
      className={cartProducts.length ? "button active" : "button"}
    >
      {cartProducts.length > 0 ? "В корзине" : "Добавить в корзину"}
    </button>
  );
};
