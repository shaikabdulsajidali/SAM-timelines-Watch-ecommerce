import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import Footer from '../Footer/Footer';

function Hero() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.3 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setHideNavbar(window.scrollY > lastScrollY);
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className='mainhero'>
        {/* Navbar */}
        <header className={`hero-navbar ${hideNavbar ? 'hide-navbar' : ''}`}>
          <div className="navbar-left">
            <img src="/images/logo1.png" alt="Sam Logo" className="hero-logo" />
          </div>
          <div className="navbar-right">
            <div className="dropdown">
              <button className="hero-btn">Sign In</button>
              <div className="dropdown-content">
                <button onClick={() => navigate('/login')}>User Login</button>
                <button onClick={() => navigate('/alogin')}>Admin Login</button>
              </div>
            </div>
            <div className="dropdown">
              <button className="hero-btn secondary">Sign Up</button>
              <div className="dropdown-content">
                <button onClick={() => navigate('/signup')}>User Signup</button>
                <button onClick={() => navigate('/asignup')}>Admin Signup</button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Experience Timeless Luxury</h1>
            <p className="hero-subtitle">Elevate your wristwear with handcrafted precision and design.</p>
            <div className="hero-buttons">
              <button className="hero-btn" onClick={() => navigate('/profile')}>Shop Now</button>
              <button className="hero-btn secondary" onClick={() => navigate('/about')}>Our Story</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/nobg1.png" alt="Luxury Watch Hero" className="sneaker-image" />
          </div>
        </section>

        {/* Video Reveal Section */}
        <section ref={videoRef} className={`video-section ${isVisible ? 'visible' : ''}`}>
          <video className="background-video" autoPlay loop muted playsInline>
            <source src="/videos/lux-1.mp4" type="video/mp4" />
          </video>
        </section>

        {/* Featured Watch Section */}
        <section className="new-arrival-section">
          <div className="new-arrival-container">
            <div className="arrival-image-box">
              <img src="/images/w1.png" alt="Featured Watch" />
            </div>
            <div className="arrival-description-box">
              <h2 className="arrival-heading">🔥 Sam Royal Gold – Limited Edition</h2>
              <p className="arrival-text">
                Discover our crown jewel. Handcrafted elegance in every tick. Own the moment with Sam Royal Gold.
              </p>
              <button className="explore-btn" onClick={() => navigate('/profile')}>
                Buy Now
              </button>
            </div>
          </div>
        </section>

        {/* Watch Gallery Section */}
        <section className="watch-gallery">
          <h2 className="gallery-title">Our Timeless Collection</h2>
          <div className="gallery-container">
            <img src="/images/nobg1.png" alt="Watch 1" />
            <img src="/images/nobg2.png" alt="Watch 2" />
            <img src="/images/nobg3.png" alt="Watch 3" />
            <img src="/images/nobg4.png" alt="Watch 4" />
            <img src="/images/nobg5.png" alt="Watch 5" />
          </div>
        </section>

        {/* Collection Promo Video */}
        <section className="product-video-section">
          <video className="product-background-video" autoPlay loop muted playsInline>
            <source src="/videos/lux-2.mp4" type="video/mp4" />
          </video>
          <div className="product-video-overlay">
            <button className="explore-btn center-btn" onClick={() => navigate('/profile')}>
              Explore the Collection
            </button>
          </div>
        </section>

        {/* Secondary Watch Highlight */}
        <section className="new-arrival-section">
          <div className="new-arrival-container">
            <div className="arrival-description-box">
              <h2 className="arrival-heading">🖤 Black Diamond Series</h2>
              <p className="arrival-text">
                Sleek. Bold. Mysterious. The Black Diamond collection redefines elegance for modern luxury lovers.
              </p>
              <button className="explore-btn" onClick={() => navigate('/profile')}>
                Discover More
              </button>
            </div>
            <div className="arrival-image-box">
              <img src="/images/w3.png" alt="Black Diamond Watch" />
            </div>
          </div>
        </section>

        {/* Final Brand Showcase */}
        <section className="product-video-section">
          <video className="product-background-video" autoPlay loop muted playsInline>
            <source src="/videos/lux-4.mp4" type="video/mp4" />
          </video>
          <div className="product-video-overlay">
            <button className="explore-btn center-btn" onClick={() => navigate('/profile')}>
              View Signature Series
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Hero;
