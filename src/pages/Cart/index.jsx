import React from "react";
import { CartProduct } from "../../components/CartProduct";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components/Form";
import { Modal } from "../../components/Modal";

export const Cart = () => {
  const { cartProducts, total } = React.useContext(AppContext);
  const [obj, setObj] = React.useState({
    name: "",
    phone: "",
    randomNumber: 0,
  });
  const [open, setOpen] = React.useState(false);
  const { price } = total;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (cartProducts.length < 1) {
      navigate(-1);
    }
  }, [cartProducts, navigate, open]);

  return (
    <main className="cart">
      <h1>Корзина</h1>
      {cartProducts.map((product) => (
        <CartProduct key={product.id} {...product} />
      ))}
      <div className="total">
        Сумма <span>{price} ₽</span>
      </div>
      <Form setObj={setObj} open={open} setOpen={setOpen} />
      <Modal {...obj} open={open} setOpen={setOpen} />
    </main>
  );
};
