import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setPage } from '../../app/features/Product/actions';
import ProductList from '../../app/components/ProductList/index';
import Pagination from '../../app/components/Pagination/index';

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: products, currentPage, perPage, totalItems, status } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onPageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  return (
    <div className="home-page container mt-4">
      <h1 className="mb-4">Product List</h1>
      {status === 'process' && <p>Loading...</p>}
      {status === 'error' && <p>Error fetching products.</p>}
      {status === 'success' && (
        <>
          <ProductList products={products} selectedCategory="All" />
          <div className="row justify-content-center">
            <div className="col-md-6 mt-4 text-center">
              <Pagination
                currentPage={currentPage}
                perPage={perPage}
                totalItems={totalItems}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;