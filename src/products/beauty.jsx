import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Container, Row, Col, Card, Button, Form, Toast, Badge } from 'react-bootstrap';
import { 
  FaRupeeSign, FaStar, FaRegStar, FaHeart, FaRegHeart, 
  FaShoppingCart, FaFilter 
} from 'react-icons/fa';

const Beauty = () => {
  const { addToCart } = useCart();

  const [filterPrice, setFilterPrice] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [wishlist, setWishlist] = useState([]);

  // ✅ FIXED IMAGE LINKS (UNSPLASH)
  const products = [
    { id: 1, title: "Lakme Matte Lipstick", brand: "Lakme", price: 299, originalPrice: 500, discount: "40% off", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", rating: 4.5, reviews: 2345, category: "makeup" },
    { id: 2, title: "Maybelline Foundation", brand: "Maybelline", price: 549, originalPrice: 799, discount: "31% off", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", rating: 4.6, reviews: 5432, category: "makeup" },
    { id: 3, title: "Nivea Soft Cream", brand: "Nivea", price: 199, originalPrice: 299, discount: "33% off", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400", rating: 4.4, reviews: 8765, category: "skincare" },
    { id: 4, title: "Face Wash", brand: "Mamaearth", price: 249, originalPrice: 399, discount: "38% off", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400", rating: 4.3, reviews: 3211, category: "skincare" },
    { id: 5, title: "Shampoo", brand: "L'Oreal", price: 399, originalPrice: 599, discount: "33% off", image: "https://images.unsplash.com/photo-1619451684889-89c1a4c9d5d7?w=400", rating: 4.5, reviews: 4321, category: "haircare" },
    { id: 6, title: "Conditioner", brand: "Dove", price: 349, originalPrice: 499, discount: "30% off", image: "https://images.unsplash.com/photo-1629198735660-e39ea93f5c36?w=400", rating: 4.4, reviews: 2100, category: "haircare" },

    { id: 7, title: "Nail Polish", brand: "Faces Canada", price: 199, originalPrice: 299, discount: "33% off", image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400", rating: 4.2, reviews: 1900, category: "makeup" },
    { id: 8, title: "Facial Kit", brand: "Biotique", price: 599, originalPrice: 899, discount: "33% off", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400", rating: 4.6, reviews: 1450, category: "skincare" },

    { id: 9, title: "Neem Face Wash", brand: "Himalaya", price: 179, originalPrice: 250, discount: "28% off", image: "https://images.unsplash.com/photo-1620912189861-0b2c9c2c5a6e?w=400", rating: 4.3, reviews: 5200, category: "skincare" },
    { id: 10, title: "Micellar Water", brand: "Garnier", price: 299, originalPrice: 399, discount: "25% off", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400", rating: 4.5, reviews: 4100, category: "skincare" },

    { id: 11, title: "Beauty Cream", brand: "Ponds", price: 199, originalPrice: 299, discount: "33% off", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400", rating: 4.4, reviews: 3500, category: "skincare" },
    { id: 12, title: "Face Serum", brand: "WOW", price: 499, originalPrice: 699, discount: "28% off", image: "https://images.unsplash.com/photo-1629198735660-e39ea93f5c36?w=400", rating: 4.5, reviews: 2800, category: "skincare" },

    { id: 13, title: "Hair Fall Shampoo", brand: "Tresemme", price: 349, originalPrice: 499, discount: "30% off", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400", rating: 4.4, reviews: 4200, category: "haircare" },
    { id: 14, title: "Hair Conditioner", brand: "Pantene", price: 299, originalPrice: 399, discount: "25% off", image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400", rating: 4.3, reviews: 3000, category: "haircare" },

    { id: 15, title: "Eyeshadow Palette", brand: "Nykaa", price: 799, originalPrice: 1299, discount: "38% off", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400", rating: 4.6, reviews: 1700, category: "makeup" },
    { id: 16, title: "Kajal", brand: "Colorbar", price: 249, originalPrice: 399, discount: "38% off", image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400", rating: 4.5, reviews: 2600, category: "makeup" },

    { id: 17, title: "Compact Powder", brand: "Blue Heaven", price: 199, originalPrice: 299, discount: "33% off", image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400", rating: 4.2, reviews: 1900, category: "makeup" },
    { id: 18, title: "Sunscreen SPF 50", brand: "Lotus", price: 349, originalPrice: 499, discount: "30% off", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400", rating: 4.4, reviews: 3100, category: "skincare" },

    { id: 19, title: "Facial Kit", brand: "VLCC", price: 399, originalPrice: 599, discount: "33% off", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400", rating: 4.3, reviews: 2200, category: "skincare" },
    { id: 20, title: "Hair Serum", brand: "Streax", price: 275, originalPrice: 399, discount: "31% off", image: "https://images.unsplash.com/photo-1619451684889-89c1a4c9d5d7?w=400", rating: 4.4, reviews: 4100, category: "haircare" },

    { id: 21, title: "Perfume", brand: "Enchanteur", price: 499, originalPrice: 699, discount: "28% off", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400", rating: 4.3, reviews: 1800, category: "fragrance" },
    { id: 22, title: "Body Spray", brand: "Fogg", price: 299, originalPrice: 399, discount: "25% off", image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400", rating: 4.2, reviews: 2700, category: "fragrance" }
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
  if (filterPrice === 'under300') filteredProducts = filteredProducts.filter(p => p.price < 300);
  if (filterPrice === '300-600') filteredProducts = filteredProducts.filter(p => p.price >= 300 && p.price <= 600);
  if (filterPrice === 'above600') filteredProducts = filteredProducts.filter(p => p.price > 600);

  if (sortBy === 'priceLowHigh') filteredProducts.sort((a, b) => a.price - b.price);
  if (sortBy === 'priceHighLow') filteredProducts.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filteredProducts.sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', padding: '20px' }}>
      <Container fluid>
        <Row>

          <Col md={3} lg={2}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
              <h5><FaFilter /> Filters</h5>

              <h6 className="mt-3">Category</h6>
              {['all','makeup','skincare','haircare','fragrance'].map(cat => (
                <Form.Check key={cat} type="radio" label={cat} value={cat}
                  checked={selectedCategory === cat}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
              ))}

              <h6 className="mt-3">Price</h6>
              <Form.Check label="All" type="radio" name="price" onChange={()=>setFilterPrice('')} />
              <Form.Check label="Under ₹300" type="radio" onChange={()=>setFilterPrice('under300')} />
              <Form.Check label="₹300 - ₹600" type="radio" onChange={()=>setFilterPrice('300-600')} />
              <Form.Check label="Above ₹600" type="radio" onChange={()=>setFilterPrice('above600')} />
            </div>
          </Col>

          <Col md={9} lg={10}>
            <div className="d-flex justify-content-between mb-3">
              <h4>Beauty Products</h4>
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

      <Toast show={showToast} style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Beauty;