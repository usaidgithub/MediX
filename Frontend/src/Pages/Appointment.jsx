import React from "react"
import "../styles/Appointment.css"

const doctors = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    specialization: "Cardiologist",
    experience: 10,
    image: "src/assets/doctor.png",
    description:
      "Dr. Johnson is a board-certified cardiologist with 10 years of experience in treating heart conditions.",
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    specialization: "Pediatrician",
    experience: 15,
    image: "src/assets/doctor (1).png",
    description:
      "Dr. Lee is a compassionate pediatrician dedicated to providing comprehensive care for children of all ages.",
  },
  {
    id: 3,
    name: "Dr. Sarah Patel",
    specialization: "Dermatologist",
    experience: 8,
    image: "src/assets/doctor.png",
    description:
      "Dr. Patel specializes in diagnosing and treating a wide range of skin conditions with the latest techniques.",
  },
]

const DoctorCard = ({ name, specialization, experience, image, description }) => {
  return (
    <div className="doctor-card">
      <img src={image || "/placeholder.svg"} alt={name} className="doctor-image" />
      <h2>{name}</h2>
      <p className="specialization">{specialization}</p>
      <p className="experience">{experience} years of experience</p>
      <p className="description">{description}</p>
      <button className="appointment-btn">Book Appointment</button>
    </div>
  )
}

const Appointment = () => {
    return (
      <div className="appointment-page">
        <h1>Book an Appointment</h1>
        <div className="doctor-list">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} {...doctor} />
          ))}
        </div>
      </div>
    )
  }
  
  export default Appointment