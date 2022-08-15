import React from "react";

import "./scss/App.scss";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layouts";
import { Main } from "./pages/Main";
import { Cart } from "./pages/Cart";
import axios from "axios";

export const AppContext = React.createContext({});

function App() {
  const [products, setProducts] = React.useState([]);
  const [cartProducts, setCartProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  console.log(cartProducts);
  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await axios.get(
          "https://62f8eba8e0564480352f4384.mockapi.io/products"
        );
        setLoading(false);
        setProducts(data.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
      }
    }
    fetchData();
  }, []);

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

  const onRemoveFromCart = (id) => {
    try {
      axios.delete(`https://62f8eba8e0564480352f4384.mockapi.io/cart/${id}`);
      setCartProducts((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка удаления товара из корзины!");
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        products,
        setProducts,
        loading,
        onAddToCart,
        onRemoveFromCart,
      }}
    >
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
