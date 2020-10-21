import React, { useState } from 'react';
import AuthenticateUser from '../../authentication/AuthenticateUser';
import { useHistory } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState('false');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://vincephung-blog.glitch.me/api/posts`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthenticateUser(),
        },
        mode: 'cors',
        body: JSON.stringify({ title, content, published, image }),
      });
      const data = await response.json();
      console.log(response);
      //handle errors
      if (response.status === 400) {
        setErrors(data);
        return;
      }
      //successful post
      history.push('/home');
    } catch (error) {
      console.log(error);
      setErrors([{ msg: 'User not authenticated, please log in to post' }]);
    }
  };

  const handleCheck = (e) => {
    setPublished(!published);
  };

  return (
    <div className="postFormContainer">
      <form className="postForm" onSubmit={handleSubmit}>
        <div>
          {errors.map((err) => (
            <li key={err.msg}>{err.msg}</li>
          ))}
        </div>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="content">Post Content:</label>
        <textarea
          rows="3"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <label htmlFor="published">Published? </label>
        <input
          name="published"
          type="checkbox"
          checked={published === true ? true : false}
          onChange={handleCheck}
        />
        <label htmlFor="image">Image URL:</label>
        <input
          name="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="submitForm" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
