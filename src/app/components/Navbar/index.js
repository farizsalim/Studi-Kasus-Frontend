import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../../app/features/Auth/actions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.user !== null);
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart); // Ambil cart dari Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hitung jumlah item di keranjang
  const cartQty = cartItems.reduce((total, item) => total + item.qty, 0);

  const handleLogout = () => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userLogout());
        localStorage.removeItem('auth');
        // Navigasi ke halaman beranda setelah logout
        navigate('/');
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          F&D STORE
        </Link>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              Cart {cartQty > 0 && <span>({cartQty})</span>}
            </Link>
          </li>

          {isLoggedIn ? (
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                {user.full_name}
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}

          {isLoggedIn && (
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
