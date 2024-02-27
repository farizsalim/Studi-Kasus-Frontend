import React, { useState, useEffect } from 'react';
import { createAddress, getAddress, getLocationData } from '../../app/api/address';
import Swal from 'sweetalert2';

const UserAddress = () => {
  const [userAddresses, setUserAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    nama: '',
    kelurahan: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    detail: '',
  });

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [kelurahans, setKelurahans] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAddress();
        setUserAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    const fetchProvinces = async () => {
      try {
        const response = await getLocationData('provinces');
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchAddresses();
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (provinceId) => {
    try {
      const response = await getLocationData('kabupaten', provinceId);
      setRegencies(response.data);
    } catch (error) {
      console.error('Error fetching regencies:', error);
    }
  };

  const handleRegencyChange = async (regencyId) => {
    try {
      const response = await getLocationData('kecamatan', regencyId);
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const handleKecamatanChange = async (kecamatanId) => {
    try {
      const response = await getLocationData('kelurahan', kecamatanId);
      setKelurahans(response.data);
    } catch (error) {
      console.error('Error fetching kelurahans:', error);
    }
  };

  const handleCreateAddress = async () => {
    try {
      // Extract names from the selected IDs
      const province = provinces.find((p) => p.id === newAddress.provinsi);
      const regency = regencies.find((r) => r.id === newAddress.kabupaten);
      const district = districts.find((d) => d.id === newAddress.kecamatan);
      const kelurahan = kelurahans.find((k) => k.id === newAddress.kelurahan);
  
      // Create a new address object with names
      const newAddressWithNames = {
        nama: newAddress.nama,
        provinsi: province ? province.name : '',
        kabupaten: regency ? regency.name : '',
        kecamatan: district ? district.name : '',
        kelurahan: kelurahan ? kelurahan.name : '',
        detail: newAddress.detail,
      };
  
      // Send the new object with names to the API
      const response = await createAddress(newAddressWithNames);
  
      // Update the state with the new address
      setUserAddresses([...userAddresses, response.data]);
  
      // Clear the form fields
      setNewAddress({
        nama: '',
        kelurahan: '',
        kecamatan: '',
        kabupaten: '',
        provinsi: '',
        detail: '',
      });
  
      Swal.fire({
        icon: 'success',
        title: 'Address Added',
        text: 'Your new address has been added successfully.',
      });
    } catch (error) {
      console.error('Error adding address:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the address.',
      });
    }
  };

  return (
    <div className='container'>
      <h3>User Address</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Nama Tempat</th>
            <th scope="col">Kelurahan</th>
            <th scope="col">Kecamatan</th>
            <th scope="col">Kabupaten</th>
            <th scope="col">Provinsi</th>
            <th scope="col">Detail</th>
          </tr>
        </thead>
        <tbody>
          {userAddresses.map((address, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{address.nama}</td>
              <td>{address.kelurahan}</td>
              <td>{address.kecamatan}</td>
              <td>{address.kabupaten}</td>
              <td>{address.provinsi}</td>
              <td>{address.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Add New Address</h4>
      <div className='card p-5 mx-auto' style={{ width: '30rem' }}>
        <div className="address-form">
          <div className="form-group">
            <label htmlFor="namaTempat">Nama Tempat:</label>
            <input
              type="text"
              id="namaTempat"
              className="form-control"
              value={newAddress.nama}
              onChange={(e) => setNewAddress({ ...newAddress, nama: e.target.value })}
            />
          </div>
          <div className="form-group">
      <label htmlFor="provinsi">Provinsi:</label>
      <select
        id="provinsi"
        className="form-control"
        value={newAddress.provinsi}
        onChange={(e) => {
          setNewAddress({ ...newAddress, provinsi: e.target.value });
          handleProvinceChange(e.target.value);
        }}
      >
        <option value="" disabled>Pilih Provinsi</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>{province.name}</option>
        ))}
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="kabupaten">Kabupaten/Kota:</label>
      <select
        id="kabupaten"
        className="form-control"
        value={newAddress.kabupaten}
        onChange={(e) => {
          setNewAddress({ ...newAddress, kabupaten: e.target.value });
          handleRegencyChange(e.target.value);
        }}
      >
        <option value="" disabled>Pilih Kabupaten/Kota</option>
        {regencies.map((regency) => (
          <option key={regency.id} value={regency.id}>{regency.name}</option>
        ))}
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="kecamatan">Kecamatan:</label>
      <select
        id="kecamatan"
        className="form-control"
        value={newAddress.kecamatan}
        onChange={(e) => {
          setNewAddress({ ...newAddress, kecamatan: e.target.value });
          handleKecamatanChange(e.target.value);
        }}
      >
        <option value="" disabled>Pilih Kecamatan</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>{district.name}</option>
        ))}
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="kelurahan">Kelurahan:</label>
      <select
        id="kelurahan"
        className="form-control"
        value={newAddress.kelurahan}
        onChange={(e) => setNewAddress({ ...newAddress, kelurahan: e.target.value })}
      >
        <option value="" disabled>Pilih Kelurahan</option>
        {kelurahans.map((kelurahan) => (
          <option key={kelurahan.id} value={kelurahan.id}>{kelurahan.name}</option>
        ))}
      </select>
    </div>

          <div className="form-group">
            <label htmlFor="detail">Detail:</label>
            <textarea
              id="detail"
              className="form-control"
              value={newAddress.detail}
              onChange={(e) => setNewAddress({ ...newAddress, detail: e.target.value })}
            />
          </div>

          <button className="btn mt-3 btn-primary" onClick={handleCreateAddress}>Add Address</button>
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
