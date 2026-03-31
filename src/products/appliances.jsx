import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Container, Row, Col, Card, Button, Form, Toast, Badge } from 'react-bootstrap';
import { 
  FaRupeeSign, FaStar, FaRegStar, FaHeart, FaRegHeart, 
  FaShoppingCart, FaFilter 
} from 'react-icons/fa';

const Appliances = () => {
  const { addToCart } = useCart();

  const [filterPrice, setFilterPrice] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [wishlist, setWishlist] = useState([]);

  // ✅ Appliances Products (Stable Images)
  const products = [
    { id: 1, title: "Refrigerator", brand: "LG", price: 24999, originalPrice: 30000, discount: "17% off", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400", rating: 4.5, category: "kitchen" },
    { id: 2, title: "Washing Machine", brand: "Samsung", price: 18999, originalPrice: 23000, discount: "17% off", image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400", rating: 4.4, category: "home" },
    { id: 3, title: "Microwave Oven", brand: "IFB", price: 8999, originalPrice: 12000, discount: "25% off", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400", rating: 4.3, category: "kitchen" },
    { id: 4, title: "Air Conditioner", brand: "Voltas", price: 32999, originalPrice: 40000, discount: "18% off", image: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb6?w=400", rating: 4.6, category: "home" },
    { id: 5, title: "Electric Kettle", brand: "Philips", price: 1499, originalPrice: 2000, discount: "25% off", image: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=400", rating: 4.5, category: "kitchen" },
    { id: 6, title: "Induction Cooktop", brand: "Prestige", price: 1999, originalPrice: 3000, discount: "33% off", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400", rating: 4.3, category: "kitchen" },
    { id: 7, title: "Mixer Grinder", brand: "Bajaj", price: 3499, originalPrice: 5000, discount: "30% off", image: "https://images.unsplash.com/photo-1598514982418-8c1a6f1d2a7d?w=400", rating: 4.4, category: "kitchen" },
    { id: 8, title: "Ceiling Fan", brand: "Havells", price: 2499, originalPrice: 3500, discount: "28% off", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400", rating: 4.2, category: "home" },
    { id: 9, title: "Water Purifier", brand: "Kent", price: 12999, originalPrice: 16000, discount: "19% off", image: "https://images.unsplash.com/photo-1621264448270-3a4d3c77c7d3?w=400", rating: 4.5, category: "home" },
    { id: 10, title: "Room Heater", brand: "Orpat", price: 1999, originalPrice: 2500, discount: "20% off", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400", rating: 4.3, category: "home" }
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

  if (filterPrice === 'under3000') {
    filteredProducts = filteredProducts.filter(p => p.price < 3000);
  } else if (filterPrice === '3000-15000') {
    filteredProducts = filteredProducts.filter(p => p.price >= 3000 && p.price <= 15000);
  } else if (filterPrice === 'above15000') {
    filteredProducts = filteredProducts.filter(p => p.price > 15000);
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
              {['all','kitchen','home'].map(cat => (
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
              <Form.Check label="Under ₹3000" type="radio" onChange={()=>setFilterPrice('under3000')} />
              <Form.Check label="₹3000 - ₹15000" type="radio" onChange={()=>setFilterPrice('3000-15000')} />
              <Form.Check label="Above ₹15000" type="radio" onChange={()=>setFilterPrice('above15000')} />
            </div>
          </Col>

          {/* Products */}
          <Col md={9} lg={10}>
            <div className="d-flex justify-content-between mb-3">
              <h4>Home Appliances</h4>

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

export default Appliances;