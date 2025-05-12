import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';

const LikeButton = ({ postId, initialLikeCount, initialHasLiked }) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [hasLiked, setHasLiked] = useState(initialHasLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/post/like`);
      setHasLiked(response.data.liked);
      setLikeCount(prev => response.data.liked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLike} 
      disabled={isLoading}
      className={`like-button ${hasLiked ? 'liked' : ''}`}
      aria-label={hasLiked ? 'Unlike this post' : 'Like this post'}
    >
      {hasLiked ? <FaHeart color="red" /> : <FaRegHeart />}
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;