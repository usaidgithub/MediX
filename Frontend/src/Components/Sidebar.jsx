// src/components/SidebarComponent.js

import React from 'react';
import { Trash } from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ chatHistory, clearChat, onSelectChat }) => {
  return (
    <aside className="chat-history">
      <h3>Past Chats</h3>
      {chatHistory.length > 0 ? (
        chatHistory.map((chat, index) => (
          <button key={index} className="chat-history-item" onClick={() => onSelectChat(chat)}>
            {chat}
          </button>
        ))
      ) : (
        <p>No previous chats</p>
      )}
      <button className="clear-btn" onClick={clearChat}>
        <Trash size={16} /> Clear History
      </button>
    </aside>
  );
};

export default Sidebar;
