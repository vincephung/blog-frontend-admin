import React from 'react';

const CommentDisplay = (props) => {
  return (
    <div className="comment">
      <h1>{props.author}</h1>
      <p>{props.content}</p>
      <p>{props.timestamp}</p>
    </div>
  );
};

export default CommentDisplay;
