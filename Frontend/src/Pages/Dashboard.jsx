'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import ProfileSection from '../Components/ProfileSection'
import PastConsultationsSection from '../Components/PastConsultationSection'
import SettingsSection from '../Components/SettingsSection'
import '../styles/Dashboard.css' // Import CSS file

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-title"
        >
          User Dashboard
        </motion.h1>
        <div className="grid-container">
          <ProfileSection />
          <PastConsultationsSection />
          <SettingsSection
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            language={language}
            setLanguage={setLanguage}
          />
        </div>
      </div>
      <button onClick={toggleDarkMode} className="toggle-button">
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  )
}

export default Dashboard
