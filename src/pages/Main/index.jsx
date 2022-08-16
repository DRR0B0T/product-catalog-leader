import React from "react";
import { Card } from "../../components/Card";
import { AppContext } from "../../App";

export const Main = () => {
  const { loading, products } = React.useContext(AppContext);
  return (
    <main className="main">
      <h2>Каталог товаров</h2>
      {loading ? (
        <h2
          style={{
            position: "relative",
            top: 60,
            display: "flex",
            justifyContent: "center",
          }}
        >
          Загрузка...
        </h2>
      ) : (
        <div className="cards">
          {products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      )}
    </main>
  );
};
