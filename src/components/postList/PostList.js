import React, { useState, useEffect } from 'react';
import PostDisplay from './PostDisplay';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const PostList = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const url = `https://vincephung-blog.glitch.me/api/posts`;
      const response = await fetch(url, { mode: 'cors' });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    };
    getPosts();
  }, []);
  return (
    <div className="postListContainer">
      <div>
        <Button variant="dark">
          <Link to="/posts">Create new post</Link>
        </Button>
      </div>
      {posts.map((post) => (
        <PostDisplay
          title={post.title}
          published={post.published}
          lastUpdate={post.lastUpdate}
          image={post.image}
          timestamp={post.timestamp}
          key={post._id}
          _id={post._id}
          user={user}
        />
      ))}
    </div>
  );
};

export default PostList;
