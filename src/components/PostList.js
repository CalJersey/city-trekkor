
import React, { Component } from 'react';
import Post from './Post';
import '../MainStyle.css';

class PostList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let postNodes = this.props.data.map(post => {
      return <Post text={post.text} title={post.title} id={post['_id']} key={post['_id']} />;
    });
    return (
      <div className="PostList">

        <div className="row container">

          <div className="col-sm-3"></div>

        <div className="col-sm-6 post-text">
        {postNodes}

      </div>
        <div className="col-sm-3">
        </div>
      </div>

      </div>

    );
  }
}

export default PostList;
