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
import Cookies from 'universal-cookie';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';
import { login } from '../api-client';

/**
 * Login component.
 */
class Login extends React.Component {
    /**
     * Component constructor
     * @param {*} props properties
     */
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            redirect: false,
            cliToken: '',
        };
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Login handler
     * @param {object} e Event object.
     */
    onSubmit(e) {
        e.preventDefault();
        const { userName, password } = this.state;
        const data = {
            userName,
            password,
        };

        login(data)
            .then((response) => {
                console.log(response);
                const statusCode = response.status;
                if (statusCode === 200) {
                    const cookies = new Cookies();
                    cookies.set('userLogged', this.state.userName, { path: '/' });

                    const { accessTokenSH } = response.data;
                    cookies.set('accessTokenSH', accessTokenSH, { path: '/' });

                    const cliAccessToken = response.data.cliToken;
                    this.setState({ redirect: true, cliToken: cliAccessToken });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * On username change handler.
     * @param {any} e Event object
     * @memberof Login
     */
    onUserNameChange(e) {
        this.setState({
            userName: e.target.value,
        });
    }

    /**
     * On password change handler.
     * @param {any} e Event object.
     * @memberof Login
     */
    onPasswordChange(e) {
        this.setState({
            password: e.target.value,
        });
    }

    /**
     * Rendering the login component view
     * @returns {React.ReactElement} The view.
     * @memberof Login
     */
    render() {
        const { redirect, cliToken } = this.state;
        if (redirect) {
            return (<Redirect to={{
                pathname: '/',
                cliToken,
            }}
            />);
        }
        return (
            <Row>
                <Col xs={8} md={8}>
                    <form onSubmit={this.onSubmit}>
                        <FieldGroup
                            key='username'
                            id='username'
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
                        <Button type='submit'>Login</Button>
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

export default Login;
