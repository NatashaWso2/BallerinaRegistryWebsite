import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

export default class Login extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      redirect: false,
      cliToken: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
    const {userName, password} = this.state
    let data = {
      userName: userName,
      password: password,
    }

    axios.post('http://staging.central.ballerina.io:8080/registry/login', data, {
      'withCredentials': true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        console.log(response)
        const statusCode = response.status
        if (statusCode == 200) {
          const cookies = new Cookies()
          cookies.set('userLogged', this.state.userName, {path: '/'})

          const accessTokenSH = response.data.accessTokenSH;
          cookies.set('accessTokenSH', accessTokenSH, {path: '/'})

          const cliAccessToken = response.data.cliToken;
          this.setState({redirect: true, cliToken: cliAccessToken})
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
    const {redirect, cliToken} = this.state
    if (redirect) {
        return <Redirect to={{
        pathname: '/packages',
        cliToken: cliToken
      }}/>

    }
    return (
      <form onSubmit={this.onSubmit}>
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
        <button type="submit">Login</button>
      </form>
    )
  }
}