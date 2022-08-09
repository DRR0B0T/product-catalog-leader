import React from 'react';
import {Card} from "../../components/Card";

export const Main = () => {
  return (
    <div className='main'>
      <h2>
        Каталог товаров
      </h2>
      <div className="cards">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

