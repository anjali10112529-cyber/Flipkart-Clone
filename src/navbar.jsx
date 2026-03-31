import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaChevronDown, FaBars, FaEnvelope, FaLock, FaPhone, FaUserPlus } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCart } from './context/cartContext';
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, getCartCount, getCartTotal } = useCart();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Category data with icons
  const categories = [
    { name: "For You", icon: "🔥", page: "foryou" },
    { name: "Fashion", icon: "👕", page: "fashion" },
    { name: "Mobiles", icon: "📱", page: "mobiles" },
    { name: "Beauty", icon: "💄", page: "beauty" },
    { name: "Electronics", icon: "💻", page: "electronics" },
    { name: "Home", icon: "🏠", page: "home" },
    { name: "Appliances", icon: "🔌", page: "appliances" },
    { name: "Toys, ba...", icon: "🧸", page: "toys" },
    { name: "Food & H...", icon: "🍔", page: "grocery" },
    { name: "Books & ...", icon: "📚", page: "books" },
    { name: "Furniture", icon: "🪑", page: "furniture" }
  ];

  // Handle category click - opens in new tab
  const handleCategoryClick = (pageName) => {
  if (pageName === 'foryou') {
    window.open('/product-page.html?show=foryou', '_blank');
  } else if (pageName === 'fashion') {
    window.open('/product-page.html?show=fashion', '_blank');
  } else {
    alert(`${pageName} page coming soon!`);
  }
};

  // Handle Login Input Changes
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  // Handle Register Input Changes
  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  // Validate Login Form
  const validateLogin = () => {
    let errors = {};
    if (!loginData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!loginData.password) {
      errors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  // Validate Register Form
  const validateRegister = () => {
    let errors = {};
    if (!registerData.name) {
      errors.name = 'Name is required';
    }
    if (!registerData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!registerData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(registerData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (!registerData.password) {
      errors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length === 0) {
      alert('Login successful!');
      setShowLoginModal(false);
      setLoginData({ email: '', password: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRegister();
    if (Object.keys(validationErrors).length === 0) {
      alert('Registration successful! Please login.');
      setShowRegisterModal(false);
      setRegisterData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });
      setShowLoginModal(true);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  // Switch to Register Modal
  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
    setErrors({});
    setLoginData({ email: '', password: '' });
  };

  // Switch to Login Modal
  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
    setErrors({});
    setRegisterData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <>
      <nav className="flipkart-navbar">
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo">
              <span className="logo-text">Flipkart</span>
              <span className="logo-explore">
                Explore <span className="plus-text">Plus</span>
                <FaChevronDown className="plus-icon" />
              </span>
            </div>
          </div>

          {/* Search Bar Section */}
          <div className="search-section">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search for Products, Brands and More"
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="nav-links-desktop">
            <div className="nav-item">
              <button className="login-btn" onClick={() => setShowLoginModal(true)}>
                <FaUser className="nav-icon" />
                Login
              </button>
            </div>
            <div className="nav-item">
              <a href="#" className="nav-link">
                <FaShoppingCart className="nav-icon" />
                Cart
              </a>
            </div>
            <div className="nav-item">
              <a href="#" className="nav-link seller-link">
                Become a Seller
              </a>
            </div>
            <div className="nav-item">
              <a href="#" className="nav-link">
                <FiMenu className="nav-icon" />
                More
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <FaBars />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-nav-items">
            <button className="mobile-nav-link" onClick={() => setShowLoginModal(true)}>
              <FaUser className="mobile-nav-icon" />
              Login
            </button>
            <a href="#" className="mobile-nav-link">
              <FaShoppingCart className="mobile-nav-icon" />
              Cart
            </a>
            <a href="#" className="mobile-nav-link seller-link">
              Become a Seller
            </a>
            <a href="#" className="mobile-nav-link">
              <FiMenu className="mobile-nav-icon" />
              More
            </a>
          </div>
        </div>
      </nav>

      {/* Category Bar with Icons */}
      <div className="category-bar">
        <div className="category-container">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="category-item"
              onClick={() => handleCategoryClick(category.page)}
            >
              <a href="#" onClick={(e) => e.preventDefault()}>
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="w-100 text-center fs-4 fw-bold">
            Login to Flipkart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email Address</Form.Label>
              <div className="position-relative">
                <FaEnvelope className="input-icon" />
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  isInvalid={!!errors.email}
                  className="ps-5"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <div className="position-relative">
                <FaLock className="input-icon" />
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  isInvalid={!!errors.password}
                  className="ps-5"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Button type="submit" className="w-100 login-modal-btn mb-3">
              Login
            </Button>

            <div className="text-center">
              <p className="text-muted">
                New to Flipkart?{' '}
                <Button variant="link" className="p-0 switch-modal-link" onClick={switchToRegister}>
                  Create an account
                </Button>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Register Modal */}
      <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)} centered size="lg">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="w-100 text-center fs-4 fw-bold">
            Create New Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Full Name</Form.Label>
              <div className="position-relative">
                <FaUser className="input-icon" />
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  isInvalid={!!errors.name}
                  className="ps-5"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email Address</Form.Label>
              <div className="position-relative">
                <FaEnvelope className="input-icon" />
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  isInvalid={!!errors.email}
                  className="ps-5"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Phone Number</Form.Label>
              <div className="position-relative">
                <FaPhone className="input-icon" />
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit mobile number"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  isInvalid={!!errors.phone}
                  className="ps-5"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <div className="position-relative">
                <FaLock className="input-icon" />
                <Form.Control
                  type={showRegisterPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password (min. 6 characters)"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  isInvalid={!!errors.password}
                  className="ps-5"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                >
                  {showRegisterPassword ? "Hide" : "Show"}
                </button>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Confirm Password</Form.Label>
              <div className="position-relative">
                <FaLock className="input-icon" />
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  isInvalid={!!errors.confirmPassword}
                  className="ps-5"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Button type="submit" className="w-100 register-modal-btn mb-3">
              <FaUserPlus className="me-2" /> Register Now
            </Button>

            <div className="text-center">
              <p className="text-muted">
                Already have an account?{' '}
                <Button variant="link" className="p-0 switch-modal-link" onClick={switchToLogin}>
                  Login here
                </Button>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;