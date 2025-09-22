import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Modal from '../Common/Modal';

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
      setTimeout(() => {
        alert('Message shared with your team!');
      }, 100);
    }
  };

  return (
    <>
      {/* Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title="Share Your Thoughts"
        size="md"
      >
        {/* Modal content here */}
      </Modal>
    </>
  );
};

export default ThoughtsTimer;
