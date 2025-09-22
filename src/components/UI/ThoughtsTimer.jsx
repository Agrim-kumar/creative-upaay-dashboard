import React, { useState } from 'react';
import { Lightbulb, MessageSquare, Send, X } from 'lucide-react';
import Modal from './Modal'; // Fixed import path

const ThoughtsTimer = () => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message.trim(),
        timestamp: new Date(),
        user: 'You'
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setShowMessageModal(false);
      
      // Show success feedback
      setTimeout(() => {
        alert('Message shared with your team!');
      }, 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Lightbulb className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-yellow-800">
              Thoughts Time
            </h3>
            <p className="mt-2 text-sm text-yellow-700">
              We don't have any notice for you, till then you can share your thoughts with your peers.
            </p>
            
            {/* Message Count */}
            {messages.length > 0 && (
              <div className="mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {messages.length} message{messages.length !== 1 ? 's' : ''} shared
                </span>
              </div>
            )}
            
            <div className="mt-4">
              <button
                onClick={() => setShowMessageModal(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Write a message
              </button>
            </div>
          </div>
        </div>
        
        {/* Recent messages preview */}
        {messages.length > 0 && (
          <div className="mt-4 space-y-2 max-h-32 overflow-y-auto">
            {messages.slice(-2).map((msg) => (
              <div key={msg.id} className="bg-white bg-opacity-50 rounded p-2 text-xs">
                <p className="text-yellow-800">{msg.text}</p>
                <p className="text-yellow-600 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title="Share Your Thoughts"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              What's on your mind?
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 resize-none"
              placeholder="Share your thoughts with the team..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowMessageModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ThoughtsTimer;