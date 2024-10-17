import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from './page/Home';
import { Provider } from 'react-redux';
import store from './app/store'
import Navbar from './app/components/Navbar';
import React from 'react';
import Cart from './page/cart';
import Login from './page/Auth/login';
import Logout from './page/Auth/logout';
import Register from './page/Auth/register';
import UserPage from './page/User';
import OrderPage from './page/Order';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar/>
          <Routes>
            <Route
              path="/"
              element={<HomePage/>}
            />
            <Route
              path="/cart"
              element={<Cart/>}
            />
            <Route
              path="/login"
              element={<Login/>}
            />
            <Route
              path="/logout"
              element={<Logout/>}
            />
            <Route
              path="/register"
              element={<Register/>}
            />
            <Route
              path="/user"
              element={<UserPage/>}
            />
            <Route
              path="/order"
              element={<OrderPage/>}
            />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
