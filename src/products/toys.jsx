import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Container, Row, Col, Card, Button, Form, Toast, Badge } from 'react-bootstrap';
import { 
  FaRupeeSign, FaStar, FaRegStar, FaHeart, FaRegHeart, 
  FaShoppingCart, FaFilter 
} from 'react-icons/fa';

const Toys = () => {
  const { addToCart } = useCart();

  const [filterPrice, setFilterPrice] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [wishlist, setWishlist] = useState([]);

  // ✅ Toys Products
  const products = [
    { id: 1, title: "Remote Control Car", brand: "Hot Wheels", price: 999, originalPrice: 1499, discount: "33% off", image: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=400", rating: 4.3, category: "vehicles" },
    { id: 2, title: "Teddy Bear", brand: "Funskool", price: 499, originalPrice: 799, discount: "38% off", image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400", rating: 4.5, category: "soft-toys" },
    { id: 3, title: "Lego Building Blocks", brand: "LEGO", price: 1999, originalPrice: 2499, discount: "20% off", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400", rating: 4.7, category: "educational" },
    { id: 4, title: "Puzzle Game", brand: "Skillmatics", price: 299, originalPrice: 499, discount: "40% off", image: "https://images.unsplash.com/photo-1616628182509-3fdf6e5e8536?w=400", rating: 4.2, category: "educational" },
    { id: 5, title: "Doll Set", brand: "Barbie", price: 1499, originalPrice: 1999, discount: "25% off", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400", rating: 4.4, category: "dolls" },
    { id: 6, title: "Toy Train", brand: "Fisher-Price", price: 899, originalPrice: 1299, discount: "30% off", image: "https://images.unsplash.com/photo-1608889175119-3f8e0f4e9f87?w=400", rating: 4.3, category: "vehicles" },
    { id: 7, title: "Action Figure", brand: "Marvel", price: 799, originalPrice: 1199, discount: "33% off", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400", rating: 4.5, category: "action-figures" },
    { id: 8, title: "Board Game", brand: "Hasbro", price: 699, originalPrice: 999, discount: "30% off", image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400", rating: 4.6, category: "educational" },
    { id: 9, title: "Rubik's Cube", brand: "Cubelelo", price: 199, originalPrice: 299, discount: "33% off", image: "https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?w=400", rating: 4.4, category: "educational" },
    { id: 10, title: "Kids Bicycle", brand: "Hero", price: 4999, originalPrice: 6500, discount: "23% off", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400", rating: 4.5, category: "outdoor" }
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

  if (filterPrice === 'under500') {
    filteredProducts = filteredProducts.filter(p => p.price < 500);
  } else if (filterPrice === '500-2000') {
    filteredProducts = filteredProducts.filter(p => p.price >= 500 && p.price <= 2000);
  } else if (filterPrice === 'above2000') {
    filteredProducts = filteredProducts.filter(p => p.price > 2000);
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
              {['all','vehicles','soft-toys','educational','dolls','action-figures','outdoor'].map(cat => (
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
              <Form.Check label="Under ₹500" type="radio" onChange={()=>setFilterPrice('under500')} />
              <Form.Check label="₹500 - ₹2000" type="radio" onChange={()=>setFilterPrice('500-2000')} />
              <Form.Check label="Above ₹2000" type="radio" onChange={()=>setFilterPrice('above2000')} />
            </div>
          </Col>

          {/* Products */}
          <Col md={9} lg={10}>
            <div className="d-flex justify-content-between mb-3">
              <h4>Toys & Games</h4>

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

export default Toys;