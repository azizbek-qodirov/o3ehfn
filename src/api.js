// src/api.js
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch the post with like data
export const fetchPost = async () => {
  const response = await fetch(`${API_BASE_URL}/post`);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.json();
};

// Toggle like on the post
export const toggleLikePost = async () => {
  const response = await fetch(`${API_BASE_URL}/post/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to toggle like');
  }
  
  return response.json();
};

// Fetch all comments for the post
export const fetchComments = async () => {
  const response = await fetch(`${API_BASE_URL}/comments`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

// Add a new comment
export const addComment = async (content, userName) => {
  const response = await fetch(`${API_BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content, userName })
  });
  
  if (!response.ok) {
    throw new Error('Failed to add comment');
  }
  
  return response.json();
};

// Delete a comment
export const deleteComment = async (id) => {
  const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete comment');
  }
  
  return response.json();
};

// Toggle like on a comment
export const toggleLikeComment = async (id) => {
  const response = await fetch(`${API_BASE_URL}/comments/${id}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to toggle comment like');
  }
  
  return response.json();
};

// Share functionality - returns share URL
export const getShareUrl = () => {
  return window.location.href;
};