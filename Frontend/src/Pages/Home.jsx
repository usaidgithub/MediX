import React from "react";
import "../styles/Home.css";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Personal AI Healthcare Assistant – Available 24/7!</h1>
          <button className="cta-button">Start Consultation</button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">1. Describe your symptoms</div>
          <div className="step">2. Get a diagnosis & recommendations</div>
          <div className="step">3. Take the next steps (tests, doctor consultation)</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li><strong>Smart AI Consultation</strong> – Conversational, adaptive questioning.</li>
          <li><strong>Personalized Advice</strong> – Custom recommendations based on symptoms.</li>
          <li><strong>Chat History Storage</strong> – Resume from where you left off.</li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>"This AI assistant saved me a trip to the doctor! Very insightful." - Jane D.</p>
        </div>
        <div className="testimonial">
          <p>"Super easy to use and provides great recommendations!" - Alex T.</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="social-icons">
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
