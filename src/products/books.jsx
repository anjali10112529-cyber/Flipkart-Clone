import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Container, Row, Col, Card, Button, Form, Toast, Badge } from 'react-bootstrap';
import { 
  FaRupeeSign, FaStar, FaRegStar, FaHeart, FaRegHeart, 
  FaShoppingCart, FaFilter 
} from 'react-icons/fa';

const Books = () => {
  const { addToCart } = useCart();

  const [filterPrice, setFilterPrice] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [wishlist, setWishlist] = useState([]);

  // ✅ Books Products
  const products = [
    { id: 1, title: "Rich Dad Poor Dad", brand: "Robert Kiyosaki", price: 399, originalPrice: 599, discount: "33% off", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400", rating: 4.7, category: "finance" },
    { id: 2, title: "Atomic Habits", brand: "James Clear", price: 499, originalPrice: 699, discount: "28% off", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400", rating: 4.8, category: "self-help" },
    { id: 3, title: "Harry Potter", brand: "J.K. Rowling", price: 699, originalPrice: 999, discount: "30% off", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400", rating: 4.9, category: "fiction" },
    { id: 4, title: "The Alchemist", brand: "Paulo Coelho", price: 299, originalPrice: 499, discount: "40% off", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400", rating: 4.6, category: "fiction" },
    { id: 5, title: "Think and Grow Rich", brand: "Napoleon Hill", price: 349, originalPrice: 499, discount: "30% off", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400", rating: 4.7, category: "finance" },
    { id: 6, title: "Ikigai", brand: "Hector Garcia", price: 399, originalPrice: 599, discount: "33% off", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400", rating: 4.6, category: "self-help" },
    { id: 7, title: "Wings of Fire", brand: "A.P.J Abdul Kalam", price: 299, originalPrice: 399, discount: "25% off", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400", rating: 4.8, category: "biography" },
    { id: 8, title: "The Power of Now", brand: "Eckhart Tolle", price: 449, originalPrice: 699, discount: "35% off", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400", rating: 4.7, category: "self-help" },
    { id: 9, title: "Zero to One", brand: "Peter Thiel", price: 399, originalPrice: 599, discount: "33% off", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400", rating: 4.5, category: "business" },
    { id: 10, title: "Steve Jobs", brand: "Walter Isaacson", price: 599, originalPrice: 899, discount: "33% off", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400", rating: 4.8, category: "biography" }
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

  // 🛒 Cart
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

  // 🔍 Filter
  let filteredProducts = [...products];

  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  if (filterPrice === 'under300') {
    filteredProducts = filteredProducts.filter(p => p.price < 300);
  } else if (filterPrice === '300-600') {
    filteredProducts = filteredProducts.filter(p => p.price >= 300 && p.price <= 600);
  } else if (filterPrice === 'above600') {
    filteredProducts = filteredProducts.filter(p => p.price > 600);
  }

  // 🔄 Sort
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

              <h6 className="mt-3">Category</h6>
              {['all','fiction','self-help','finance','biography','business'].map(cat => (
                <Form.Check
                  key={cat}
                  type="radio"
                  label={cat}
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
              ))}

              <h6 className="mt-3">Price</h6>
              <Form.Check label="All" type="radio" onChange={()=>setFilterPrice('')} />
              <Form.Check label="Under ₹300" type="radio" onChange={()=>setFilterPrice('under300')} />
              <Form.Check label="₹300 - ₹600" type="radio" onChange={()=>setFilterPrice('300-600')} />
              <Form.Check label="Above ₹600" type="radio" onChange={()=>setFilterPrice('above600')} />
            </div>
          </Col>

          {/* Products */}
          <Col md={9} lg={10}>
            <div className="d-flex justify-content-between mb-3">
              <h4>Books Collection</h4>

              <Form.Select style={{ width: '200px' }} onChange={(e)=>setSortBy(e.target.value)}>
                <option value="popularity">Popularity</option>
                <option value="priceLowHigh">Low to High</option>
                <option value="priceHighLow">High to Low</option>
                <option value="rating">Rating</option>
              </Form.Select>
            </div>

            <Row>
              {filteredProducts.map(product => (
                <Col key={product.id} md={4} className="mb-4">
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

                      <Badge bg="success">{product.discount}</Badge>

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
          </Col>

        </Row>
      </Container>

      {/* Toast */}
      <Toast show={showToast} style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Books;