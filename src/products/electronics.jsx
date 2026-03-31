import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Container, Row, Col, Card, Button, Form, Toast, Badge } from 'react-bootstrap';
import { 
  FaRupeeSign, FaStar, FaRegStar, FaHeart, FaRegHeart, 
  FaShoppingCart, FaFilter 
} from 'react-icons/fa';

const Electronics = () => {
  const { addToCart } = useCart();

  const [filterPrice, setFilterPrice] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [wishlist, setWishlist] = useState([]);

  // ✅ ELECTRONICS PRODUCTS
  const products = [
    { id: 1, title: "Smartphone 5G", brand: "Xiaomi", price: 14999, originalPrice: 18999, discount: "21% off", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400", rating: 4.5, category: "mobile" },
    { id: 2, title: "Wireless Earbuds", brand: "boAt", price: 1299, originalPrice: 2499, discount: "48% off", image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400", rating: 4.3, category: "audio" },
    { id: 3, title: "Bluetooth Speaker", brand: "JBL", price: 2499, originalPrice: 3999, discount: "38% off", image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400", rating: 4.4, category: "audio" },
    { id: 4, title: "Laptop i5", brand: "HP", price: 49999, originalPrice: 62999, discount: "20% off", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", rating: 4.6, category: "laptop" },
    { id: 5, title: "Smartwatch", brand: "Noise", price: 1999, originalPrice: 3999, discount: "50% off", image: "https://images.unsplash.com/photo-1518441902110-79e2a4cfd7b9?w=400", rating: 4.2, category: "wearable" },
    { id: 6, title: "Gaming Mouse", brand: "Logitech", price: 799, originalPrice: 1499, discount: "46% off", image: "https://images.unsplash.com/photo-1587202372775-ae97f4eeb3c5?w=400", rating: 4.5, category: "accessories" },
    { id: 7, title: "Mechanical Keyboard", brand: "Redragon", price: 2499, originalPrice: 3999, discount: "38% off", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", rating: 4.6, category: "accessories" },
    { id: 8, title: "Power Bank 20000mAh", brand: "Ambrane", price: 1299, originalPrice: 1999, discount: "35% off", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400", rating: 4.3, category: "accessories" },
    { id: 9, title: "Smart TV 43 inch", brand: "Samsung", price: 29999, originalPrice: 39999, discount: "25% off", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400", rating: 4.7, category: "tv" },
    { id: 10, title: "Tablet", brand: "Lenovo", price: 15999, originalPrice: 19999, discount: "20% off", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", rating: 4.4, category: "tablet" },

    { id: 11, title: "DSLR Camera", brand: "Canon", price: 45999, originalPrice: 55999, discount: "18% off", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400", rating: 4.6, category: "camera" },
    { id: 12, title: "Gaming Headset", brand: "HyperX", price: 3499, originalPrice: 4999, discount: "30% off", image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400", rating: 4.5, category: "audio" },
    { id: 13, title: "WiFi Router", brand: "TP-Link", price: 1499, originalPrice: 2499, discount: "40% off", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400", rating: 4.3, category: "network" },
    { id: 14, title: "External HDD 1TB", brand: "Seagate", price: 3499, originalPrice: 4999, discount: "30% off", image: "https://images.unsplash.com/photo-1587202372775-ae97f4eeb3c5?w=400", rating: 4.6, category: "storage" },
    { id: 15, title: "USB Drive 64GB", brand: "SanDisk", price: 599, originalPrice: 999, discount: "40% off", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400", rating: 4.4, category: "storage" },

    { id: 16, title: "Smart Bulb", brand: "Wipro", price: 499, originalPrice: 999, discount: "50% off", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400", rating: 4.2, category: "smart-home" },
    { id: 17, title: "Induction Stove", brand: "Prestige", price: 1999, originalPrice: 2999, discount: "33% off", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400", rating: 4.3, category: "appliance" },
    { id: 18, title: "Electric Kettle", brand: "Philips", price: 1499, originalPrice: 2499, discount: "40% off", image: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=400", rating: 4.5, category: "appliance" },
    { id: 19, title: "Security Camera", brand: "Mi", price: 2999, originalPrice: 3999, discount: "25% off", image: "https://images.unsplash.com/photo-1581091215367-59ab6b3c6b54?w=400", rating: 4.4, category: "smart-home" },
    { id: 20, title: "Fitness Band", brand: "Realme", price: 1499, originalPrice: 2499, discount: "40% off", image: "https://images.unsplash.com/photo-1518441902110-79e2a4cfd7b9?w=400", rating: 4.3, category: "wearable" }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) stars.push(<FaStar key={i} className="text-warning" />);
    while (stars.length < 5) stars.push(<FaRegStar key={stars.length} className="text-muted" />);
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

  const isInWishlist = (id) => wishlist.some(item => item.id === id);

  let filteredProducts = [...products];

  if (selectedCategory !== 'all') filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  if (filterPrice === 'under3000') filteredProducts = filteredProducts.filter(p => p.price < 3000);
  if (filterPrice === '3000-10000') filteredProducts = filteredProducts.filter(p => p.price >= 3000 && p.price <= 10000);
  if (filterPrice === 'above10000') filteredProducts = filteredProducts.filter(p => p.price > 10000);

  if (sortBy === 'priceLowHigh') filteredProducts.sort((a, b) => a.price - b.price);
  if (sortBy === 'priceHighLow') filteredProducts.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filteredProducts.sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', padding: '20px' }}>
      <Container fluid>
        <Row>

          {/* Sidebar */}
          <Col md={3} lg={2}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
              <h5><FaFilter /> Filters</h5>

              <h6 className="mt-3">Category</h6>
              {['all','mobile','audio','laptop','wearable','accessories','tv','tablet','camera','network','storage','smart-home','appliance'].map(cat => (
                <Form.Check key={cat} type="radio" label={cat}
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
              ))}

              <h6 className="mt-3">Price</h6>
              <Form.Check label="All" type="radio" onChange={()=>setFilterPrice('')} />
              <Form.Check label="Under ₹3000" type="radio" onChange={()=>setFilterPrice('under3000')} />
              <Form.Check label="₹3000 - ₹10000" type="radio" onChange={()=>setFilterPrice('3000-10000')} />
              <Form.Check label="Above ₹10000" type="radio" onChange={()=>setFilterPrice('above10000')} />
            </div>
          </Col>

          {/* Products */}
          <Col md={9} lg={10}>
            <div className="d-flex justify-content-between mb-3">
              <h4>Electronics</h4>
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

                      <Button className="w-100 mt-2" onClick={() => handleAddToCart(product)}>
                        <FaShoppingCart /> Add to Cart
                      </Button>

                      <Button variant="light" className="w-100 mt-2" onClick={() => handleWishlist(product)}>
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

export default Electronics;