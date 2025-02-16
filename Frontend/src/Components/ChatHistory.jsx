import React from 'react';




const ChatHistory = ({ chats, currentChatId, onSelectChat, onDeleteChat }) => {
  return (
    <div className="chat-history">
      {chats.map((chat) => (
        <div 
          key={chat.id} 
          className={`chat-history-item ${chat.id === currentChatId ? 'active' : ''}`}
          onClick={() => onSelectChat(chat.id)}
        >
          <span>{chat.title}</span>
          <button onClick={(e) => { e.stopPropagation(); onDeleteChat(chat.id); }}>🗑️</button>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;