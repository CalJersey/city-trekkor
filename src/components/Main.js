import React, { Component } from "react";
import Header from "./Header";
import $ from "jquery-ajax";
import { Link } from "react-router";
// import { browserHistory } from "react-router";
import CityContainer from "./CityContainer";
import PostBox from "./PostBox";
import PageContent from "./PageContent";
import CityInfo from "./CityInfo";
import CityList from "./CityList";
// Card, Row, Col,
import { Button, Input } from "react-materialize";
import "../MainStyle.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      id: "",
      isAuthenticated: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    $.ajax({
      method: "POST",
      url: `http://localhost:3001/login`,
      data: {
        username: username,
        password: password
      }
    }).then(
      res => {
        console.log("res is ", res);
        this.setState({ isAuthenticated: true, id: res._id });
      },
      err => {
        console.log("oops!");
        console.log(err);
      }


    );
  }
  handleLogout() {
    this.setState({ isAuthenticated: false, id: "" });
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  getInitialState() {
    return {
      isAuthenticated: false
    };
    }
  renderAuthenticationForm(){
    if (this.state.isAuthenticated === false) {
      console.log("user is not logged in");
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <Input
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <Button type="submit" value="login">
              Login
            </Button>
          </form>
          <Link role="button" to="signup">
            Signup
          </Link>
        </div>
      );
    } else {
      console.log("user is logged in");
      return (
        <div className="authenticationForm">
          <div>
            <p>logged in</p>
          </div>
          <Button className="logout-button" onClick={this.handleLogout}>
            Logout
          </Button>
        </div>


      );
    }
  }
  render() {
    let AuthFormContent = this.renderAuthenticationForm();
    return (
      <div className="main">
        { AuthFormContent }

        <Header handleSubmit={event => this.handleSubmit} />
        <PageContent />
        <CityContainer
          isAuthenticated={this.state.isAuthenticated}
          username={this.state.username}
          id={this.state.id}/>
        <CityInfo />
        <PostBox />
      </div>
    )
  }
}

export default Main;
