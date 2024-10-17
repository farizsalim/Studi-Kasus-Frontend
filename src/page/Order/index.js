import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAddress } from '../../app/api/address';
import { createOrder } from '../../app/api/order';
import { getInvoiceByOrderId } from '../../app/api/order'; // Pastikan impor yang benar
import config from '../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const cartItems = useSelector(state => state.cart);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAddress();
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null;
    if (!token) {
      alert('Please log in to proceed.');
      return;
    }

    if (!selectedAddress) {
      alert('Please select a delivery address.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        delivery_fee: 10000,
        delivery_address: selectedAddress,
        items: cartItems.map(item => ({
          product: item._id,
          qty: item.qty,
          price: item.price,
          name: item.name
        }))
      };

      const response = await createOrder(payload);
      const order_id = response.data._id;

      // Hapus cart dari localStorage setelah checkout berhasil
      localStorage.removeItem('cart');

      // Fetch invoice menggunakan API getInvoiceByOrderId
      const invoice = await getInvoiceByOrderId(order_id, token); 
      console.log(invoice);
      
      // Tampilkan SweetAlert untuk "Order Berhasil"
      Swal.fire({
        title: 'Invoice',
        html: `
            <strong>Nama: </strong> ${invoice.data.user.full_name} <br>
            <strong>Email: </strong> ${invoice.data.user.email} <br><br>
            
            <strong>Alamat Pengiriman:</strong> <br>
            Provinsi: ${invoice.data.delivery_address.provinsi} <br>
            Kabupaten: ${invoice.data.delivery_address.kabupaten} <br>
            Kecamatan: ${invoice.data.delivery_address.kecamatan} <br>
            Kelurahan: ${invoice.data.delivery_address.kelurahan} <br>
            Detail: ${invoice.data.delivery_address.detail} <br><br>
    
            <strong>Sub-Total: </strong> Rp.${invoice.data.sub_total} <br>
            <strong>Ongkos Kirim: </strong> Rp.${invoice.data.delivery_fee} <br>
            <strong>Total: </strong> Rp.${invoice.data.total} <br><br>
    
            <strong>Status Pembayaran: </strong> ${invoice.data.payment_status} <br>
        `,
        showConfirmButton: true,
        width: 600,
    }).then(() => {
      // Redirect ke halaman utama setelah SweetAlert ditutup
      navigate("/", { replace: true });
      // Refresh halaman agar localStorage diperbarui
      window.location.reload();
    });
    

    } catch (error) {
      console.error('Error saat checkout:', error);
      alert('Failed to checkout, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Order Details</h2>
      
      <h3 className="mb-3">Cart Items</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Produk</th>
            <th>Gambar</th>
            <th>Jumlah</th>
            <th>Harga</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
                <img 
                  src={`${config.apiHost}/images/products/${item.image_url}`} 
                  alt={item.name} 
                  style={{ width: '50px', height: '50px' }} 
                />
              </td>
              <td>{item.qty}</td>
              <td>{`Rp.${Number(item.price).toLocaleString('ID')}`}</td>
              <td>{item.price * item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h4>Total Subtotal: {calculateSubtotal()}</h4>
      
      <h3 className="mb-3">Select Delivery Address</h3>
      <select 
        onChange={(e) => setSelectedAddress(e.target.value)} 
        className="form-control mb-4"
      >
        <option value="">Select Address</option>
        {addresses.map(address => (
          <option key={address._id} value={address._id}>
            {address.detail}, {address.kecamatan}, {address.kabupaten}, {address.provinsi}
          </option>
        ))}
      </select>
      
      <button 
        onClick={handleCheckout} 
        className="btn btn-primary" 
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </div>
  );
};

export default OrderPage;
