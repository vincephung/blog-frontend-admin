import React, { useState, useEffect } from 'react';
import CommentDisplay from './CommentDisplay';

const Comments = ({ match }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const url = `https://vincephung-blog.glitch.me/api/posts/${match.params.id}/comments`;
      const response = await fetch(url, { mode: 'cors' });
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    };
    getComments();
  }, [match.params.id]);
  return (
    <div className="commentContainer">
      {comments.map((comment) => (
        <CommentDisplay
          key={comment._id}
          author={comment.author}
          content={comment.content}
          timestamp={comment.timestamp}
        />
      ))}
    </div>
  );
};

export default Comments;
