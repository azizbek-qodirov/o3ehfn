import axios from 'axios';
import { useEffect, useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('/api/comments');
        setComments(response.data);
      } catch (error) {
        setError('Failed to load comments');
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  // Function to handle new comment addition
  const handleNewComment = (newComment) => {
    // Add is_author flag to the new comment
    const commentWithAuthorFlag = {
      ...newComment,
      is_author: 1 // Mark as author since they just posted it
    };
    setComments(prev => [commentWithAuthorFlag, ...prev]);
  };

  // Function to handle comment deletion
  const handleDeleteComment = (commentId) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  // Function to handle comment like toggle
  const handleLikeToggle = (commentId, liked) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          has_liked: liked,
          like_count: liked ? c.like_count + 1 : c.like_count - 1
        };
      }
      return c;
    }));
  };

  if (isLoading) return <div className="loading">Loading comments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="comments-section">
      <h2>Comments</h2>
      <CommentForm onCommentAdded={handleNewComment} />
      <div className="comment-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <Comment 
              key={comment.id} 
              comment={comment} 
              onDelete={handleDeleteComment}
              onLikeToggle={handleLikeToggle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;