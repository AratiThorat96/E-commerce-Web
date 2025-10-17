import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx'; 
import Registration from './pages/Registration.jsx';
import Nav from './component/Nav.jsx';
import { userDataContext } from './context/UserContext.jsx';
import About from './pages/About.jsx';
import Collections from './pages/Collections.jsx';
import Product from './pages/Product.jsx';
import Contact from './pages/Contact.jsx';
import ProuductDetail from './pages/ProuductDetail.jsx';
import Cart from './pages/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Order from './pages/Order.jsx';

function App() {
  let { userData } = useContext(userDataContext);
  let location = useLocation();

  return (
    <>
      {userData && <Nav />} 
      <div className="pt-[70px]"></div>

      <Routes>
        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={userData ? (<Navigate to={ location.state?.from || "/" } />) : (<Login />)} 
        />
        <Route 
          path="/signup" 
          element={userData ? (<Navigate to={ location.state?.from || "/" } />) : (<Registration />)} 
        />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={userData ? <Home /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />
        <Route 
          path="/about" 
          element={userData ? <About /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />
        <Route 
          path="/collections" 
          element={userData ? <Collections /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />
        <Route 
          path="/product" 
          element={userData ? <Product /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />
        <Route 
          path="/contact" 
          element={userData ? <Contact /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />

       <Route 
          path="/productDetail/:productId" 
          element={userData ? <ProuductDetail /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />
         <Route 
          path="/cart" 
          element={userData ? <Cart /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />

         <Route 
          path="/placeorder" 
          element={userData ? <PlaceOrder /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />
         <Route 
          path="/order" 
          element={userData ? <Order /> : <Navigate to="/login" state={{ from: location.pathname }} />} 
        />

        
      </Routes>
    </>
  );
}

export default App;
