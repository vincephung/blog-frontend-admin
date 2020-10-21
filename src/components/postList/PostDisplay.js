import React from 'react';
import { useHistory } from 'react-router-dom';
import AuthenticateUser from '../../authentication/AuthenticateUser';
import './post.css';

const PostDisplay = (props) => {
  //const [published, setPublished] = useState();
  const history = useHistory();

  const showComments = (e) => {
    e.preventDefault();
    //once you get comments
    history.push({
      pathname: `/posts/${props._id}/comments`,
    });
  };

  const editPost = async (e) => {
    e.preventDefault();
    const url = `https://vincephung-blog.glitch.me/api/posts/${props._id}`;
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    //get post data
    const { title, content, published, image } = data;
    history.push({
      pathname: `/posts/${props._id}`,
      state: { title, content, published, image },
    });
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    const url = `https://vincephung-blog.glitch.me/api/posts/${props._id}/publish`;
    const response = await fetch(url, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AuthenticateUser(),
      },
      body: JSON.stringify({ published: !props.published }),
    });
    const data = await response.json();
    window.location.reload();
  };

  return (
    <div className="postContainer">
      <div className="postSection">
        <h1 className="postTitle">{props.title}</h1>
        <hr />
        <p className="postDate">Posted on {props.timestamp}</p>
        <hr />
        <img className="postPicture" src={props.image} alt="post img"></img>
        <hr />
        <p className="postContent">{props.postContent}</p>
        <p className="postPublished">Published : {String(props.published)}</p>
        <hr />
        <button className="showComments" onClick={showComments}>
          Show comments
        </button>
        <button className="publishPost" onClick={handlePublish}>
          Publish/Unpublish
        </button>
        <button className="editPost" onClick={editPost}>
          Edit Post
        </button>
      </div>
    </div>
  );
};

export default PostDisplay;
