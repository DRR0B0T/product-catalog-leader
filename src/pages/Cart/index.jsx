import React from "react";
import { CartProduct } from "../../components/CartProduct";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartProducts, total } = React.useContext(AppContext);
  const { price } = total;
  const navigate = useNavigate();

  if (cartProducts.length === 0) {
    return navigate("/", { replace: true });
  }

  return (
    <div className="cart">
      <h1>Корзина</h1>
      {cartProducts.map((product) => (
        <CartProduct key={product.id} {...product} />
      ))}
      <div className="total">
        Сумма <span>{price} ₽</span>
      </div>
    </div>
  );
};
