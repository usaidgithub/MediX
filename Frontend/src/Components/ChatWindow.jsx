import { forwardRef } from "react"



const ChatWindow = forwardRef(({ messages, isTyping }, ref) => {
  return (
    <div className="chat-window" ref={ref}>
      {messages.map((message) => (
        <div key={message.id} className={`message ${message.sender}`}>
          <div className="message-content" dangerouslySetInnerHTML={{ __html: message.text }} />
          <div className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</div>
        </div>
      ))}
      {isTyping && (
        <div className="message bot">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  )
})

ChatWindow.displayName = "ChatWindow"

export default ChatWindow

