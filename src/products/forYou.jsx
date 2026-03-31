import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Container, Row, Col, Card, Button, Form, Toast, Badge } from 'react-bootstrap';
import { 
  FaRupeeSign, FaStar, FaRegStar, FaHeart, FaRegHeart, FaShoppingCart, 
  FaFilter, FaSort, FaTimes, FaShareAlt, FaTruck, FaShieldAlt 
} from 'react-icons/fa';

const ForYou = () => {
  const [filterPrice, setFilterPrice] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

 

  // Products with reliable image URLs (using placeholder images with actual product photos)
  const products = [
    // Fashion Products
    { id: 1, title: "Men's Casual Cotton Shirt", brand: "Roadster", price: 999, originalPrice: 1999, discount: "50% off", image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?w=300&h=300&fit=crop", rating: 4.3, reviews: 1245, category: "fashion", inStock: true },
    { id: 2, title: "Women's Floral Maxi Dress", brand: "Biba", price: 1499, originalPrice: 3499, discount: "57% off", image: "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?w=300&h=300&fit=crop", rating: 4.5, reviews: 2341, category: "fashion", inStock: true },
    { id: 3, title: "Running Sports Shoes", brand: "Puma", price: 1299, originalPrice: 2999, discount: "56% off", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=300&h=300&fit=crop", rating: 4.2, reviews: 3421, category: "fashion", inStock: true },
    { id: 4, title: "Leather Wallet", brand: "American Tourister", price: 499, originalPrice: 1299, discount: "61% off", image: "https://images.pexels.com/photos/1627417/pexels-photo-1627417.jpeg?w=300&h=300&fit=crop", rating: 4.4, reviews: 892, category: "fashion", inStock: true },
    
    // Beauty Products
    { id: 5, title: "Matte Lipstick Set", brand: "Maybelline", price: 599, originalPrice: 1299, discount: "53% off", image: "https://images.pexels.com/photos/3240265/pexels-photo-3240265.jpeg?w=300&h=300&fit=crop", rating: 4.4, reviews: 2341, category: "beauty", inStock: true },
    { id: 6, title: "Face Wash", brand: "Cetaphil", price: 399, originalPrice: 699, discount: "42% off", image: "https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?w=300&h=300&fit=crop", rating: 4.5, reviews: 1876, category: "beauty", inStock: true },
    { id: 7, title: "Perfume for Men", brand: "Davidoff", price: 2499, originalPrice: 4999, discount: "50% off", image: "https://images.pexels.com/photos/965324/pexels-photo-965324.jpeg?w=300&h=300&fit=crop", rating: 4.6, reviews: 987, category: "beauty", inStock: true },
    { id: 8, title: "Hair Dryer", brand: "Philips", price: 1499, originalPrice: 2999, discount: "50% off", image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?w=300&h=300&fit=crop", rating: 4.4, reviews: 1234, category: "beauty", inStock: true },
    { id: 9, title: "Nail Polish Set", brand: "Nykaa", price: 399, originalPrice: 999, discount: "60% off", image: "https://images.pexels.com/photos/3069719/pexels-photo-3069719.jpeg?w=300&h=300&fit=crop", rating: 4.2, reviews: 876, category: "beauty", inStock: true },
    { id: 10, title: "Kajal", brand: "Maybelline", price: 199, originalPrice: 399, discount: "50% off", image: "https://images.pexels.com/photos/3240265/pexels-photo-3240265.jpeg?w=300&h=300&fit=crop", rating: 4.5, reviews: 3456, category: "beauty", inStock: true },
    { id: 11, title: "Face Mask Pack", brand: "The Body Shop", price: 499, originalPrice: 999, discount: "50% off", image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?w=300&h=300&fit=crop", rating: 4.3, reviews: 987, category: "beauty", inStock: true },
    
    // Books
    { id: 12, title: "The Psychology of Money", author: "Morgan Housel", price: 299, originalPrice: 599, discount: "50% off", image: "https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?w=300&h=300&fit=crop", rating: 4.7, reviews: 4567, category: "books", inStock: true },
    { id: 13, title: "Atomic Habits", author: "James Clear", price: 399, originalPrice: 799, discount: "50% off", image: "https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?w=300&h=300&fit=crop", rating: 4.8, reviews: 5678, category: "books", inStock: true },
    
    // Electronics
    { id: 14, title: "Smart Watch", brand: "Noise", price: 2499, originalPrice: 4999, discount: "50% off", image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?w=300&h=300&fit=crop", rating: 4.3, reviews: 4567, category: "electronics", inStock: true },
    { id: 15, title: "Wireless Earbuds", brand: "Boat", price: 1499, originalPrice: 2999, discount: "50% off", image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?w=300&h=300&fit=crop", rating: 4.4, reviews: 5678, category: "electronics", inStock: true }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-muted" />);
    }
    return stars;
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setToastMessage(`${product.title} added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

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

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Filter products
  let filteredProducts = [...products];
  
  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }
  
  if (filterPrice === 'under500') {
    filteredProducts = filteredProducts.filter(p => p.price < 500);
  } else if (filterPrice === '500-1000') {
    filteredProducts = filteredProducts.filter(p => p.price >= 500 && p.price <= 1000);
  } else if (filterPrice === '1000-2000') {
    filteredProducts = filteredProducts.filter(p => p.price >= 1000 && p.price <= 2000);
  } else if (filterPrice === '2000-3000') {
    filteredProducts = filteredProducts.filter(p => p.price >= 2000 && p.price <= 3000);
  } else if (filterPrice === 'above2000') {
    filteredProducts = filteredProducts.filter(p => p.price > 2000);
  }

  // Sort products
  if (sortBy === 'priceLowHigh') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceHighLow') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="foryou-page" style={{ backgroundColor: '#f1f3f6', minHeight: '100vh' }}>
      <Container fluid className="mt-3">
        <Row>
          {/* Sidebar Filters */}
          <Col md={3} lg={2} className="sidebar-filters">
            <div className="filter-section" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <h5><FaFilter className="me-2" /> Filters</h5>
              
              <div className="filter-group mb-4">
                <h6>Category</h6>
                <Form.Check type="radio" label="All Products" name="category" value="all" checked={selectedCategory === 'all'} onChange={(e) => setSelectedCategory(e.target.value)} />
                <Form.Check type="radio" label="Fashion" name="category" value="fashion" checked={selectedCategory === 'fashion'} onChange={(e) => setSelectedCategory(e.target.value)} />
                <Form.Check type="radio" label="Beauty" name="category" value="beauty" checked={selectedCategory === 'beauty'} onChange={(e) => setSelectedCategory(e.target.value)} />
                <Form.Check type="radio" label="Books" name="category" value="books" checked={selectedCategory === 'books'} onChange={(e) => setSelectedCategory(e.target.value)} />
                <Form.Check type="radio" label="Electronics" name="category" value="electronics" checked={selectedCategory === 'electronics'} onChange={(e) => setSelectedCategory(e.target.value)} />
              </div>

              <div className="filter-group mb-4">
                <h6>Price Range</h6>
                <Form.Check type="radio" label="All" name="price" value="" checked={filterPrice === ''} onChange={(e) => setFilterPrice(e.target.value)} />
                <Form.Check type="radio" label="Under ₹500" name="price" value="under500" checked={filterPrice === 'under500'} onChange={(e) => setFilterPrice(e.target.value)} />
                <Form.Check type="radio" label="₹500 - ₹1000" name="price" value="500-1000" checked={filterPrice === '500-1000'} onChange={(e) => setFilterPrice(e.target.value)} />
                <Form.Check type="radio" label="₹1000 - ₹2000" name="price" value="1000-2000" checked={filterPrice === '1000-2000'} onChange={(e) => setFilterPrice(e.target.value)} />
                <Form.Check type="radio" label="₹2000 - ₹3000" name="price" value="2000-3000" checked={filterPrice === '2000-3000'} onChange={(e) => setFilterPrice(e.target.value)} />
                <Form.Check type="radio" label="Above ₹3000" name="price" value="above2000" checked={filterPrice === 'above2000'} onChange={(e) => setFilterPrice(e.target.value)} />
              </div>

              <div className="filter-group">
                <h6>Customer Rating</h6>
                <Form.Check type="checkbox" label="4★ & above" />
                <Form.Check type="checkbox" label="3★ & above" />
                <Form.Check type="checkbox" label="2★ & above" />
              </div>
            </div>
          </Col>

          {/* Products Grid */}
          <Col md={9} lg={10}>
            <div className="products-header" style={{ backgroundColor: 'white', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px' }}>
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h4 className="mb-0">Recommended For You</h4>
                  <p className="text-muted mb-0">Showing {filteredProducts.length} products</p>
                </div>
                <div className="sort-section d-flex align-items-center">
                  <FaSort className="me-2" />
                  <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ width: 'auto' }}>
                    <option value="popularity">Sort by: Popularity</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="priceHighLow">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </Form.Select>
                </div>
              </div>
            </div>

            <Row className="g-4">
              {filteredProducts.map(product => (
                <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
                  <Card className="product-card h-100" style={{ border: 'none', borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer' }}>
                    <div className="product-image-wrapper" style={{ position: 'relative', overflow: 'hidden', padding: '20px', backgroundColor: '#f8f9fa' }}>
                      <Card.Img 
                        variant="top" 
                        src={product.image} 
                        style={{ height: '200px', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200x200?text=Product+Image';
                        }}
                      />
                      {product.discount && (
                        <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#fb641b', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                          {product.discount}
                        </span>
                      )}
                      <Badge bg="danger" style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '11px' }}>HOT DEAL</Badge>
                      <button 
                        style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'white', border: 'none', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        onClick={() => handleWishlist(product)}
                      >
                        {isInWishlist(product.id) ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
                      </button>
                    </div>
                    <Card.Body>
                      <Card.Title style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>{product.title}</Card.Title>
                      <div className="text-muted small">{product.brand || product.author}</div>
                      <div className="mt-2">
                        {renderStars(product.rating)}
                        <span className="ms-1 text-muted small">({product.reviews})</span>
                      </div>
                      <div className="mt-2">
                        <span style={{ fontSize: '16px', fontWeight: '700' }}>
                          <FaRupeeSign style={{ fontSize: '12px' }} />{product.price.toLocaleString()}
                        </span>
                        <span className="text-muted text-decoration-line-through ms-2">
                          <FaRupeeSign style={{ fontSize: '12px' }} />{product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2">
                        <FaTruck className="text-success me-1" />
                        <small className="text-success">Free Delivery</small>
                        <FaShieldAlt className="text-success ms-2 me-1" />
                        <small className="text-success">1 Year Warranty</small>
                      </div>
                      <Button 
                        variant="primary" 
                        className="w-100 mt-3"
                        style={{ backgroundColor: '#fb641b', borderColor: '#fb641b' }}
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaShoppingCart className="me-2" /> Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Toast Notification */}
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, minWidth: '250px' }}
        delay={2000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Flipkart</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ForYou;