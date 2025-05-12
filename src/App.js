import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import CommentList from './components/CommentList';
import LikeButton from './components/LikeButton';
import ShareButtons from './components/ShareButtons';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';


function App() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get('/api/post');
        setPost(response.data);
      } catch (error) {
        setError('Failed to load post');
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, []);

  // const handleCommentAdded = (newComment) => {
  //   setPost(prev => ({
  //     ...prev,
  //     comments: [...(prev.comments || []), newComment]
  //   }));
  // };

  if (isLoading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <div className="app">
      <div className="post-container">
        <h1>{post.title}</h1>
        <div className="post-images">
          <img src={image1} alt='' className="post-image" />
          <img src={image2} alt='' className="post-image" />
          <img src={image3} alt='' className="post-image" />
          <img src={image4} alt='' className="post-image" />
        </div>
        <p className="post-content">{post.content}</p>

        <div className="post-actions">
          <LikeButton
            postId={post.id}
            initialLikeCount={post.like_count}
            initialHasLiked={post.has_liked}
          />
          <ShareButtons />
        </div>

      </div>

      <CommentList />
    </div>
  );
}

export default App;