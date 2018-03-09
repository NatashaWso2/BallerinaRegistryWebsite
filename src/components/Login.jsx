import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';

export default class Login extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      redirect: false,
      cliToken: ''
    }
    this.onUserNameChange = this.onUserNameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
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

  onUserNameChange(e) {
    this.setState({
      userName: e.target.value,
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
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
      <Row>
        <Col xs={8} md={8}>
          <form>
            <FieldGroup
              key="username"
              id="formControlsText"
              type="text"
              label="Username"
              placeholder="Enter Username"
              value={this.state.userName}
              onChange={this.onUserNameChange}
            />
            <FieldGroup
              key="password"
              id="formControlsText"
              type="password"
              label="Password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
            <Button type="submit" onSubmit={this.onSubmit}>Login</Button>
          </form>
        </Col>
      </Row>
    )
  }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}