/**
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';

/**
 * Component for registering a user.
 * @class Register
 * @extends {React.PureComponent}
 */
class Register extends React.PureComponent {
    /**
     * Creates an instance of Register.
     * @param {any} props Component properties.
     * @memberof Register
     */
    constructor(props) {
        super(props);
        this.state = {
            familyName: '',
            givenName: '',
            userName: '',
            password: '',
            homeEmail: '',
            workEmail: '',
            redirect: false,
        };

        this.onFamilyNameChange = this.onFamilyNameChange.bind(this);
        this.onGivenNameChange = this.onGivenNameChange.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onHomeEmailChange = this.onHomeEmailChange.bind(this);
        this.onWorkEmailChange = this.onWorkEmailChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * On register submit clicked.
     * @param {any} e Event object.
     * @memberof Register
     */
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const {
            familyName,
            givenName,
            userName,
            password,
            homeEmail,
            workEmail,
        } = this.state;

        const data = {
            familyName,
            givenName,
            userName,
            password,
            homeEmail,
            workEmail,

        };

        axios.post('http://staging.central.ballerina.io:8080/registry/register', data, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .then((response) => {
                const statusCode = response.status;
                if (statusCode === 201) {
                    this.setState({ redirect: true });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * On family name changed.
     * @param {any} e Event object.
     * @memberof Register
     */
    onFamilyNameChange(e) {
        this.setState({
            familyName: e.target.value,
        });
    }

    /**
     * On given name changed.
     * @param {any} e Event object.
     * @memberof Register
     */
    onGivenNameChange(e) {
        this.setState({
            givenName: e.target.value,
        });
    }

    /**
     * On username changed.
     * @param {any} e Event object.
     * @memberof Register
     */
    onUserNameChange(e) {
        this.setState({
            userName: e.target.value,
        });
    }

    /**
     * On password changed.
     * @param {any} e Event object.
     * @memberof Register
     */
    onPasswordChange(e) {
        this.setState({
            password: e.target.value,
        });
    }

    /**
     * On home email changed.
     * @param {any} e Event object.
     * @memberof Register
     */
    onHomeEmailChange(e) {
        this.setState({
            homeEmail: e.target.value,
        });
    }

    /**
     * On work email changed.
     * @param {any} e Event object.
     * @memberof Register
     */
    onWorkEmailChange(e) {
        this.setState({
            workEmail: e.target.value,
        });
    }

    /**
     * Render the Register component.
     * @returns {React.ReactElement} The view.
     * @memberof Register
     */
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/login' />;
        }
        return (
            <Row>
                <Col xs={8} md={8}>
                    <form>
                        <FieldGroup
                            key='family-name'
                            id='formControlsText'
                            type='text'
                            label='Family Name'
                            placeholder='Enter Family'
                            value={this.state.familyName}
                            onChange={this.onFamilyNameChange}
                        />
                        <FieldGroup
                            key='given-name'
                            id='formControlsText'
                            type='text'
                            label='Name'
                            placeholder='Enter Name'
                            value={this.state.givenName}
                            onChange={this.onGivenNameChange}
                        />
                        <FieldGroup
                            key='user-name'
                            id='formControlsText'
                            type='text'
                            label='Username'
                            placeholder='Enter Username'
                            value={this.state.userName}
                            onChange={this.onUserNameChange}
                        />
                        <FieldGroup
                            key='password'
                            id='formControlsText'
                            type='password'
                            label='Password'
                            placeholder='Enter Password'
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                        <FieldGroup
                            key='home-email'
                            id='formControlsText'
                            type='text'
                            label='Home Email'
                            placeholder='Enter Home Email'
                            value={this.state.homeEmail}
                            onChange={this.onHomeEmailChange}
                        />
                        <FieldGroup
                            key='work-email'
                            id='formControlsText'
                            type='text'
                            label='Work Email'
                            placeholder='Enter Work Email'
                            value={this.state.workEmail}
                            onChange={this.onWorkEmailChange}
                        />
                        <Button type='submit' onSubmit={this.onSubmit}>Register</Button>
                    </form>
                </Col>
            </Row>
        );
    }
}

/**
 * Renders form element.
 * @param {any} {id, label, help, ...props} Properties.
 * @returns {React.ReactElement} The view.
 */
function FieldGroup({
    id, label, help, ...props
}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

FieldGroup.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    help: PropTypes.string,
};

FieldGroup.defaultProps = {
    help: '',
};

export default Register;
