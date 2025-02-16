import React from 'react';
import { motion } from 'framer-motion';

const ChatMessage = ({ message }) => {
  return (
    <motion.div
      className={`chat-message ${message.isUser ? 'user' : 'bot'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="message-content">{message.text}</div>
      <div className="message-timestamp">
        {message.timestamp.toLocaleTimeString()}
      </div>
    </motion.div>
  );
};

export default ChatMessage;