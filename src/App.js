import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/log-in-form/LoginForm';
import PostForm from './components/postForm/PostForm';
import EditPostForm from './components/postForm/EditPostForm';
import PostList from './components/postList/PostList';
import Comments from './components/comments/Comments';
import Nav from './Nav';
import Error from './Error';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router basename="/blog-frontend-admin">
      <Nav />
      <Switch>
        <Route exact path="/home" component={PostList} />
        <Route exact path="/log-in" component={LoginForm} />
        <Route exact path="/posts" component={PostForm} />
        <Route exact path="/posts/:id/" component={EditPostForm} />
        <Route exact path="/posts/:id/comments" component={Comments} />
        <Route path="/" component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
