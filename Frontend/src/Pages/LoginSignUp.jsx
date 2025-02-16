import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast"
import '../styles/LoginSignUp.css';

const LoginSignup = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let response;
    try {
  
      if (isLogin) {
        // Login Request
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users/login`, 
          { email, password }
        );
      } else {
        // Signup Request
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users/signup`, 
          { email, password }
        );
      }
  
      // Handle Response
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/chatbot');
      } 
      if( !response.data.success){
        setError(response.data.message);
        toast.error(response.data.message)
        console.log(response.data.message)
      }
  
    } catch (error) {
      console.error("Error during submission:", error.response?.data?.message || error.message);
      setError(response);
      toast.error(error.response?.data?.message || error.message)
    } finally {
      // Clear input fields
      setEmail('');
      setPassword('');
    }
  };
  

  return (
    <div className="login-signup-container">
      <div className="form-container">
        {error && <p className="error-message">{error}</p>}
        <h1 className="title">MediBot AI</h1>
        <p className="subtitle">
          {isLogin ? 'Login to access your medical AI assistant' : 'Sign up for your medical AI assistant'}
        </p>
        {/* <div className="tabs">
          <button
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div> */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
        <div className="navigate">
      <p 
 style={{ cursor: "pointer", padding: "10px", textAlign: "center" }}// Apply style directly
        onClick={() => navigate("/signup")} // Correct usage of navigate
      >
        Create a New Account
      </p>
    </div>
      </div>
    </div>
  );
};

export default LoginSignup;
    