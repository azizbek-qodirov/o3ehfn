import { useState } from 'react';
import { FaCheck, FaShare } from 'react-icons/fa';

const ShareButtons = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const currentUrl = window.location.href;

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    if (isPopupOpen) {
      setIsCopied(false);
    }
  };

  const copyToClipboard = () => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = currentUrl;
    textarea.style.position = 'fixed';  // Prevent scrolling to bottom
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      // Try using the modern clipboard API first
      if (navigator.clipboard) {
        navigator.clipboard.writeText(currentUrl)
          .then(() => {
            showSuccess();
          })
          .catch(() => {
            fallbackCopy();
          });
      } else {
        // Fallback for older browsers
        fallbackCopy();
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const fallbackCopy = () => {
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showSuccess();
      } else {
        console.error('Fallback copy failed');
      }
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
  };

  const showSuccess = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="share-container">
      <button className="share-button" onClick={togglePopup}>
        <FaShare /> Share
      </button>

      {isPopupOpen && (
        <div className="share-popup">
          <div className="share-url">
            <input 
              type="text" 
              value="https://shikoyat.netlify.app" 
              readOnly 
              onClick={(e) => e.target.select()}
              aria-label="Share URL"
            />
          </div>
          <button 
            className={`copy-button ${isCopied ? 'copied' : ''}`}
            onClick={copyToClipboard}
            disabled={isCopied}
          >
            {isCopied ? (
              <>
                <FaCheck className="icon" /> Copied!
              </>
            ) : (
              'Copy Link'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;