/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

import React from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Nav as RSNav, Navbar as RSNavbar, NavItem as RSNavItem } from 'react-bootstrap';

class Navbar extends React.Component {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout () {
    const cookies = new Cookies();
    cookies.remove('userLogged', {path: '/'})
    cookies.remove('accessTokenSH', {path: '/'})
  }

  renderLoggedOutNavBar() {
    return (
      <RSNavbar>
        <RSNavbar.Header>
          <RSNavbar.Brand>
            <a href='/'>Ballerina Central</a>
          </RSNavbar.Brand>
        </RSNavbar.Header>
          <RSNav pullRight>
            <RSNavItem eventKey={1} href='/register'>
              Register
            </RSNavItem>
            <RSNavItem eventKey={2} href='/login'>
              Login
            </RSNavItem>
          </RSNav>
      </RSNavbar>
    );
  }

  renderLoggedInNavBar(userLogged) {
    return (
      <RSNavbar>
        <RSNavbar.Header>
          <RSNavbar.Brand>
            <a href="/">Ballerina Central</a>
          </RSNavbar.Brand>
        </RSNavbar.Header>
        <RSNav pullRight>
          <RSNavItem eventKey={1} href="#">
            Username: {userLogged}
          </RSNavItem>
          <RSNavItem eventKey={2} href="#">
            <span onClick={this.logout}>Signout</span>
          </RSNavItem>
        </RSNav>
      </RSNavbar>
    );
  }

  render () {
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