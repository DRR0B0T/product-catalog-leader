import React from "react";

export const Button = () => {
  let flag = false;

  return (
    <button className="button">
      {flag ? "В корзине" : "Добавить в корзину"}
    </button>
  );
};
