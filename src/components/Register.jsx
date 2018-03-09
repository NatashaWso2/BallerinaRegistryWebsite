import React from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';

class Register extends React.PureComponent {
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

    this.onFamilyNameChange = this.onFamilyNameChange.bind(this);
    this.onGivenNameChange = this.onGivenNameChange.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onHomeEmailChange = this.onHomeEmailChange.bind(this);
    this.onWorkEmailChange = this.onWorkEmailChange.bind(this);
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

  onFamilyNameChange (e) {
    this.setState({
      familyName: e.target.value,
    });
  }

  onGivenNameChange(e) {
    this.setState({
      givenName: e.target.value,
    });
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

  onHomeEmailChange(e) {
    this.setState({
      homeEmail: e.target.value,
    });
  }

  onWorkEmailChange(e) {
    this.setState({
      workEmail: e.target.value,
    });
  }

  render () {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/login' />;
    }
    return (
        <Row>
          <Col xs={8} md={8}>
            <form>
                <FieldGroup
                  key="family-name"
                  id="formControlsText"
                  type="text"
                  label="Family Name"
                  placeholder="Enter Family"
                  value={this.state.familyName}
                  onChange={this.onFamilyNameChange}
                />
                <FieldGroup
                  key="given-name"
                  id="formControlsText"
                  type="text"
                  label="Name"
                  placeholder="Enter Name"
                  value={this.state.givenName}
                  onChange={this.onGivenNameChange}
                />
                <FieldGroup
                  key="user-name"
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
                <FieldGroup
                  key="home-email"
                  id="formControlsText"
                  type="text"
                  label="Home Email"
                  placeholder="Enter Home Email"
                  value={this.state.homeEmail}
                  onChange={this.onHomeEmailChange}
                /> 
                <FieldGroup
                  key="work-email"
                  id="formControlsText"
                  type="text"
                  label="Work Email"
                  placeholder="Enter Work Email"
                  value={this.state.workEmail}
                  onChange={this.onWorkEmailChange}
                /> 
                <Button type="submit" onSubmit={this.onSubmit}>Register</Button>
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

export default Register;