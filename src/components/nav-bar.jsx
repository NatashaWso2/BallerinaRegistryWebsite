/* eslint-disable */
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
import { login } from '../api-client';
import urlencode from 'urlencode';

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
        this.state = {
          username:""
        };
        this.logout = this.logout.bind(this);
        this.getParameterByName = this.getParameterByName.bind(this);
        this.uuidv4 = this.uuidv4.bind(this);
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
   * Generate UUID
   */
  uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c =>{
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

  /**
   * Get query parameter value by name
   * @param name query param name
   * @param url base URL
   * @returns {*}
   */
    getParameterByName(name, url) {
      if (!url) {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) {
        return null;
      }
      if (!results[2]) {
        return '';
      }
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    componentDidMount() {
      const href = window.location.href;
      const code  = this.getParameterByName("code", href);
      if (code != null) {
        const codeJson = {"code": code};
        login(codeJson)
          .then((response) => {
            if (response.status == 200) {
              let data = response.data;
              let username;
              if (data.name == "null") {
                username = data["common-attr"];
              } else {
                username = data.name;
              }
              const cookies = new Cookies();
              cookies.set('userLogged', this.state.userName, { path: '/' });
              this.setState({
                username: username
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  /**
     * Rendering the logged out navigation bar.
     * @returns {React.ReactElement} The view.
     */
    renderLoggedOutNavBar() {
      const encodeWebsiteURL = urlencode(process.env.WEBSITE_URL, "UTF-8");
      const url = `${process.env.IDENTITY_URL}/oauth2/authorize?fidp=github&scope=openid&response_type=code&redirect_uri=
                   ${encodeWebsiteURL}&nonce=${this.uuidv4()}&client_id=${process.env.CLIENT_ID}`;
        return (
            <RSGrid fluid>
                <RSRow className='show-grid'>
                    <RSCol xs={6} xsOffset={6} className='top-line' />
                </RSRow>
                <RSRow>
                    <RSNavbar fluid>
                        <RSNav pullRight>
                            <RSNavItem eventKey={1} href={url}>
                                Sign In
                            </RSNavItem>
                            <RSNavItem eventKey={2} href={url}>
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
        <RSGrid fluid>
          <RSRow className='show-grid'>
            <RSCol xs={6} xsOffset={6} className='top-line' />
          </RSRow>
          <RSRow>
            <RSNavbar fluid>
              <RSNav pullRight>
                <RSNavItem eventKey={1} href='#'>
                  {userLogged}
                </RSNavItem>
                <RSNavItem eventKey={2} href='#' onClick={this.logout}>
                  Signout
                </RSNavItem>
              </RSNav>
            </RSNavbar>
          </RSRow>
        </RSGrid>
      );
    }

    /**
     * Rendering the view based on whether the user is logged in.
     * @returns {React.ReactElement} The view.
     */
    render() {
        if (this.state.username == undefined || this.state.username.trim() == "" ) {
            return this.renderLoggedOutNavBar();
        } else {
            return this.renderLoggedInNavBar(this.state.username);
        }
    }
}

export default Navbar;
