import React, { useState } from 'react';
import { createAddress } from '../../app/api/address'; // Sesuaikan path dengan struktur proyek Anda
import Swal from 'sweetalert2';

const UserAddress = () => {
  const [userAddresses, setUserAddresses] = useState([]); // State lokal untuk menyimpan alamat
  const [newAddress, setNewAddress] = useState({
    nama: '',
    kelurahan: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    detail: '',
  });

  const handleCreateAddress = async () => {
    try {
      // Panggil API untuk menambah alamat
      const response = await createAddress(newAddress);

      // Jika berhasil, tambahkan alamat baru ke dalam state lokal
      setUserAddresses([...userAddresses, response.data]);

      // Atur kembali form ke nilai awal
      setNewAddress({
        nama: '',
        kelurahan: '',
        kecamatan: '',
        kabupaten: '',
        provinsi: '',
        detail: '',
      });

      // Tampilkan pesan sukses menggunakan SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Address Added',
        text: 'Your new address has been added successfully.',
      });
    } catch (error) {
      // Tangani kesalahan dan tampilkan pesan error
      console.error('Error adding address:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the address.',
      });
    }
  };

  return (
    <div>
      <h3>User Address</h3>
      {/* Tampilkan alamat dengan properti yang sesuai */}
      {userAddresses.map((address, index) => (
        <div key={index}>
          <p>Nama: {address.nama}</p>
          <p>Kelurahan: {address.kelurahan}</p>
          <p>Kecamatan: {address.kecamatan}</p>
          <p>Kabupaten: {address.kabupaten}</p>
          <p>Provinsi: {address.provinsi}</p>
          <p>Detail: {address.detail}</p>
          <hr />
        </div>
      ))}

      {/* Form untuk menambah alamat baru */}
      <h4>Add New Address</h4>
      <div>
        <label>Nama:</label>
        <input
          type="text"
          value={newAddress.nama}
          onChange={(e) => setNewAddress({ ...newAddress, nama: e.target.value })}
        />
      </div>
      <div>
        <label>Kelurahan:</label>
        <input
          type="text"
          value={newAddress.kelurahan}
          onChange={(e) => setNewAddress({ ...newAddress, kelurahan: e.target.value })}
        />
      </div>
      <div>
        <label>Kecamatan:</label>
        <input
          type="text"
          value={newAddress.kecamatan}
          onChange={(e) => setNewAddress({ ...newAddress, kecamatan: e.target.value })}
        />
      </div>
      <div>
        <label>Kabupaten:</label>
        <input
          type="text"
          value={newAddress.kabupaten}
          onChange={(e) => setNewAddress({ ...newAddress, kabupaten: e.target.value })}
        />
      </div>
      <div>
        <label>Provinsi:</label>
        <input
          type="text"
          value={newAddress.provinsi}
          onChange={(e) => setNewAddress({ ...newAddress, provinsi: e.target.value })}
        />
      </div>
      <div>
        <label>Detail:</label>
        <textarea
          value={newAddress.detail}
          onChange={(e) => setNewAddress({ ...newAddress, detail: e.target.value })}
        />
      </div>

      <button onClick={handleCreateAddress}>Add Address</button>
    </div>
  );
};

export default UserAddress;