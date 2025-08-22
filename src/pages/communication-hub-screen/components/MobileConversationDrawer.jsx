import React from 'react';
import Icon from '../../../components/AppIcon';
import ConversationList from './ConversationList';

const MobileConversationDrawer = ({ 
  isOpen, 
  onClose, 
  conversations, 
  activeConversation, 
  onConversationSelect, 
  searchQuery, 
  onSearchChange 
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
        <div className="h-full bg-card shadow-floating">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-heading font-bold text-foreground">Messages</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          
          {/* Conversation List */}
          <div className="h-full">
            <ConversationList
              conversations={conversations}
              activeConversation={activeConversation}
              onConversationSelect={(conversation) => {
                onConversationSelect(conversation);
                onClose();
              }}
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileConversationDrawer;