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
import Cookies from 'universal-cookie';
import {
    Nav as RSNav, Navbar as RSNavbar, NavItem as RSNavItem,
    Grid as RSGrid, Row as RSRow, Col as RSCol,
} from 'react-bootstrap';

/**
 * Navigation bar component.
 */
class Navbar extends React.Component {
    /**
     * Component constructor.
     * @param {*} props Component properties.
     */
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    /**
     * Logging out handler. Removes the cookies.
     */
    logout() {
        const cookies = new Cookies();
        cookies.remove('userLogged', { path: '/' });
        cookies.remove('accessTokenSH', { path: '/' });
        window.location = '/';
    }

    /**
     * Rendering the logged out navigation bar.
     * @returns {React.ReactElement} The view.
     */
    renderLoggedOutNavBar() {
        return (
            <RSGrid fluid>
                <RSRow className='show-grid'>
                    <RSCol xs={6} xsOffset={6} className='top-line' />
                </RSRow>
                <RSRow>
                    <RSNavbar fluid>
                        <RSNav pullRight>
                            <RSNavItem eventKey={1} href='/login'>
                                Sign In
                            </RSNavItem>
                            <RSNavItem eventKey={2} href='/register'>
                                Sign Up
                            </RSNavItem>
                        </RSNav>
                    </RSNavbar>
                </RSRow>
            </RSGrid>
        );
    }

    /**
     * Rendering the logged in navigation bar.
     * @param {string} userLogged Logged in user's name
     * @returns {React.ReactElement} The view.
     */
    renderLoggedInNavBar(userLogged) {
        return (
            <RSNavbar>
                <RSNavbar.Header>
                    <RSNavbar.Brand>
                        <a href='/'>Ballerina Central</a>
                    </RSNavbar.Brand>
                </RSNavbar.Header>
                <RSNav pullRight>
                    <RSNavItem eventKey={1} href='#'>
                        Username: {userLogged}
                    </RSNavItem>
                    <RSNavItem eventKey={2} href='#' onClick={this.logout}>
                        Signout
                    </RSNavItem>
                </RSNav>
            </RSNavbar>
        );
    }

    /**
     * Rendering the view based on whether the user is logged in.
     * @returns {React.ReactElement} The view.
     */
    render() {
        const cookies = new Cookies();
        const userLogged = cookies.get('userLogged');

        if (userLogged === undefined) {
            return this.renderLoggedOutNavBar();
        } else {
            return this.renderLoggedInNavBar(userLogged);
        }
    }
}

export default Navbar;
