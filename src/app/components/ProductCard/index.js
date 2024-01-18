import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/Cart/actions'; // Sesuaikan path sesuai struktur proyek Anda
import config from '../../../config';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="card mb-3" style={{ maxWidth: '18rem', height: '100%' }}>
      <img
        src={`${config.apiHost}/images/products/${product.image_url}`}
        alt={product.name}
        className="card-img-top"
        style={{ objectFit: 'fill', height: '200px' }}
      />
      <div className="card-body text-white bg-dark">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-text">{product.description}</p>
        <p className="card-text">Price: Rp.{product.price}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
