import React from "react";
import { Button } from "../Button";

export const Card = ({ id, image, title, price }) => {
  return (
    <div className="card">
      <img src={image} alt="product-img" />
      <p>{title}</p>
      <span>{price} ₽</span>
      <Button id={id} image={image} title={title} price={price} />
    </div>
  );
};
