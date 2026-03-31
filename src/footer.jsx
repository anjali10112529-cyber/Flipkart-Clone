import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="flipkart-footer">
      <Container fluid>
        <Row className="footer-top">

          {/* ABOUT */}
          <Col md={2} sm={6}>
            <h6>ABOUT</h6>
            <ul>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Flipkart Stories</li>
              <li>Press</li>
              <li>Corporate Information</li>
            </ul>
          </Col>

          {/* HELP */}
          <Col md={2} sm={6}>
            <h6>HELP</h6>
            <ul>
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
              <li>FAQ</li>
              <li>Report Infringement</li>
            </ul>
          </Col>

          {/* POLICY */}
          <Col md={2} sm={6}>
            <h6>CONSUMER POLICY</h6>
            <ul>
              <li>Return Policy</li>
              <li>Terms Of Use</li>
              <li>Security</li>
              <li>Privacy</li>
              <li>Sitemap</li>
              <li>Grievance Redressal</li>
            </ul>
          </Col>

          {/* SOCIAL */}
          <Col md={2} sm={6}>
            <h6>SOCIAL</h6>
            <ul>
              <li><FaFacebook /> Facebook</li>
              <li><FaTwitter /> Twitter</li>
              <li><FaYoutube /> YouTube</li>
              <li><FaInstagram /> Instagram</li>
            </ul>
          </Col>

          {/* MAIL US */}
          <Col md={2} sm={6}>
            <h6>Mail Us:</h6>
            <p>
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
          </Col>

          {/* REGISTERED OFFICE */}
          <Col md={2} sm={6}>
            <h6>Registered Office Address:</h6>
            <p>
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India<br />
              CIN : U51109KA2012PTC066107<br />
              Telephone: 044-45614700
            </p>
          </Col>

        </Row>

        {/* Bottom Bar */}
        <Row className="footer-bottom">
          <Col md={6} className="bottom-left">
            <span>© 2026 Flipkart Clone | Built with React</span>
          </Col>

          <Col md={6} className="bottom-right">
            <span>Secure Payments | Fast Delivery | Easy Returns</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;