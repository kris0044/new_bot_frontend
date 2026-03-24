import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const res = await axios.get('/api/conversations');
      setConversations(res.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/ask-ai', { prompt: input });
      const aiMessage = { role: 'assistant', content: res.data.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'assistant', content: `Error: ${error.response?.data?.error || error.message}` };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConversation = async () => {
    if (messages.length < 2) {
      alert('No conversation to save');
      return;
    }

    const userMsg = messages.find(m => m.role === 'user');
    const aiMsg = messages.find(m => m.role === 'assistant');

    if (!userMsg || !aiMsg) {
      alert('Incomplete conversation');
      return;
    }

    try {
      await axios.post('/api/save', { prompt: userMsg.content, response: aiMsg.content });
      alert('Conversation saved!');
      fetchConversations();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save');
    }
  };

  const handleLoadConversation = (conv) => {
    setMessages([
      { role: 'user', content: conv.prompt },
      { role: 'assistant', content: conv.response }
    ]);
    setShowSidebar(false);
  };

  const handleDeleteConversation = async (id) => {
    try {
      await axios.delete(`/api/conversations/${id}`);
      fetchConversations();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Bot</h2>
          <button className="close-btn" onClick={() => setShowSidebar(false)}>✕</button>
        </div>
        
        <button className="new-chat-btn" onClick={handleNewChat}>+ New Chat</button>
        
        <div className="conversations-list">
          <h3>History</h3>
          {conversations.length === 0 ? (
            <p className="empty-text">No conversations yet</p>
          ) : (
            conversations.map((conv) => (
              <div key={conv._id} className="conversation-item">
                <div className="conv-content" onClick={() => handleLoadConversation(conv)}>
                  <p>{conv.prompt.substring(0, 40)}...</p>
                  <span className="conv-date">{new Date(conv.timestamp).toLocaleDateString()}</span>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteConversation(conv._id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main-content">
        <div className="header">
          <button className="menu-btn" onClick={() => setShowSidebar(!showSidebar)}>☰</button>
          <h1>AI Chat</h1>
          <div className="header-spacer"></div>
        </div>

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-state">
              <h2>Start a new conversation</h2>
              <p>Ask me anything</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-content">
                  <p>{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="message assistant">
              <div className="message-content">
                <span className="typing">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <div className="input-wrapper">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              rows={1}
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="send-btn"
            >
              ➤
            </button>
          </div>
          <div className="action-buttons">
            <button onClick={handleSaveConversation} disabled={messages.length < 2}>
              💾 Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;