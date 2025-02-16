import React from 'react';
import { motion } from 'framer-motion';


const ChatInput = ({ input, setInput, handleSendMessage, isTyping }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        disabled={isTyping}
      />
      <motion.button
        type="submit"
        disabled={isTyping}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Send
      </motion.button>
    </form>
  );
};

export default ChatInput;