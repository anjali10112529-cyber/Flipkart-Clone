import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Container, Row, Col, Card, Button, Form, Toast, Badge } from 'react-bootstrap';
import { 
  FaRupeeSign, FaStar, FaRegStar, FaHeart, FaRegHeart, FaShoppingCart, 
  FaFilter, FaSort, FaTruck, FaShieldAlt 
} from 'react-icons/fa';

const Fashion = () => {
  const { addToCart } = useCart();
  const [filterPrice, setFilterPrice] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [wishlist, setWishlist] = useState([]);

  // Dress Products Only with working image URLs
  const products = [
    // Women's Dresses
    { id: 1, title: "Floral Print Maxi Dress", brand: "Biba", price: 1499, originalPrice: 3499, discount: "57% off", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop", rating: 4.5, reviews: 2341, category: "women", inStock: true, size: ["S", "M", "L", "XL"] },
    { id: 2, title: "Red Velvet Party Dress", brand: "Global Desi", price: 2499, originalPrice: 5999, discount: "58% off", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300&h=300&fit=crop", rating: 4.6, reviews: 1876, category: "women", inStock: true, size: ["S", "M", "L"] },
    { id: 3, title: "Casual Cotton Dress", brand: "Fabindia", price: 999, originalPrice: 1999, discount: "50% off", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop", rating: 4.3, reviews: 3456, category: "women", inStock: true, size: ["M", "L", "XL"] },
    { id: 4, title: "Black Bodycon Dress", brand: "H&M", price: 1299, originalPrice: 2999, discount: "56% off", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=300&h=300&fit=crop", rating: 4.4, reviews: 2345, category: "women", inStock: true, size: ["S", "M", "L"] },
    { id: 5, title: "Anarkali Kurta", brand: "Manyavar", price: 1999, originalPrice: 4999, discount: "60% off", image: "https://images.unsplash.com/photo-1617625802912-cde5867ffd81?w=300&h=300&fit=crop", rating: 4.7, reviews: 4567, category: "women", inStock: true, size: ["S", "M", "L", "XL"] },
    { id: 6, title: "Summer Beach Dress", brand: "Roadster", price: 799, originalPrice: 1599, discount: "50% off", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=300&fit=crop", rating: 4.2, reviews: 1234, category: "women", inStock: true, size: ["XS", "S", "M"] },
    
    // Men's Dresses/Outfits
    { id: 7, title: "Men's Casual Shirt", brand: "Louis Philippe", price: 1299, originalPrice: 2999, discount: "56% off", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop", rating: 4.4, reviews: 3456, category: "men", inStock: true, size: ["S", "M", "L", "XL"] },
    { id: 8, title: "Men's Formal Suit", brand: "Raymond", price: 8999, originalPrice: 19999, discount: "55% off", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&h=300&fit=crop", rating: 4.8, reviews: 2341, category: "men", inStock: true, size: ["M", "L", "XL"] },
    { id: 9, title: "Men's Polo T-Shirt", brand: "US Polo", price: 899, originalPrice: 1999, discount: "55% off", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&h=300&fit=crop", rating: 4.3, reviews: 4567, category: "men", inStock: true, size: ["S", "M", "L", "XL"] },
    { id: 10, title: "Men's Denim Jacket", brand: "Levis", price: 2499, originalPrice: 5999, discount: "58% off", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=300&h=300&fit=crop", rating: 4.6, reviews: 2345, category: "men", inStock: true, size: ["M", "L", "XL"] },
    
    // Kids Dresses
    { id: 11, title: "Girls Party Dress", brand: "Gini & Jony", price: 899, originalPrice: 1999, discount: "55% off", image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=300&h=300&fit=crop", rating: 4.5, reviews: 1234, category: "kids", inStock: true, size: ["2-3Y", "3-4Y", "4-5Y"] },
    { id: 12, title: "Boys Casual Outfit", brand: "United Colors", price: 999, originalPrice: 2499, discount: "60% off", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&h=300&fit=crop", rating: 4.4, reviews: 987, category: "kids", inStock: true, size: ["2-3Y", "3-4Y", "4-5Y"] },
    
    // Traditional Wear
    { id: 13, title: "Lehenga Choli", brand: "Ritu Kumar", price: 4999, originalPrice: 14999, discount: "66% off", image: "https://images.unsplash.com/photo-1583391733956-6c182fb67eb3?w=300&h=300&fit=crop", rating: 4.9, reviews: 876, category: "traditional", inStock: true, size: ["S", "M", "L"] },
    { id: 14, title: "Sherwani for Men", brand: "Manyavar", price: 7999, originalPrice: 24999, discount: "68% off", image: "https://images.unsplash.com/photo-1600185365384-1a8b3b3b8b3b?w=300&h=300&fit=crop", rating: 4.8, reviews: 654, category: "traditional", inStock: true, size: ["M", "L", "XL"] },
    { id: 15, title: "Kurti for Women", brand: "W", price: 699, originalPrice: 1599, discount: "56% off", image: "https://images.unsplash.com/photo-1617625802912-cde5867ffd81?w=300&h=300&fit=crop", rating: 4.3, reviews: 2345, category: "traditional", inStock: true, size: ["S", "M", "L", "XL"] },
    
    // Winter Wear
    { id: 16, title: "Women's Sweater", brand: "Forever 21", price: 999, originalPrice: 2499, discount: "60% off", image: "https://images.unsplash.com/photo-1434389674359-7500f7121052?w=300&h=300&fit=crop", rating: 4.4, reviews: 1567, category: "winter", inStock: true, size: ["S", "M", "L"] },
    { id: 17, title: "Men's Hoodie", brand: "HRX", price: 1299, originalPrice: 2999, discount: "56% off", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop", rating: 4.5, reviews: 2341, category: "winter", inStock: true, size: ["M", "L", "XL"] }
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
    addToCart(product);
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
  } else if (filterPrice === '2000-5000') {
    filteredProducts = filteredProducts.filter(p => p.price >= 2000 && p.price <= 5000);
  } else if (filterPrice === 'above5000') {
    filteredProducts = filteredProducts.filter(p => p.price > 5000);
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
    <div style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', padding: '20px' }}>
      <Container fluid>
        <Row>
          {/* Sidebar Filters */}
          <Col md={3} lg={2} className="mb-4">
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <h5><FaFilter className="me-2" /> Filters</h5>
              
              <div className="mb-4">
                <h6>Category</h6>
                <Form.Check type="radio" label="All Dresses" name="category" value="all" checked={selectedCategory === 'all'} onChange={(e) => setSelectedCategory(e.target.value)} />
                <Form.Check type="radio" label="Women's Wear" name="category" value="women" checked={selectedCategory === 'women'} onChange={(e) => setSelectedCategory(e.target.value)} />
                <Form.Check type="radio" label="Men's Wear" name="category" value="men" checked={selectedCategory === 'men'} onChange={(e) => setSelectedCategory(e.target.value)} />
                <Form.Check type="radio" label="Kids Wear" name="category" value="kids" checked={selectedCategory === 'kids'} onChange={(e) => setSelectedCategory(e.target.value)} />
                <Form.Check type="radio" label="Traditional Wear" name="category" value="traditional" checked={selectedCategory === 'traditional'} onChange={(e) => setSelectedCategory(e.target.value)} />
                <Form.Check type="radio" label="Winter Wear" name="category" value="winter" checked={selectedCategory === 'winter'} onChange={(e) => setSelectedCategory(e.target.value)} />
              </div>

              <div className="mb-4">
                <h6>Price Range</h6>
                <Form.Check type="radio" label="All" name="price" value="" checked={filterPrice === ''} onChange={(e) => setFilterPrice(e.target.value)} />
                <Form.Check type="radio" label="Under ₹500" name="price" value="under500" checked={filterPrice === 'under500'} onChange={(e) => setFilterPrice(e.target.value)} />
                <Form.Check type="radio" label="₹500 - ₹1000" name="price" value="500-1000" checked={filterPrice === '500-1000'} onChange={(e) => setFilterPrice(e.target.value)} />
                <Form.Check type="radio" label="₹1000 - ₹2000" name="price" value="1000-2000" checked={filterPrice === '1000-2000'} onChange={(e) => setFilterPrice(e.target.value)} />
                <Form.Check type="radio" label="₹2000 - ₹5000" name="price" value="2000-5000" checked={filterPrice === '2000-5000'} onChange={(e) => setFilterPrice(e.target.value)} />
                <Form.Check type="radio" label="Above ₹5000" name="price" value="above5000" checked={filterPrice === 'above5000'} onChange={(e) => setFilterPrice(e.target.value)} />
              </div>
            </div>
          </Col>

          {/* Products Grid */}
          <Col md={9} lg={10}>
            <div style={{ backgroundColor: 'white', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px' }}>
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h4 className="mb-0">Fashion Collection</h4>
                  <p className="text-muted mb-0">Showing {filteredProducts.length} dresses & outfits</p>
                </div>
                <div className="d-flex align-items-center">
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
                  <Card className="h-100" style={{ border: 'none', borderRadius: '8px', transition: 'all 0.3s ease' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', padding: '20px', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
                      <Card.Img 
                        variant="top" 
                        src={product.image} 
                        style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Fashion+Product';
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
                      <div className="text-muted small">{product.brand}</div>
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
                      <div className="mt-1">
                        <small className="text-muted">Size: {product.size.join(', ')}</small>
                      </div>
                      <div className="mt-2">
                        <FaTruck className="text-success me-1" />
                        <small className="text-success">Free Delivery</small>
                        <FaShieldAlt className="text-success ms-2 me-1" />
                        <small className="text-success">7 Days Return</small>
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

export default Fashion;