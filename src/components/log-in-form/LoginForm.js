import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ message: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = `https://vincephung-blog.glitch.me/api/log-in`;
    const response = await fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const user = await response.json();

    //if user has a token means that login was successful
    if (user.token) {
      localStorage.setItem('user', JSON.stringify(user));
      history.push({
        pathname: `/home`,
      });
      window.location.reload();
      return;
    }
    //if user enters wrong username/password
    setError(user);
    setUsername('');
    setPassword('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === 'username' ? setUsername(value) : setPassword(value);
  };

  return (
    <div className="form-container" onSubmit={handleLogin}>
      <form className="log-in-form">
        <p>{error.message}</p>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
