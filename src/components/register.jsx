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
import { Redirect } from 'react-router-dom';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';
import { register } from '../api-client';

/**
 * Component for registering a user.
 * @class Register
 * @extends {React.Component}
 */
class Register extends React.Component {
    /**
     * Creates an instance of Register.
     * @param {any} props Component properties.
     * @memberof Register
     */
    constructor(props) {
        super(props);
        this.state = {
            givenName: '',
            userName: '',
            password: '',
            homeEmail: '',
            redirect: false,
        };

        this.onGivenNameChange = this.onGivenNameChange.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onHomeEmailChange = this.onHomeEmailChange.bind(this);
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
            givenName,
            userName,
            password,
            homeEmail,
        } = this.state;

        const data = {
            givenName,
            userName,
            password,
            homeEmail,
        };

        register(data)
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
                    <form onSubmit={this.onSubmit}>
                        <FieldGroup
                            key='given-name'
                            id='given-name'
                            type='text'
                            label='Name'
                            placeholder='Enter Name'
                            value={this.state.givenName}
                            onChange={this.onGivenNameChange}
                        />
                        <FieldGroup
                            key='user-name'
                            id='user-name'
                            type='text'
                            label='Username'
                            placeholder='Enter Username'
                            value={this.state.userName}
                            onChange={this.onUserNameChange}
                        />
                        <FieldGroup
                            key='password'
                            id='password'
                            type='password'
                            label='Password'
                            placeholder='Enter Password'
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                        <FieldGroup
                            key='home-email'
                            id='home-email'
                            type='text'
                            label='Email'
                            placeholder='Enter Email'
                            value={this.state.homeEmail}
                            onChange={this.onHomeEmailChange}
                        />
                        <Button type='submit'>Register</Button>
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
