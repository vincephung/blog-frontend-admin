import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h2>
        This page does not exist.
        <Link to="/home">Click this to go back to the homepage.</Link>
      </h2>
    </div>
  );
};

export default ErrorPage;
