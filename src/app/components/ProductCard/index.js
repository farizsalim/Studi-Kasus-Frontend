import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/Cart/actions'; // Sesuaikan path sesuai struktur proyek Anda
import config from '../../../config';
import './index.css'; // Import CSS khusus untuk card

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="product-card">
      <img
        src={`${config.apiHost}/images/products/${product.image_url}`}
        alt={product.name}
        className="product-card-img"
      />
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-text">{product.description}</p>
        <p className="product-card-price">{`Price: Rp.${Number(product.price).toLocaleString('ID')}`}</p>
        <button className="product-card-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
