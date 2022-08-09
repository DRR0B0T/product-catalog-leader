import React from 'react';
import moisturizer from '../../assets/img/moisturizer.jpg'


export const Card = () => {
  return (
    <div className='card'>
      <img src={moisturizer} alt="product-img"/>
      <p>
        Увлажнитель воздуха
        STARWIND SHC1322, 3л, белый
      </p>
      <span>1650 ₽</span>
    </div>
  );
};

