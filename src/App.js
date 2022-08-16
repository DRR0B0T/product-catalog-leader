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
  const [total, setTotal] = React.useState({
    counter: 0,
    price: 0,
  });

  React.useEffect(() => {
    setTotal({
      counter: cartProducts.reduce((prev, current) => {
        return prev + current.counter;
      }, 0),
      price: cartProducts.reduce((prev, current) => {
        return prev + parseFloat(current.totalCount);
      }, 0),
    });
  }, [cartProducts]);

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

  return (
    <AppContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        products,
        setProducts,
        loading,
        total,
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
