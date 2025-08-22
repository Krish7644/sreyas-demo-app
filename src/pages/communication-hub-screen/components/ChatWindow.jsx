import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatWindow = ({ conversation, messages, onSendMessage, currentUser }) => {
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const spiritualEmojis = ['🙏', '🕉️', '🪷', '📿', '🔔', '🌸', '✨', '💫', '🌺', '🎭', '🎪', '🎨'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage({
        id: Date.now(),
        text: messageText,
        sender: currentUser,
        timestamp: new Date(),
        type: 'text'
      });
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onSendMessage({
        id: Date.now(),
        text: `Shared a file: ${file.name}`,
        sender: currentUser,
        timestamp: new Date(),
        type: 'file',
        fileName: file.name,
        fileSize: file.size
      });
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const dateKey = new Date(message.timestamp).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageCircle" size={32} className="text-primary" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Welcome to Communication Hub
          </h3>
          <p className="text-sm font-body text-muted-foreground max-w-sm">
            Select a conversation from the sidebar to start messaging with your spiritual community
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border shadow-soft">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {conversation.isGroup ? (
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="Users" size={20} color="white" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
                <Image 
                  src={conversation.avatar} 
                  alt={conversation.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {conversation.isOnline && !conversation.isGroup && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-card rounded-full"></div>
            )}
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-foreground">{conversation.name}</h3>
            <p className="text-xs font-caption text-muted-foreground">
              {conversation.isGroup 
                ? `${conversation.memberCount} members` 
                : conversation.isOnline ? 'Online' : 'Last seen recently'
              }
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {conversation.type === 'service' && (
            <Button variant="outline" size="sm" iconName="AlertCircle">
              Report Issue
            </Button>
          )}
          <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle">
            <Icon name="Phone" size={18} />
          </button>
          <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle">
            <Icon name="Video" size={18} />
          </button>
          <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle">
            <Icon name="MoreVertical" size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups).map(([dateKey, dayMessages]) => (
          <div key={dateKey}>
            {/* Date Separator */}
            <div className="flex items-center justify-center my-6">
              <div className="bg-muted px-3 py-1 rounded-full">
                <span className="text-xs font-caption text-muted-foreground">
                  {formatDate(new Date(dateKey))}
                </span>
              </div>
            </div>

            {/* Messages for this date */}
            {dayMessages.map((message, index) => {
              const isCurrentUser = message.sender.id === currentUser.id;
              const showAvatar = !isCurrentUser && (index === 0 || dayMessages[index - 1].sender.id !== message.sender.id);
              
              return (
                <div
                  key={message.id}
                  className={`flex items-end space-x-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isCurrentUser && (
                    <div className="w-8 h-8 flex-shrink-0">
                      {showAvatar && (
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
                          <Image 
                            src={message.sender.avatar} 
                            alt={message.sender.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-1' : ''}`}>
                    {!isCurrentUser && showAvatar && (
                      <p className="text-xs font-caption text-muted-foreground mb-1 ml-2">
                        {message.sender.name}
                      </p>
                    )}
                    
                    <div
                      className={`
                        px-4 py-2 rounded-2xl shadow-soft
                        ${isCurrentUser 
                          ? 'bg-primary text-primary-foreground rounded-br-md' 
                          : 'bg-card text-foreground rounded-bl-md border border-border'
                        }
                      `}
                    >
                      {message.type === 'file' ? (
                        <div className="flex items-center space-x-2">
                          <Icon name="Paperclip" size={16} />
                          <div>
                            <p className="text-sm font-body">{message.fileName}</p>
                            <p className="text-xs opacity-75">
                              {(message.fileSize / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm font-body whitespace-pre-wrap">{message.text}</p>
                      )}
                    </div>
                    
                    <p className={`text-xs font-caption text-muted-foreground mt-1 ${isCurrentUser ? 'text-right' : 'text-left'} ml-2`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
            <span className="text-xs font-caption text-muted-foreground">Someone is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-card border-t border-border">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="mb-3 p-3 bg-muted rounded-lg">
            <div className="flex flex-wrap gap-2">
              {spiritualEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMessageText(prev => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="text-lg hover:bg-background rounded p-1 transition-gentle"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-end space-x-2">
          <div className="flex space-x-1">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
            >
              <Icon name="Smile" size={20} />
            </button>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,document/*"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
            >
              <Icon name="Paperclip" size={20} />
            </button>
          </div>

          <div className="flex-1 relative">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-2 bg-muted border border-border rounded-lg resize-none text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            variant="default"
            size="icon"
            iconName="Send"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;