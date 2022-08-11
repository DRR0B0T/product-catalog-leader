import React from 'react';

export const Button = () => {
    const [addToCart, setAddToCart] = React.useState('Добавить в корзину')

    return (
        <button className='button'>
            {addToCart}
        </button>
    );
};

