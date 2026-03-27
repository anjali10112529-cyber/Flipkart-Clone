import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { FaRupeeSign, FaStar, FaRegStar, FaTruck, FaExchangeAlt, FaShieldAlt, FaClock } from 'react-icons/fa';

const HomePage = () => {
  // Featured banners with working images
  const banners = [
    {
      id: 1,
      title: "Big Billion Days",
      subtitle: "Biggest sale of the year",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop",
      bgColor: "#2874f0"
    },
    {
      id: 2,
      title: "Electronics Sale",
      subtitle: "Up to 80% off on electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop",
      bgColor: "#fb641b"
    },
    {
      id: 3,
      title: "Fashion Week",
      subtitle: "Minimum 50% off on fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop",
      bgColor: "#ff9f00"
    }
  ];

  // Deals of the day with actual product images
  const dealsOfDay = [
    {
      id: 1,
      title: "iPhone 15 Pro",
      price: 129999,
      originalPrice: 149999,
      discount: "13% off",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop",
      rating: 4.5,
      soldCount: 1245
    },
    {
      id: 2,
      title: "Samsung Galaxy S24",
      price: 79999,
      originalPrice: 89999,
      discount: "11% off",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop",
      rating: 4.3,
      soldCount: 892
    },
    {
      id: 3,
      title: "Sony Headphones",
      price: 24990,
      originalPrice: 29990,
      discount: "16% off",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      rating: 4.6,
      soldCount: 2341
    },
    {
      id: 4,
      title: "MacBook Air M2",
      price: 109990,
      originalPrice: 119900,
      discount: "8% off",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
      rating: 4.7,
      soldCount: 567
    },
    {
      id: 5,
      title: "Smart Watch",
      price: 2499,
      originalPrice: 4999,
      discount: "50% off",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      rating: 4.2,
      soldCount: 3421
    },
    {
      id: 6,
      title: "Wireless Earbuds",
      price: 1499,
      originalPrice: 2999,
      discount: "50% off",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
      rating: 4.4,
      soldCount: 5678
    }
  ];

  // Electronics products
  const electronicsProducts = [
    {
      id: 1,
      title: "iPhone 15 Pro Max",
      price: 159999,
      originalPrice: 179999,
      discount: "11% off",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop",
      rating: 4.8
    },
    {
      id: 2,
      title: "Samsung Galaxy S24 Ultra",
      price: 129999,
      originalPrice: 144999,
      discount: "10% off",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop",
      rating: 4.7
    },
    {
      id: 3,
      title: "OnePlus 12",
      price: 64999,
      originalPrice: 69999,
      discount: "7% off",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop",
      rating: 4.5
    },
    {
      id: 4,
      title: "Google Pixel 8 Pro",
      price: 109999,
      originalPrice: 119999,
      discount: "8% off",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&h=200&fit=crop",
      rating: 4.6
    }
  ];

  // Fashion products
  const fashionProducts = [
    {
      id: 1,
      title: "Men's Casual Shirt",
      price: 999,
      originalPrice: 1999,
      discount: "50% off",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop",
      rating: 4.3
    },
    {
      id: 2,
      title: "Women's Summer Dress",
      price: 1499,
      originalPrice: 3499,
      discount: "57% off",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop",
      rating: 4.5
    },
    {
      id: 3,
      title: "Running Shoes",
      price: 1299,
      originalPrice: 2999,
      discount: "56% off",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
      rating: 4.2
    },
    {
      id: 4,
      title: "Smart Watch",
      price: 2499,
      originalPrice: 4999,
      discount: "50% off",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      rating: 4.4
    }
  ];

  // Top categories
  const topCategories = [
    { name: "Mobiles", icon: "📱", color: "#ff6b6b" },
    { name: "Fashion", icon: "👕", color: "#4ecdc4" },
    { name: "Electronics", icon: "💻", color: "#45b7d1" },
    { name: "Home", icon: "🏠", color: "#96ceb4" },
    { name: "Appliances", icon: "🔌", color: "#feca57" },
    { name: "Beauty", icon: "💄", color: "#ff9ff3" },
    { name: "Sports", icon: "⚽", color: "#54a0ff" },
    { name: "Books", icon: "📚", color: "#5f27cd" }
  ];

  // Service features
  const services = [
    { icon: <FaTruck />, title: "Free Delivery", subtitle: "Above ₹999" },
    { icon: <FaExchangeAlt />, title: "7 Days Replacement", subtitle: "Policy available" },
    { icon: <FaShieldAlt />, title: "Secure Payment", subtitle: "100% secure" },
    { icon: <FaClock />, title: "24/7 Support", subtitle: "Customer care" }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-warning" style={{ opacity: 0.5 }} />);
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-muted" />);
    }
    return stars;
  };

  return (
    <div className="homepage">
      {/* Hero Carousel */}
      <Carousel className="hero-carousel" indicators={true} controls={true} interval={5000}>
        {banners.map(banner => (
          <Carousel.Item key={banner.id}>
            <div className="carousel-slide" style={{ backgroundColor: banner.bgColor }}>
              <Container>
                <Row className="align-items-center" style={{ height: '400px' }}>
                  <Col md={6} className="text-white">
                    <h1 className="display-4 fw-bold mb-3">{banner.title}</h1>
                    <p className="lead mb-4">{banner.subtitle}</p>
                    <button className="btn btn-light btn-lg">Shop Now →</button>
                  </Col>
                  <Col md={6}>
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="img-fluid rounded"
                      style={{ maxHeight: '350px', objectFit: 'cover', width: '100%' }}
                    />
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Top Categories */}
      <Container className="my-5">
        <div className="section-header">
          <h2 className="section-title">Top Categories</h2>
          <a href="#" className="view-all">View All →</a>
        </div>
        <Row className="g-4">
          {topCategories.map((category, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={1.5}>
              <div className="category-card text-center">
                <div className="category-icon" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                  <span style={{ fontSize: '32px' }}>{category.icon}</span>
                </div>
                <p className="category-name mt-2">{category.name}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Deals of the Day */}
      <Container className="my-5">
        <div className="section-header">
          <h2 className="section-title">Deals of the Day</h2>
          <a href="#" className="view-all">View All →</a>
        </div>
        <Row className="g-4">
          {dealsOfDay.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={2}>
              <Card className="product-card h-100">
                <div className="product-image-wrapper">
                  <Card.Img variant="top" src={product.image} className="product-image" />
                  {product.discount && (
                    <span className="discount-badge">{product.discount}</span>
                  )}
                </div>
                <Card.Body>
                  <Card.Title className="product-title">{product.title}</Card.Title>
                  <div className="product-price">
                    <span className="current-price">
                      <FaRupeeSign className="rupee-icon" />{product.price.toLocaleString()}
                    </span>
                    <span className="original-price">
                      <FaRupeeSign className="rupee-icon" />{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="product-rating">
                    {renderStars(product.rating)}
                    <span className="rating-count ms-1">({product.soldCount})</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Electronics Section */}
      <Container className="my-5">
        <div className="section-header">
          <h2 className="section-title">Electronics & Gadgets</h2>
          <a href="#" className="view-all">View All →</a>
        </div>
        <Row className="g-4">
          {electronicsProducts.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="product-card h-100">
                <Card.Img variant="top" src={product.image} className="product-image" />
                <Card.Body>
                  <Card.Title className="product-title">{product.title}</Card.Title>
                  <div className="product-price">
                    <span className="current-price">
                      <FaRupeeSign className="rupee-icon" />{product.price.toLocaleString()}
                    </span>
                    <span className="original-price">
                      <FaRupeeSign className="rupee-icon" />{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="product-rating">
                    {renderStars(product.rating)}
                  </div>
                  <div className="discount-text text-success mt-1">{product.discount}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Fashion Section */}
      <Container className="my-5">
        <div className="section-header">
          <h2 className="section-title">Fashion & Lifestyle</h2>
          <a href="#" className="view-all">View All →</a>
        </div>
        <Row className="g-4">
          {fashionProducts.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="product-card h-100">
                <Card.Img variant="top" src={product.image} className="product-image" />
                <Card.Body>
                  <Card.Title className="product-title">{product.title}</Card.Title>
                  <div className="product-price">
                    <span className="current-price">
                      <FaRupeeSign className="rupee-icon" />{product.price.toLocaleString()}
                    </span>
                    <span className="original-price">
                      <FaRupeeSign className="rupee-icon" />{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="product-rating">
                    {renderStars(product.rating)}
                  </div>
                  <div className="discount-text text-success mt-1">{product.discount}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Services Section */}
      <Container className="my-5">
        <Row className="services-section">
          {services.map((service, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <div className="service-card text-center">
                <div className="service-icon">{service.icon}</div>
                <h6 className="service-title mt-2">{service.title}</h6>
                <p className="service-subtitle">{service.subtitle}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;