import React from 'react';
import '../App.css';

const Card = ({ product, category,price }) => {
  return (
    <div className="max-w-sm">
      <h3>{product}</h3>
      <p>{category}</p>
      <p>{price}</p>
    </div>
  );
};

export default Card;