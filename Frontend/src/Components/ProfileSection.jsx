"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { User, Edit2 } from "lucide-react"
import "../styles/ProfileSection.css" // Import the CSS file

const ProfileSection = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    age: 30,
    gender: "Male",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEditing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="profile-section"
    >
      <h2 className="profile-title">
        <User className="icon" /> Profile
      </h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={profile.name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" value={profile.age} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input type="text" id="gender" name="gender" value={profile.gender} onChange={handleInputChange} />
          </div>
          <button type="submit" className="save-button">Save</button>
        </form>
      ) : (
        <div>
          <p className="profile-info"><strong>Name:</strong> {profile.name}</p>
          <p className="profile-info"><strong>Age:</strong> {profile.age}</p>
          <p className="profile-info"><strong>Gender:</strong> {profile.gender}</p>
          <button onClick={() => setIsEditing(true)} className="edit-button">
            <Edit2 className="icon" size={18} /> Edit Profile
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default ProfileSection
