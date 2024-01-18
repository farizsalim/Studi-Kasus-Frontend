import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, setItem, clearItem } from '../../app/features/Cart/actions';
import config from '../../config';

class CartPage extends React.Component {
  componentDidMount() {
    // Coba ambil data keranjang belanja dari localStorage saat komponen di-mount
    const storedCart = this.getCartFromLocalStorage();
    if (storedCart.length > 0) {
      // Jika ada data di localStorage, perbarui state Redux dengan data tersebut
      this.props.dispatch({ type: 'SET_CART', payload: storedCart });
    }
  }

  // Fungsi untuk menyimpan data keranjang belanja di localStorage
  saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  // Fungsi untuk mendapatkan data keranjang belanja dari localStorage
  getCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  // Fungsi untuk menghapus item dari keranjang belanja
  handleRemoveItem = (item) => {
    this.props.dispatch(removeItem(item));
    this.saveCartToLocalStorage(this.props.cartItems); // Simpan data setelah menghapus item
  }

  // Fungsi untuk mengubah jumlah item dalam keranjang belanja
  handleSetItemQty = (item, qty) => {
    this.props.dispatch(setItem({ ...item, qty }));
    this.saveCartToLocalStorage(this.props.cartItems); // Simpan data setelah mengubah jumlah
  }

  // Fungsi untuk mengosongkan keranjang belanja
  handleClearCart = () => {
    this.props.dispatch(clearItem());
    this.saveCartToLocalStorage([]); // Simpan data setelah mengosongkan keranjang
  }

  // Fungsi untuk menghitung total harga
  calculateTotal = () => {
    const { cartItems } = this.props;
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  }

  render() {
    const { cartItems } = this.props;

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
                    onChange={(e) => this.handleSetItemQty(item, parseInt(e.target.value, 10))}
                  />
                </td>
                <td>{item.price}</td>
                <td>{item.price * item.qty}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => this.handleRemoveItem(item)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-3">
          <h5>Total Harga: {this.calculateTotal()} </h5>
          <button className="btn btn-warning" onClick={this.handleClearCart}>Kosongkan Keranjang</button>
          <Link to="/" className="btn btn-primary ml-2">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart,
});

export default connect(mapStateToProps)(CartPage);
