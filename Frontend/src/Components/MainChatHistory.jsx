import React from "react"


const ChatHistory = ({ messages, onClearHistory }) => {
  return (
    <div className="chat-history">
      <h2>Chat History</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id} className={message.sender}>
            <span className="message-text">{message.text}</span>
            <span className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
      <button onClick={onClearHistory} className="clear-history-btn">
        Clear History
      </button>
    </div>
  )
}

export default ChatHistory

