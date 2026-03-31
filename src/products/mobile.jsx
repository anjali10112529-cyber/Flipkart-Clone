import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Container, Row, Col, Card, Button, Form, Toast, Badge } from 'react-bootstrap';
import { 
  FaRupeeSign, FaStar, FaRegStar, FaHeart, FaRegHeart, 
  FaShoppingCart, FaFilter, FaSort 
} from 'react-icons/fa';

const Mobile = () => {
  const { addToCart } = useCart();

  const [filterPrice, setFilterPrice] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [wishlist, setWishlist] = useState([]);

  // Mobile Products
  const products = [
    {
      id: 1,
      title: "iPhone 14",
      brand: "Apple",
      price: 69999,
      originalPrice: 79999,
      discount: "12% off",
      image: "https://images.unsplash.com/photo-1664478546384-9b9a9f56c7cc?w=300",
      rating: 4.7,
      reviews: 2345
    },
    {
      id: 2,
      title: "Samsung Galaxy S23",
      brand: "Samsung",
      price: 64999,
      originalPrice: 74999,
      discount: "13% off",
      image: "https://images.unsplash.com/photo-1678911820864-e7d7c3bb3c3c?w=300",
      rating: 4.6,
      reviews: 1987
    },
    {
      id: 3,
      title: "Redmi Note 12 Pro",
      brand: "Xiaomi",
      price: 21999,
      originalPrice: 25999,
      discount: "15% off",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300",
      rating: 4.4,
      reviews: 5432
    },
    {
      id: 4,
      title: "Realme Narzo 60",
      brand: "Realme",
      price: 17999,
      originalPrice: 20999,
      discount: "14% off",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300",
      rating: 4.3,
      reviews: 3211
    },
    {
      id: 5,
      title: "OnePlus Nord CE 3",
      brand: "OnePlus",
      price: 24999,
      originalPrice: 28999,
      discount: "13% off",
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300",
      rating: 4.5,
      reviews: 2789
    },
    {
      id: 6,
      title: "Vivo V27",
      brand: "Vivo",
      price: 32999,
      originalPrice: 36999,
      discount: "10% off",
      image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300",
      rating: 4.4,
      reviews: 2100
    }
  ];

  // ⭐ Render Stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaRegStar key={i} className="text-muted" />);
    }

    return stars;
  };

  // 🛒 Add to Cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setToastMessage(`${product.title} added to cart!`);
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

  // 🔍 Filtering
  let filteredProducts = [...products];

  if (selectedBrand !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.brand === selectedBrand);
  }

  if (filterPrice === 'under20000') {
    filteredProducts = filteredProducts.filter(p => p.price < 20000);
  } else if (filterPrice === '20000-40000') {
    filteredProducts = filteredProducts.filter(p => p.price >= 20000 && p.price <= 40000);
  } else if (filterPrice === 'above40000') {
    filteredProducts = filteredProducts.filter(p => p.price > 40000);
  }

  // 🔄 Sorting
  if (sortBy === 'priceLowHigh') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceHighLow') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', padding: '20px' }}>
      <Container fluid>
        <Row>

          {/* Sidebar */}
          <Col md={3} lg={2}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
              <h5><FaFilter /> Filters</h5>

              <h6 className="mt-3">Brand</h6>
              {['all','Apple','Samsung','Xiaomi','Realme','OnePlus','Vivo'].map(b => (
                <Form.Check
                  key={b}
                  type="radio"
                  label={b}
                  value={b}
                  name="brand"
                  checked={selectedBrand === b}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                />
              ))}

              <h6 className="mt-3">Price</h6>
              <Form.Check label="All" type="radio" name="price" value="" onChange={(e)=>setFilterPrice(e.target.value)} />
              <Form.Check label="Under ₹20K" type="radio" name="price" value="under20000" onChange={(e)=>setFilterPrice(e.target.value)} />
              <Form.Check label="₹20K - ₹40K" type="radio" name="price" value="20000-40000" onChange={(e)=>setFilterPrice(e.target.value)} />
              <Form.Check label="Above ₹40K" type="radio" name="price" value="above40000" onChange={(e)=>setFilterPrice(e.target.value)} />
            </div>
          </Col>

          {/* Products */}
          <Col md={9} lg={10}>
            <div className="d-flex justify-content-between mb-3">
              <h4>Mobile Collection</h4>

              <Form.Select style={{ width: '200px' }} onChange={(e)=>setSortBy(e.target.value)}>
                <option value="popularity">Sort by Popularity</option>
                <option value="priceLowHigh">Low to High</option>
                <option value="priceHighLow">High to Low</option>
                <option value="rating">Rating</option>
              </Form.Select>
            </div>

            <Row>
              {filteredProducts.map(product => (
                <Col key={product.id} md={4} className="mb-4">
                  <Card>
                    <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} />

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

                      <Badge bg="success">{product.discount}</Badge>

                      <Button
                        className="w-100 mt-2"
                        onClick={() => handleAddToCart(product)}
                      >
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
          </Col>
        </Row>
      </Container>

      {/* Toast */}
      <Toast
        show={showToast}
        style={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Mobile;