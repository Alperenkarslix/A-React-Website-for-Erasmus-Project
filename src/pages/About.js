import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="about-page">
        <Navbar />
      <h1>About Us</h1>
      <div className="about-content">
        <div className="about-image">
          <img src="/path/to/image" alt="Team" />
        </div>
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>Welcome to our website! We are a passionate team dedicated to providing high-quality solutions in the field of theoretical physics.</p>
          <p>At our company, we strive to push the boundaries of scientific research and innovation. Our team of experts, consisting of renowned physicists and researchers, work tirelessly to unravel the mysteries of the universe.</p>
          <h2>What We Offer</h2>
          <ul>
            <li>Cutting-edge simulations and modeling</li>
            <li>Advanced frameworks and tools</li>
            <li>Innovative research and discoveries</li>
            <li>Collaborative projects and partnerships</li>
          </ul>
          <h2>Join Us</h2>
          <p>Are you passionate about theoretical physics and eager to make a difference? We are always looking for talented individuals to join our team. Explore our open positions and embark on an exciting journey of scientific exploration with us.</p>
          <p>For any inquiries or collaborations, please don't hesitate to reach out to us. We would love to hear from you!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
