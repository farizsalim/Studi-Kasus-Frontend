import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, setItem, clearItem } from '../../app/features/Cart/actions';
import config from '../../config';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = getCartFromLocalStorage();
    if (storedCart.length > 0) {
      dispatch({ type: 'SET_CART', payload: storedCart });
    }
  }, [dispatch]);

  useEffect(() => {
    // Save to local storage whenever cartItems change
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  const getCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  }

  const handleSetItemQty = (item, qty) => {
    dispatch(setItem({ ...item, qty }));
  }

  const handleClearCart = () => {
    dispatch(clearItem());
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  }

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  }

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Keranjang Belanja</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Produk</th>
            <th scope="col">Gambar</th>
            <th scope="col">Jumlah</th>
            <th scope="col">Harga</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
                <img src={`${config.apiHost}/images/products/${item.image_url}`} alt={item.name} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => handleSetItemQty(item, parseInt(e.target.value, 10))}
                />
              </td>
              <td>{item.price}</td>
              <td>{item.price * item.qty}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleRemoveItem(item)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3">
        <h5>Total Jumlah: {calculateTotalQuantity()}</h5>
        <h5>Total Harga: {calculateTotal()} </h5>
        <button className="btn btn-warning" onClick={handleClearCart}>Kosongkan Keranjang</button>
        <Link to="/" className="btn btn-primary ml-2">Kembali ke Beranda</Link>
      </div>
    </div>
  );
}

export default CartPage;
