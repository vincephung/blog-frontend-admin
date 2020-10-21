import React, { useState } from 'react';
import AuthenticateUser from '../../authentication/AuthenticateUser';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import './form.css';

const EditPostForm = ({ match, location }) => {
  const [title, setTitle] = useState(location.state.title || '');
  const [content, setContent] = useState(location.state.content || '');
  const [published, setPublished] = useState(
    location.state.published || 'false'
  );
  const [image, setImage] = useState(location.state.image || '');
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  //try catch
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let lastUpdate = moment().format('MMMM Do[,] YYYY');
      const url = `https://vincephung-blog.glitch.me/api/posts/${match.params.id}`;
      const response = await fetch(url, {
        mode: 'cors',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthenticateUser(),
        },
        body: JSON.stringify({ title, content, published, image, lastUpdate }),
      });
      const data = await response.json();

      //handle errors
      if (response.status === 400) {
        setErrors(data);
        return;
      }
      //successful post
      history.push('/home');
    } catch (error) {
      console.log(error);
      setErrors([{ msg: 'User not authenticated, please log in to edit' }]);
    }
  };

  const handleCheck = (e) => {
    setPublished(!published);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let lastUpdate = moment().format('MMMM Do[,] YYYY');
      const url = `https://vincephung-blog.glitch.me/api/posts/${match.params.id}`;
      const response = await fetch(url, {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthenticateUser(),
        },
        body: JSON.stringify({ title, content, published, image, lastUpdate }),
      });
      const data = await response.json();

      //successful post
      history.push('/home');
    } catch (error) {
      console.log(error);
      setErrors([{ msg: 'User not authenticated, please log in to edit' }]);
    }
  };

  return (
    <div className="EditPostFormContainer">
      <form className="EditPostForm" onSubmit={handleSubmit}>
        <h1>Edit form </h1>
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
        <label htmlFor="published">
          Published?
          <input
            name="published"
            type="checkbox"
            checked={published === true ? true : false}
            onChange={handleCheck}
          />
        </label>
        <label htmlFor="image">Image URL:</label>
        <input
          name="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button className="deleteBtn" onClick={handleDelete} type="submit">
          Delete
        </button>
        <button className="submitForm" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPostForm;
