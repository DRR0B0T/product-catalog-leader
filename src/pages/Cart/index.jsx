import React from "react";
import { CartProduct } from "../../components/CartProduct";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components/Form";

export const Cart = () => {
  const { cartProducts, total } = React.useContext(AppContext);
  const { price } = total;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (cartProducts.length < 1) {
      navigate(-1);
    }
  }, [cartProducts, navigate]);

  return (
    <main className="cart">
      <h1>Корзина</h1>
      {cartProducts.map((product) => (
        <CartProduct key={product.id} {...product} />
      ))}
        <div className="total">
            Сумма <span>{price} ₽</span>
        </div>
        <Form />
    </main>
  );
};
