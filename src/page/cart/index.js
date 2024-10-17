import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeItem, setItem, clearItem } from '../../app/features/Cart/actions';
import { saveCart } from '../../app/api/cart'; // API untuk menyimpan cart
import config from '../../config';
import Swal from 'sweetalert2'; // Impor SweetAlert2
import './index.css'; // Pastikan untuk mengimpor file CSS

const CartPage = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Untuk redirect setelah checkout

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
  };

  const getCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
    Swal.fire({
      title: 'Item Dihapus!',
      text: `${item.name} telah dihapus dari keranjang.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleSetItemQty = (item, qty) => {
    dispatch(setItem({ ...item, qty }));
    Swal.fire({
      title: 'Jumlah Diperbarui!',
      text: `Jumlah ${item.name} telah diperbarui menjadi ${qty}.`,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  };

  const handleClearCart = () => {
    dispatch(clearItem());
    Swal.fire({
      title: 'Keranjang Kosong!',
      text: 'Semua item telah dihapus dari keranjang.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null;
    if (!token) {
      Swal.fire({
        title: 'Perhatian!',
        text: 'Silakan login untuk melanjutkan.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Filter hanya property yang diperlukan: _id, qty, price, dan name
    const filteredCartItems = cartItems.map(item => ({
      product: item._id,
      qty: item.qty,
      price: item.price,
      name: item.name,
    }));

    try {
      await saveCart(token, filteredCartItems); // Simpan cart yang sudah difilter ke backend
      console.log('Cart successfully saved:', filteredCartItems);
      Swal.fire({
        title: 'Keranjang Disimpan!',
        text: 'Proceeding to checkout.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/order'); // Redirect to order page
    } catch (error) {
      console.error('Error saving cart:', error);
      Swal.fire({
        title: 'Gagal Menyimpan!',
        text: 'Gagal menyimpan cart, silakan coba lagi.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h2 className="cart-title mt-4 mb-4">Keranjang Belanja</h2>
        <table className="cart-table table">
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
                  <img src={`${config.apiHost}/images/products/${item.image_url}`} alt={item.name} className="cart-item-image" />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => handleSetItemQty(item, parseInt(e.target.value, 10))}
                    className="cart-item-qty"
                  />
                </td>
                <td>Rp.{Number(item.price).toLocaleString('ID')}</td>
                <td>Rp.{Number(item.price * item.qty).toLocaleString('ID')}</td>
                <td>
                  <button className="btn btn-danger cart-remove-btn" onClick={() => handleRemoveItem(item)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cart-summary mt-3">
          <h5>Total Jumlah: {calculateTotalQuantity()}</h5>
          <h5>Total Harga: Rp.{Number(calculateTotal()).toLocaleString('ID')} </h5>
          <button className="btn btn-warning cart-clear-btn" onClick={handleClearCart}>Kosongkan Keranjang</button>
          <button onClick={handleCheckout} className="btn btn-success cart-checkout-btn ml-2">Checkout</button>
          <Link to="/" className="btn btn-primary cart-back-btn ml-2">Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
