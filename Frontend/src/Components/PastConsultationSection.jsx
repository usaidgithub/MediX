'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ChevronRight } from 'lucide-react'
import '../styles/PastConsultationSection.css'

const PastConsultationsSection = () => {
  const [consultations, setConsultations] = useState([
    { id: 1, date: '2023-05-01', summary: 'Discussed flu symptoms' },
    { id: 2, date: '2023-04-15', summary: 'Follow-up on medication' },
    { id: 3, date: '2023-03-22', summary: 'Annual check-up' },
  ])

  const [selectedConsultation, setSelectedConsultation] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="consultations-container"
    >
      <h2 className="consultations-title">
        <MessageSquare className="icon" /> Past Consultations
      </h2>
      <ul className="consultations-list">
        {consultations.map((consultation) => (
          <li key={consultation.id}>
            <button
              onClick={() => setSelectedConsultation(consultation)}
              className="consultation-item"
            >
              <span className="consultation-date">{consultation.date}</span>
              <ChevronRight className="chevron-icon" size={18} />
            </button>
          </li>
        ))}
      </ul>
      {selectedConsultation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="consultation-details"
        >
          <h3 className="consultation-details-title">
            Consultation on {selectedConsultation.date}
          </h3>
          <p className="consultation-details-summary">{selectedConsultation.summary}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PastConsultationsSection
