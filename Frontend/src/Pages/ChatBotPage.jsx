'use client';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, MessageSquare, Trash, Moon, Sun ,Sidebar} from 'lucide-react';
import '../styles/ChatBotPage.css';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      text: `Hello! 👋\n\nWelcome to MediBot, your personal health assistant. I'm here to help you with medical information, symptom guidance, and wellness tips.\n\nYou can learn more about the chatbot in our Homepage`,
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatId,setChatId]= useState(localStorage.getItem("chatId"))
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
      const getChatHistory = async () => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/chat-history`, {
            token : localStorage.getItem("token"),
          });
          setChatHistory(response.data);
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      }

      getChatHistory();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const sendMessage = async () => {
    if (!input.trim()) return;
  
    // Add user message to chat
    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');
    setIsTyping(true);
  
    try {
      // Send user message to backend
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
        token:localStorage.getItem("token"),
        chatId,
        message: input,
      });
      // localStorage.setItem("chatId",response.data.chatId)
      // Get bot response
      const botMessage = { text: response.data.answer, sender: 'bot' };
      
      // Update chat with bot response
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { text: 'Failed to get a response. Please try again.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      console.warn("Speech recognition not initialized");
      return;
    }
  
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };
  
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognitionRef.current = recognition;
  
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Speech Input:", transcript);
        setInput(transcript); // Displaying transcription
      };
  
      recognition.onstart = () => {
        console.log("Listening...");
        setIsListening(true);
      };
  
      recognition.onend = () => {
        console.log("Stopped listening.");
        setIsListening(false);
      };
  
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
    } else {
      console.warn("Speech recognition not supported in this browser.");
    }
  }, []);
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  
    // Save user preference in localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };
  
  // Load user preference on page load
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
    }
  }, []);

  const handleChatClick = (chat) => {
    if (!chat || !chat.messages) return;
  
    // Ensure messages are properly formatted
    const formattedMessages = chat.messages.map((msg) => ({
      text: msg.content,
      sender: msg.role
    }));
  
    setMessages(formattedMessages);
    setIsSidebarOpen(false)
  };
  const clearChat = () => {
    setMessages([]);
    setChatHistory([]);
    localStorage.removeItem('chatHistory');
  };

  return (
    <div className={`chat-container ${darkMode ? 'dark' : ''}`}>
      <div className="chat-header">

          <Sidebar className='sidebar-toggle' size={24} onClick={toggleSidebar} />MedX AI
        <button className="theme-toggle" onClick={() => toggleDarkMode()}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <div className="chatbot-container">
        {/* Sidebar */}
          <aside className={`chat-history ${isSidebarOpen ? 'open' : ''}`}>
          <h3>Past Chats</h3>
          <button className="clear-btn" onClick={clearChat}>
            <Trash size={16} /> Clear History
          </button>
          {chatHistory.length > 0 ? (
   <ul className={`chat-history-content ${darkMode ? 'dark' : ''}`}>
      {chatHistory.length > 0 ? (
        chatHistory.map((chat, index) => (
          <li key={index} onClick={() => handleChatClick(chat)}>
            {chat.messages.length > 0 ? chat.messages[0].content : "No messages"}
          </li>
        ))
      ) : (
        <p>No previous chats</p>
      )}
    </ul>
          ) : (
            <p>No previous chats</p>
          )}
        
        </aside>

        {/* Chat Window */}
        <div className={`chat-window ${!isSidebarOpen? 'full-width' : ""}`}>
          <div className={`chat-body`}>
            {messages.map((msg, index) => (
              
              <div key={index} className={`chat-bubble ${msg.sender} ${darkMode? "dark" : ""}`}>
                <img 
        src={msg.sender === 'user' ? '/src/assets/user.png' : '/src/assets/technical-support.png'} 
        alt={`${msg.sender}-profile`} 
        className="chat-avatar"
      />
                  <div className={`chat-message ${msg.sender}`}>
                {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Animation */}
            {isTyping && (
              <div className="ai-message">
                <img src="/src/assets/technical-support.png" alt="chat-bot" className='chat-avatar'/>
              <div className="chat-bubble bot typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Section */}
          <div className="chat-input">
          <button onClick={toggleVoiceInput} className={`mic-btn ${isListening ? 'active' : ''}`}>
          <Mic size={24} />
        </button>
            <input
              type="text"
              placeholder="Type your symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={isListening}
            />
            <button onClick={sendMessage} className="send-btn">
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
