import React from "react";
import { AppContext } from "../../App";

export const Input = ({ id, counter, inStock }) => {
  const { setCartProducts } = React.useContext(AppContext);

  const handleClickPlus = () => {
    if (counter < inStock) {
      setCartProducts((cart) => {
        return cart.map((product) => {
          if (product.id === id) {
            return {
              ...product,
              counter: product.counter + 1,
              totalCount: (product.counter + 1) * parseFloat(product.price),
            };
          }
          return product;
        });
      });
    }
  };

  const handleClickMinus = () => {
    setCartProducts((cart) => {
      return cart.map((product) => {
        if (product.id === id) {
          if (product.counter === 1)
            setCartProducts((cart) =>
              cart.filter((product) => product.id !== id)
            );
          return {
            ...product,
            counter: product.counter - 1 > 1 ? product.counter - 1 : 1,
            totalCount:
              (product.counter - 1 > 1 ? product.counter - 1 : 1) *
              parseFloat(product.price),
          };
        }
        return product;
      });
    });
  };

  return (
    <div className="cart__counter">
      <button onClick={handleClickPlus}>
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
      <input onChange={(e) => +e.target.value} value={counter} />
      <button onClick={handleClickMinus}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};
