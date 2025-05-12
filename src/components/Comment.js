import axios from 'axios';
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';

const Comment = ({ comment, onDelete, onLikeToggle }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const handleDelete = async () => {
    if (comment.is_author !== 1) return;

    setIsDeleting(true);
    try {
      await axios.delete(`/api/comments/${comment.id}`);
      onDelete(comment.id);
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLikeToggle = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      const response = await axios.post(`/api/comments/${comment.id}/like`);
      onLikeToggle(comment.id, response.data.liked);
    } catch (error) {
      console.error('Error toggling comment like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className={`comment ${comment.is_author === 1 ? 'is_author' : ''}`}>
      <div className="comment-header">
        <span className="comment-author">{comment.author_name}</span>
        <span className="comment-date">
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-actions">
        <button
          onClick={handleLikeToggle}
          disabled={isLiking}
          className={`comment-action like ${comment.has_liked ? 'liked' : ''}`}
        >
          {comment.has_liked ? <FaHeart /> : <FaRegHeart />}
          <span>{comment.like_count}</span>
        </button>

        {comment.is_author === 1 && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="comment-action delete"
          >
            <FaTrash />
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;