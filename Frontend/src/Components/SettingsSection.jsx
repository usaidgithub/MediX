"use client"

import React from "react"
import { motion } from "framer-motion"
import { Settings, Sun, Moon } from "lucide-react"
import "../styles/SettingsSection.css"

const SettingsSection = ({ darkMode, toggleDarkMode, language, setLanguage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="settings-container"
    >
      <h2 className="settings-title">
        <Settings className="icon" /> Settings
      </h2>
      <div className="settings-options">
        <div className="dark-mode-toggle">
          <label htmlFor="darkMode" className="toggle-label">
            <div className="toggle-wrapper">
              <input type="checkbox" id="darkMode" className="toggle-checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <div className="toggle-bg"></div>
              <div className={`toggle-dot ${darkMode ? "dark" : ""}`}>
                {darkMode ? <Moon className="icon-small dark-icon" /> : <Sun className="icon-small light-icon" />}
              </div>
            </div>
            <span className="toggle-text">Dark Mode</span>
          </label>
        </div>
        <div className="language-selector">
          <label htmlFor="language" className="language-label">Language</label>
          <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="language-dropdown">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}

export default SettingsSection
