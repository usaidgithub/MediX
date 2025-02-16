"use client"

import React from "react"
import { useState } from "react"


const UserInput = ({ inputText, setInputText, onSendMessage, isTyping }) => {
  const [isListening, setIsListening] = useState(false)

  const handleSendMessage = () => {
    onSendMessage(inputText)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleListening = () => {
    if (!isListening) {
      startListening()
    } else {
      stopListening()
    }
  }

  const startListening = () => {
    setIsListening(true)
    // Placeholder for actual speech recognition implementation
    console.log("Started listening")
  }

  const stopListening = () => {
    setIsListening(false)
    // Placeholder for stopping speech recognition
    console.log("Stopped listening")
  }

  return (
    <div className="user-input">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your symptoms..."
        disabled={isTyping}
      />
      <button onClick={handleSendMessage} disabled={isTyping || !inputText.trim()}>
        <i className="fas fa-paper-plane"></i>
      </button>
      <button onClick={toggleListening} className={`mic-button ${isListening ? "listening" : ""}`} disabled={isTyping}>
        <i className={`fas ${isListening ? "fa-stop" : "fa-microphone"}`}></i>
      </button>
    </div>
  )
}

export default UserInput

