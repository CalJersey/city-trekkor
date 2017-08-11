import React, { Component } from "react";
import "../MainStyle.css";
import axios from 'axios';
import CityForm from './CityForm'




class CityList extends Component {
  constructor(props) {
    super();
    this.state = {data: []};
    this.handleCityAdd = this.handleCityAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadCityFromServer = this.loadCityFromServer.bind();
  }

  loadCityFromServer(){
    axios.get(this.props.url)
    .then(res => {
      this.setState({data: res.data.post})
    })
  }

  handleSubmit(e) {
      console.log(e);
      let city = this.state.data;
      let newCity = city.concat(e);
      this.setState({data: newCity});
      console.log(this.props.url);
      fetch(this.props.url, {
      method: 'post',
      body: e})
        .then(res => {
          console.log("RES:" , res);
          this.setState({ data: res });

        })
        .catch(err => {
          console.error("OOPSIES", err);
        });
  }

  handleCityAdd(city) {
    axios.post('api/cities', {
      name: city.name,
      imageURL: city.imageURL,
      description: city.dedscription
    })
    .then(function (response) {
       console.log(response);
     })
     .catch(function (error) {
       console.log(error);
     });
}



render() {
  return(
    <div>
      <CityForm onCitySubmit={this.handleSubmit}/>
    </div>
  )
}

}

export default CityList;
