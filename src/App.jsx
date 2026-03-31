import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Home from './home';
import ForYou from './products/forYou';
import Fashion from './products/fashion';
import Mobile from './products/mobile';
import Beauty from './products/beauty';
import Electronics from './products/electronics';
import Appliances from './products/appliances';
import Toys from './products/toys';
import Books from './products/books';
import Home1 from './home1';
import Footer from './footer';
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
     } else if (show === 'mobile') {
      setShowPage('mobile');
     } else if (show === 'beauty') {
      setShowPage('beauty');
     } else if (show === 'electronics') {
      setShowPage('electronics');
     } else if (show === 'home1') {
      setShowPage('home1');
     } else if (show === 'appliances') {
      setShowPage('appliances');
     } else if (show === 'toys') {
      setShowPage('toys');
     } else if (show === 'books') {
      setShowPage('books');
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
       case 'mobile':
        return <Mobile />;
      case 'beauty':
        return <Beauty />;
      case 'electronics':
        return <Electronics />;
      case 'home1':
        return <Home1/>;
      case 'appliances':
        return <Appliances/>;
      case 'toys':
        return <Toys/>;
      case 'books':
        return <Books/>;
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
      <Footer />
    </CartProvider>
  );
}

export default App;