'use client';

import React, { useState } from 'react';

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today? You can ask questions like:\n- What is your email?\n- How do I track my order?\n- What payment methods do you accept?\n- How can I request a refund?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Function to handle sending a message
  const sendMessage = (userInput: string) => {
    if (userInput.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: userInput }
      ]);
      setIsTyping(true);

      setTimeout(() => {
        let botResponse = '';
        const userQuery = userInput.toLowerCase();

        if (userQuery.includes('email')) {
          botResponse = 'You can contact us at: support@ahmedfabs.com';
        } else if (userQuery.includes('track order')) {
          botResponse = 'To track your order, use the tracking link sent to your home page after the order is shipped.';
        } else if (userQuery.includes('payment methods')) {
          botResponse = 'We accept the following payment methods: Credit/Debit cards, PayPal, and Bank Transfer.';
        } else if (userQuery.includes('refund') || userQuery.includes('return')) {
          botResponse = 'For returns or refunds, please visit our "Returns & Exchanges" page for more information.';
        } else if (userQuery.includes('order')) {
          botResponse = 'To place an order, simply select the products, add them to the cart, and proceed to checkout.';
        } else if (userQuery.includes('shipping')) {
          botResponse = 'We offer affordable shipping rates. Free shipping is not available, However shipping is 50$, and tax is 50$.';
        } else if (userQuery.includes('business hours')) {
          botResponse = 'Our business hours are Monday to Friday, from 9 AM to 6 PM (GMT).';
        } else if (userQuery.includes('customer support')) {
          botResponse = 'You can reach customer support at: support@ahmedfabs.com.';
        } else if (userQuery.includes('how to order')) {
          botResponse = 'To place an order, simply choose the products you want, add them to your cart, and proceed to checkout.';
        } else {
          botResponse = 'Sorry, I didn’t understand that. Could you please ask something else?';
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botResponse }
        ]);
        setIsTyping(false);
      }, 1000);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Please type a question before sending.' }
      ]);
    }
  };

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const handlePredefinedOption = (option: string) => {
    sendMessage(option);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      {/* Chat Icon at the Bottom */}
      <div
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 z-50"
      >
        <span role="img" aria-label="robot">🤖</span>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-80 flex justify-center items-center z-49">
          <div className="w-[90%] max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden h-[450px]">
            <div className="flex flex-col h-full"> {/* Increased height */}
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="p-2 bg-gray-200 text-gray-500 rounded-lg">
                      <div className="animate-pulse">...</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Scrollable Questions */}
              <div className="bg-gray-100 p-2 space-y-2 overflow-y-auto max-h-40">
                <button
                  className="w-full p-2 bg-blue-200 text-blue-700 rounded-lg"
                  onClick={() => handlePredefinedOption('What is your email?')}
                >
                  What is your email?
                </button>
                <button
                  className="w-full p-2 bg-blue-200 text-blue-700 rounded-lg"
                  onClick={() => handlePredefinedOption('track order')}
                >
                  How do I track my order?
                </button>
                <button
                  className="w-full p-2 bg-blue-200 text-blue-700 rounded-lg"
                  onClick={() => handlePredefinedOption('What payment methods do you accept?')}
                >
                  What payment methods do you accept?
                </button>
                <button
                  className="w-full p-2 bg-blue-200 text-blue-700 rounded-lg"
                  onClick={() => handlePredefinedOption('How can I request a refund?')}
                >
                  How can I request a refund?
                </button>
                <button
                  className="w-full p-2 bg-blue-200 text-blue-700 rounded-lg"
                  onClick={() => handlePredefinedOption('How do I place an order?')}
                >
                  How do I place an order?
                </button>
                <button
                  className="w-full p-2 bg-blue-200 text-blue-700 rounded-lg"
                  onClick={() => handlePredefinedOption('What is your return policy?')}
                >
                  What is your return policy?
                </button>
                <button
                  className="w-full p-2 bg-blue-200 text-blue-700 rounded-lg"
                  onClick={() => handlePredefinedOption('Do you offer free shipping?')}
                >
                  Do you offer free shipping?
                </button>
                <button
                  className="w-full p-2 bg-blue-200 text-blue-700 rounded-lg"
                  onClick={() => handlePredefinedOption('How do I contact customer support?')}
                >
                  How do I contact customer support?
                </button>
                <button
                  className="w-full p-2 bg-blue-200 text-blue-700 rounded-lg"
                  onClick={() => handlePredefinedOption('What are your business hours?')}
                >
                  What are your business hours?
                </button>
              </div>

              {/* Input Field */}
              <div className="p-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder="Type your question..."
                  className="w-full p-2 bg-gray-200 rounded-lg"
                />
                <button
                  onClick={() => sendMessage(userInput)}
                  className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
