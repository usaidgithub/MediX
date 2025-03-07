// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ChatBotPage from "./Pages/ChatBotPage";
import Dashboard from "./Pages/Dashboard";
import ChatHome from "./Pages/ChatHome";
import LoginSignUp from "./Pages/LoginSignUp"
import Signup from "./Pages/Signup";
import Appointment from "./Pages/Appointment";
// import MapPage from "./Pages/MapPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/" element={<ChatHome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/appointment" element={<Appointment />} />
        {/* <Route path="/map" element={<MapPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
