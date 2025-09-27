import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const FloatingWhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show button after a delay when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Auto-show tooltip briefly after button appears
  useEffect(() => {
    if (isVisible) {
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000); // Hide after 3 seconds
      }, 500);

      return () => clearTimeout(tooltipTimer);
    }
  }, [isVisible]);

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp business number (with country code, no + sign)
    const phoneNumber = "+94770556247"; // Example: Sri Lankan number
    
    // Pre-filled message
    const message = encodeURIComponent(
      "Hi! I'm interested in your premium used vehicle parts. Could you please help me find the right parts for my vehicle?"
    );
    
    // WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 mb-2 mr-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap animate-bounce">
          <div className="text-sm font-medium">Need help finding parts?</div>
          <div className="text-xs text-gray-600">Chat with us on WhatsApp!</div>
          
          {/* Tooltip arrow */}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          
          {/* Close button */}
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
          >
            <FaTimes size={10} />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Ripple effect */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30"></div>
        
        {/* WhatsApp Icon */}
        <FaWhatsapp 
          size={24} 
          className="relative z-10 drop-shadow-sm" 
        />
        
        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </button>
    </div>
  );
};

export default FloatingWhatsAppButton;