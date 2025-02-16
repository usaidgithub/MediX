import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast"
import '../styles/Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age,setAge]=useState('')
    const [medicalHistory,setMedicalHistory]= useState(null)
    const [gender,setGender]= useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
            { email, password, gender, age, medicalHistory }
          );
      
          // ✅ Handle Response
          if (response.data?.success) {
            if (response.data.accessToken) {
              localStorage.setItem('token', response.data.accessToken);
              toast.success("Signup successful! Redirecting...");
              navigate('/chatbot');
            }
          } else {
            console.log(response.data.message)
            setError(response.data.message);
            toast.error(response.data.message);
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Something went wrong!";
          console.error("Error during submission:", errorMessage);
          setError(errorMessage);
          toast.error(errorMessage);
        } finally {
          // ✅ Clear input fields only on success
          if (!error) {
            setEmail('');
            setPassword('');
            setGender('');
            setAge('');
            setMedicalHistory('');
          }
        }
      };
      
      const handleGenderChange = (e) => {
        setGender(e.target.value);
      };

    return (
        <div className="login-signup-container">
            <div className="form-container">
                {error && <p className="error-message">{error}</p>}
                <h1 className="title">MediBot AI</h1>
                <p className="subtitle">
                    Sign up for your medical AI assistant
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
                    <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} min="1" max="100" required />
                    
                    <textarea className='medical-history' name="history" placeholder='Medical History'  rows={6} value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)}></textarea>
                    

                    <div className="gender">
                    <div className="gen">
                        
                        <input 
                          type="radio" 
                          id="Male" 
                          name="gender" 
                          value="Male" 
                          checked={gender === 'Male'}
                          onChange={handleGenderChange}
                        />
                        <label htmlFor="Male"> Male</label>
                      </div>
                
                    <div className="gen">
                        
        <input 
          type="radio" 
          id="Female" 
          name="gender" 
          value="Female" 
          checked={gender === 'Female'}
          onChange={handleGenderChange}
        />
        <label htmlFor="Female"> Female</label>
      </div>

      <div className="gen">
        <input 
          type="radio" 
          id="Other" 
          name="gender" 
          value="Other" 
          checked={gender === 'Other'}
          onChange={handleGenderChange}
        />
        <label htmlFor="Other"> Other</label>
      </div>
      </div>
                    <button type="submit" className="submit-btn">
                        Sign Up
                    </button>
                </form>
                <div className="navigate">
                <p 
      style={{ cursor: "pointer", padding: "10px", textAlign: "center" }} // Apply style directly
        onClick={() => navigate("/login")} // Correct usage of navigate
      >
        Already have an account
      </p>
        </div>
            </div>
        </div>
    );
};

export default Signup;
