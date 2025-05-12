import axios from 'axios';
import { useState } from 'react';

const CommentForm = ({ onCommentAdded }) => {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!authorName.trim() || !content.trim()) {
      setError('Please enter both your name and a comment');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await axios.post('/api/comments', {
        author_name: authorName,
        content
      });
      
      // Clear the form
      setContent('');
      setAuthorName('');
      
      // Notify parent component about the new comment
      onCommentAdded(response.data);
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      {error && <div className="error-message">{error}</div>}
      <div className="form-row">
        <div className="form-group name-field">
          <label htmlFor="authorName">Your Name:</label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Comment:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="form-control"
          />
        </div>
      </div>
      <button type="submit" disabled={isSubmitting} className="comment-submit-button">
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;