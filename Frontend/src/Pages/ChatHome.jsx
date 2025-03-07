import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChatHome.css";

export default function ChatHome() {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">MedX AI</div>
        {/* <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Technology</a></li>
          <li><a href="#">Services</a></li>
        </ul> */}
        <button onClick={() =>{
          const token = localStorage.getItem('token')
          if(token){
           navigate("/chatbot")
          }else{
            navigate("/login")
          }}} className="btn teal-btn">Get Started</button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="tagline">World's Most Adopted Healthcare AI</div>
          <h1 className="headline">Revolutionizing Healthcare with AI</h1>
          <p className="description">
            Redefine healthcare with AI! Experience the power of faster diagnostics 
            and tailored treatments, designed by Fluttertop. Unveil the immense 
            potential of intelligent care.
          </p>

          <div className="hero-buttons">
            <button onClick={() =>{
          const token = localStorage.getItem('token')
          if(token){
           navigate("/chatbot")
          }else{
            navigate("/login")
          }}}  className="btn black-btn">Get Started</button>
            <button onClick={() => navigate("/appointment")} className="btn outline-btn">Appointment</button>
          </div>

          <div className="rating">
            <div className="avatars">
              <img src="src/assets/profile.png" alt="patients" />
              <img src="src/assets/profile.png" alt="patients" />
              <img src="src/assets/profile.png" alt="patients" />
            </div>
            <div className="rating-info">
              <strong>Rated 5/5 & Trusted by</strong>
              <p>1000+ Patients</p>
            </div>
          </div>
        </div>

        {/* Right Column (Image & Stats) */}
        <div className="hero-image">
          <img 
            src="src/assets/medical-bot-ai.png" 
            alt="AI Brain"
          />
          <div className="stat-card top-right">
            <div className="avatars">
              <img src="src/assets/doctor.png" alt="doc" />
              <img src="src/assets/doctor (1).png" alt="doc" />
            </div>
            <div>
              <strong>300+</strong>
              <p>Expert doctors</p>
            </div>
          </div>
          {/* <div className="stat-card bottom-right">
            <div className="img-container">
                <img  src="src/assets/heart-homepage.jpg" alt="Health Care" />
            </div> 
            <strong>5,000+</strong>
            <p>Design by Fluttertop</p>
          </div> */}
          {/* <div className="social-links">
            <a href="#"><img src="/facebook.svg" alt="Facebook" /></a>
            <a href="#"><img src="/twitter.svg" alt="Twitter" /></a>
            <a href="#"><img src="/instagram.svg" alt="Instagram" /></a>
          </div> */}
        </div>
      </section>
      <section className="view-2">
        <div className="chat">
          <h1>Medical ChatBot</h1>
          <div className="underline"></div>
          <p>
            An AI-powered virtual assistant that helps users with medical
            inquiries, provides health advice, and offers guidance based on
            symptoms, improving accessibility to healthcare information.
          </p>
          <button onClick={() =>{
          const token = localStorage.getItem('token')
          if(token){
           navigate("/chatbot")
          }else{
            navigate("/login")
          }}} >Get Started</button>
        </div>
        <div className="chat">
          <h1>Report Analysis</h1>
          <div className="underline"></div>
          <p>
            A smart tool that processes and interprets medical reports, helping
            users understand their test results, detect potential health issues,
            and gain valuable insights for better decision-making. Let me know
            if you need further refinements!
          </p>
          <button>Get Started</button>
        </div>
        <div className="chat">
          <h1>Medical Facility</h1>
          <div className="underline"></div>
          <p>
Our system uses live location tracking to find the nearest hospitals, clinics, and pharmacies in real time. With instant access to emergency medical centers and pharmacies, you can quickly get the care and medicines you need.
          </p>
          <button onClick={() => window.location.href = "http://localhost:3000/map"}>
  Get Started
</button>

        </div>
      </section>
    </div>
  );
}
