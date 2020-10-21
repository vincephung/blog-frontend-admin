import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import GetUser from './authentication/GetUser';
import Logout from './authentication/Logout';

const Nav = () => {
  const user = GetUser();
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/home">Blog Home</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {user ? (
          <div>
            <Navbar.Text>Signed in as: {user.username}</Navbar.Text>
            <Button variant="dark" onClick={Logout}>
              <Link to="/home">Sign out </Link>
            </Button>
          </div>
        ) : (
          <Button variant="dark">
            <Link to="/log-in">Log in </Link>
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
