import React from 'react';
import { useSelector } from 'react-redux';

const CartCount = () => {
  const cartItems = useSelector((state) => state.cart);

  const totalItems = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <span className="badge badge-secondary">{totalItems}</span>
  );
};

export default CartCount;