import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import '../styles/ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Load chat history from local storage
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    // Save chat history to local storage
    localStorage.setItem('chatHistory', JSON.stringify(messages));
    // Scroll to bottom of chat
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, isUser: true, timestamp: new Date() };
    setMessages([...messages, newMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/api/chat', { message: input });
      const botMessage = { text: response.data.message, isUser: false, timestamp: new Date() };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history? This action cannot be undone.')) {
      setMessages([]);
      localStorage.removeItem('chatHistory');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`chatbot-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <motion.div
        className="chatbot-icon"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? '✕' : '🩺'}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="chatbot-header">
              <h2>🏥 MediBot Assistant</h2>
              <button onClick={toggleDarkMode} title="Toggle Dark Mode">
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button onClick={clearChat} title="Clear Chat History">
                🗑️
              </button>
            </div>
            <div className="chat-messages">
              {messages.length === 0 && (
                <div className="welcome-message">
                  Welcome to MediBot! How can I assist you with your health concerns today?
                </div>
              )}
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isTyping && <div className="typing-indicator">MediBot is thinking...</div>}
              <div ref={chatEndRef} />
            </div>
            <ChatInput
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              isTyping={isTyping}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;