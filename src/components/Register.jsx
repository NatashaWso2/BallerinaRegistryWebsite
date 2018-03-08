import React from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";

export default class Register extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      familyName: '',
      givenName: '',
      userName: '',
      password: '',
      homeEmail: '',
      workEmail: '',
      redirect: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (e) {
    e.preventDefault();
    console.log(this.state)
    const {familyName, givenName, userName, password, homeEmail, workEmail} = this.state;
    let data ={
      familyName: familyName,
      givenName: givenName,
      userName: userName,
      password: password,
      homeEmail: homeEmail,
      workEmail: workEmail,

    };

    axios.post('http://staging.central.ballerina.io:8080/registry/register', data, {
      'withCredentials': true,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode == 201) {
          this.setState({ redirect: true });
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render () {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/login' />;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Family Name:
          <input
            name="familyName"
            type="text"
            value={this.state.familyName}
            onChange={this.handleInputChange}/>
        </label> <br/> <br/>
        <label>
          Name:
          <input
            name="givenName"
            type="text"
            value={this.state.givenName}
            onChange={this.handleInputChange}/>
        </label> <br/> <br/>
        <label>
          UserName:
          <input
            name="userName"
            type="text"
            value={this.state.userName}
            onChange={this.handleInputChange}/>
        </label> <br/> <br/>
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}/>
        </label> <br/> <br/>
        <label>
          Home Email:
          <input
            name="homeEmail"
            type="text"
            value={this.state.homeEmail}
            onChange={this.handleInputChange}/>
        </label> <br/> <br/>
        <label>
          WorkvEmail:
          <input
            name="workEmail"
            type="text"
            value={this.state.workEmail}
            onChange={this.handleInputChange}/>
        </label> <br/> <br/>
        <button type="submit">Register</button>
      </form>
    )
  }
}