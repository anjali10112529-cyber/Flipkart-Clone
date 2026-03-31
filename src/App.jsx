import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Home from './home';
import ForYou from './products/forYou';
import Fashion from './products/fashion';
import { CartProvider } from './context/cartContext';
import './App.css';

function App() {
  const [showPage, setShowPage] = useState('home');

  useEffect(() => {
    // Check URL parameters
    const params = new URLSearchParams(window.location.search);
    const show = params.get('show');
    if (show === 'foryou') {
      setShowPage('foryou');
    } else if (show === 'fashion') {
      setShowPage('fashion');
    } else {
      setShowPage('home');
    }
  }, []);

  const renderPage = () => {
    switch(showPage) {
      case 'foryou':
        return <ForYou />;
      case 'fashion':
        return <Fashion />;
      default:
        return <Home />;
    }
  };

  return (
    <CartProvider>
      <>
        <Navbar />
        {renderPage()}
      </>
    </CartProvider>
  );
}

export default App;