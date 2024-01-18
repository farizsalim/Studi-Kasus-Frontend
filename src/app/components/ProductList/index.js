import React, { useEffect, useState } from 'react';
import { getProduct } from '../../api/products'; // Update the path accordingly
import ProductCard from '../ProductCard/index';

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const filterProducts = async () => {
    setLoading(true);

    try {
      let response;
      if (selectedCategory === 'All') {
        response = await getProduct();
      } else {
        response = await getProduct({ category: selectedCategory });
      }

      const products = Array.isArray(response.data.data) ? response.data.data : [];

      // Apply search filter
      const filteredBySearch = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredProducts(filteredBySearch);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        {/* Category filter buttons */}
        <div className="btn-group mb-4">
          <button
            type="button"
            className={`btn btn-outline-primary ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary ${selectedCategory === 'Food' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Food')}
          >
            Food
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary ${selectedCategory === 'Drink' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Drink')}
          >
            Drink
          </button>
          {/* Add more category buttons as needed */}
        </div>

        {/* Search input */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={filterProducts}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        {/* Render filtered products or loading message */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
