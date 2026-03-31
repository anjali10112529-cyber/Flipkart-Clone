import React, { useState } from 'react';
import { useCart } from './context/cartContext';
import { Container, Row, Col, Card, Button, Badge, Toast } from 'react-bootstrap';
import { FaRupeeSign, FaStar, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';

const Home = () => {
  const { addToCart } = useCart();

  const [wishlist, setWishlist] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 🔥 DEAL PRODUCTS (MIXED CATEGORY)
  const products = [
    {
      id: 1,
      title: "Smartphone 5G",
      brand: "Xiaomi",
      price: 13999,
      originalPrice: 18999,
      discount: "26% off",
      tag: "Hot Deal",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      rating: 4.5
    },
    {
      id: 2,
      title: "Wireless Earbuds",
      brand: "boAt",
      price: 1199,
      originalPrice: 2499,
      discount: "52% off",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
      rating: 4.3
    },
    {
      id: 3,
      title: "Lakme Lipstick",
      brand: "Lakme",
      price: 299,
      originalPrice: 500,
      discount: "40% off",
      tag: "Best Seller",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
      rating: 4.4
    },
    {
      id: 4,
      title: "Smartwatch",
      brand: "Noise",
      price: 1999,
      originalPrice: 3999,
      discount: "50% off",
      tag: "Hot Deal",
      image: "https://images.unsplash.com/photo-1518441902110-79e2a4cfd7b9?w=400",
      rating: 4.2
    },
    {
      id: 5,
      title: "Face Cream",
      brand: "Nivea",
      price: 199,
      originalPrice: 299,
      discount: "33% off",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400",
      rating: 4.4
    },
    {
      id: 6,
      title: "Bluetooth Speaker",
      brand: "JBL",
      price: 2299,
      originalPrice: 3999,
      discount: "42% off",
      tag: "Limited",
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400",
      rating: 4.5
    },
    {
      id: 7,
      title: "Laptop i5",
      brand: "HP",
      price: 47999,
      originalPrice: 62999,
      discount: "24% off",
      tag: "Big Deal",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      rating: 4.6
    },
    {
      id: 8,
      title: "Perfume",
      brand: "Enchanteur",
      price: 499,
      originalPrice: 699,
      discount: "28% off",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
      rating: 4.3
    },
    {
      id: 9,
      title: "Gaming Mouse",
      brand: "Logitech",
      price: 799,
      originalPrice: 1499,
      discount: "46% off",
      tag: "Hot Deal",
      image: "https://images.unsplash.com/photo-1587202372775-ae97f4eeb3c5?w=400",
      rating: 4.5
    },
    {
      id: 10,
      title: "Sunscreen SPF 50",
      brand: "Lotus",
      price: 349,
      originalPrice: 499,
      discount: "30% off",
      tag: "Best Seller",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
      rating: 4.4
    }
  ];

  // ⭐ Stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} className="text-muted" />);
    }
    return stars;
  };

  // 🛒 Add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setToastMessage(`${product.title} added to cart`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // ❤️ Wishlist
  const handleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      setToastMessage(`${product.title} removed from wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      setToastMessage(`${product.title} added to wishlist`);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const isInWishlist = (id) => wishlist.some(item => item.id === id);

  return (
    <div style={{ background: '#f1f3f6', minHeight: '100vh', padding: '20px' }}>
      <Container fluid>

        {/* 🔥 Header */}
        <h3 className="mb-4">🔥 Today’s Best Deals</h3>

        <Row>
          {products.map(product => (
            <Col key={product.id} md={3} className="mb-4">
              <Card>

                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: '200px', objectFit: 'cover' }}
                />

                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <div className="text-muted">{product.brand}</div>

                  <div>{renderStars(product.rating)}</div>

                  <div>
                    <FaRupeeSign /> {product.price}
                    <span className="text-muted ms-2 text-decoration-line-through">
                      {product.originalPrice}
                    </span>
                  </div>

                  <Badge bg="success" className="me-2">{product.discount}</Badge>
                  <Badge bg="danger">{product.tag}</Badge>

                  <Button className="w-100 mt-2" onClick={() => handleAddToCart(product)}>
                    <FaShoppingCart /> Add to Cart
                  </Button>

                  <Button
                    variant="light"
                    className="w-100 mt-2"
                    onClick={() => handleWishlist(product)}
                  >
                    {isInWishlist(product.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                  </Button>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>

      {/* 🔔 Toast */}
      <Toast show={showToast} style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Home;