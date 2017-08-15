
import React, { Component } from "react";
import axios from "axios";
import PostList from "./PostList";
import PostForm from "./PostForm";
import $ from 'jquery-ajax';

class PostBox extends Component {
  constructor(props) {
    super();
    this.state = {
      data: []
    };
    this.handlePostDelete = this.handlePostDelete.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.loadPostsFromServer = this.loadPostsFromServer.bind(this);
    this.handlePostUpdate = this.handlePostUpdate.bind(this);

    // switch (this.props.postObjType) {
    //   case 'city':
    //     this.setState({postObjType:this.props.postObjType})
    //     if (this.props.postCityId){
    //       this.setState({postCityId:this.props.postCityId})
    //     } else {
    //       this.setState({postCityId:0})
    //     }
    //     break;
    //   case 'user':
    //     this.setState({postObjType:this.props.postObjType})
    //     if (this.props.postUserId){
    //       this.setState({postCityId:this.props.postUserId})
    //     } else {
    //       this.setState({postUserId:0})
    //     }
    //     break;
    //   default:
    //     this.setState({postObjType:''})
    //     this.setState({postCityId:0})
    //     this.setState({postUserId:0})
    // }
  }

  loadPostsFromServer() {
      // let posts_list = [
      //   {
      //     _id:1,
      //     title: 'This place rocks!',
      //     text: 'omg my favorite place',
      //     user: {_id:23,username:'Jed'},
      //     city: {_id:45,name:'Jedcity'}
      //   },
      //   {
      //     _id:2,
      //     title: 'Tattooed offal heirloom lumbersexual',
      //     text: 'Hexagon mumblecore tilde bushwick.',
      //     user: {_id:34,username:'mami'},
      //     city: {_id:33,name:'Miami'}
      //   },
      //   {
      //     _id:3,
      //     title: 'Cold pressed health goth',
      //     text: 'Shoreditch PBR&B celiac, ethical jean shorts 90s neutra slow-carb.',
      //     user: {_id:89,username:'moron'},
      //     city: {_id:78,name:'jerksVille'}
      //   }
      // ];

    axios.get(`${this.props.citiesPostUrl}${this.props.cityId}`).then(res => {
      console.log(res.data)
      this.setState({ data: res.data.posts });
    })
  }

  handlePostSubmit(e) {
    //console.log(e);
    let post = this.state.data;
    //console.log(post)
    e.userId = this.props.userId; //  user_id
    e.cityId = this.props.cityId; // city_id
    //post.concat(e);
    let newPost = e;

    //this.setState({ data: newPost });
    axios
      .post(this.props.postUrl,newPost)
      .then(res => {

        newPost['_id'] = res.data['_id']

        post.unshift(newPost)
      this.loadPostsFromServer()  

        //handleAddPost(res);
      })
      .catch(err => {
        console.error('OOPSIES', err);
      });
  }

  handlePostDelete(id) {
    axios
      .delete(`${this.props.postUrl}${id}`)
      .then(res => {
        console.log('Post Deleted');
        let posts = this.state.data.filter(function(post) {
          return post._id !== res._id;
        });
          this.loadPostsFromServer()
        })
      .catch(err => {
        console.log(err);
      });
  }
  handlePostUpdate(id, post) {
    //sends the post
    $.ajax({
      method: "put",
      url: `${this.props.postUrl}${id}`,
      data: post
    }).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  componentDidMount() {
    this.loadPostsFromServer()
  }
  render() {
    return (
      <div className="PostBox">
          <h2>What people say:</h2>
          <div className="row">
            <div className="col-sm-2">
          <PostForm onPostSubmit={ this.handlePostSubmit }/>
          </div>
            <div className="col-sm-2">
          <PostList
            loadPostsFromServer={this.loadPostsFromServer}
            onPostDelete={this.handlePostDelete}
            onPostUpdate={this.handlePostUpdate}
            data={this.state.data}
          />
            </div>
        </div>
     </div>

    );
  }
}

export default PostBox;
