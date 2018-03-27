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
import { Well, Row, Col, PageHeader, FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Main container component.
 * @export
 * @class Container
 * @extends {React.Component}
 */
class Container extends React.Component {
    /**
     * Render the token view if present.
     * @returns {React.ReactElement} The view.
     * @memberof Container
     */
    renderTokenView() {
        if (this.props.location.cliToken) {
            return (
                <Row>
                    <Col xs={12} md={12}>
                        <Well>
                            <h4>This is your CLI token : {this.props.location.cliToken} </h4>
                            Please copy and paste it in Settings.toml in your user repository (.ballerina/) as below
                            [central] accessToken = cli-token generated
                        </Well>
                    </Col>
                </Row>);
        } else {
            return (null);
        }
    }

    /**
     * Renders the main component.
     * @returns {React.ReactElement} The container view.
     * @memberof Container
     */
    render() {
        const tokenView = this.renderTokenView();
        return ([
            <Row>
                <Col xs={3}>
                    <p className='navbar-brand' href='#'>Cloud Native Programming Language <br />
                        &amp; Integration Framework
                    </p>
                </Col>
            </Row>,
            <Row>
                <Col xs={6}>
                    {this.props.children}
                    <PageHeader>
                        <a className='bCentralLogo link' href='#s'>
                            <img src='/img/logo.svg' alt='Ballerina' />central
                        </a>
                    </PageHeader>
                    {tokenView}
                </Col>
            </Row>,
            <Row>
                <Col xs={6}>
                    <h2 className='bSlogan'>
                        Discover packages of reusable code <br /> and assemble them in powerful ways
                    </h2>
                    <a className='link' href='#s'>
                        SEARCH HUNDREDS OF PACKAGES NOW &gt;
                    </a>
                </Col>
                <Col xs={4} xsOffset={2}>
                    <form>
                        <FormGroup
                            className='bSearchForm'
                            controlId='bSearchForm'
                        >
                            <FormControl
                                type='text'
                            />
                        </FormGroup>
                    </form>
                </Col>
            </Row>,
            <Row>
                <Col xs={6}>
                    <div className='popular box-container'>
                        <h2>Popular Packages</h2>
                        <div className='listing'>
                            <div className='list-item'>
                                <div className='list-title'>
                                    <h5 className='pull-left'>ballerina/io</h5>
                                    <span className='pull-right'>version: 1.2.5</span>
                                </div>
                                <p>
                                    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse Lorem
                                    ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                                </p>
                            </div>
                            <div className='list-item'>
                                <div className='list-title'>
                                    <h5 className='pull-left'>ballerina/io</h5>
                                    <span className='pull-right'>version: 1.2.5</span>
                                </div>
                                <p>
                                    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse Lorem
                                    ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                                </p>
                            </div>
                            <div className='list-item'>
                                <div className='list-title'>
                                    <h5 className='pull-left'>ballerina/io</h5>
                                    <span className='pull-right'>version: 1.2.5</span>
                                </div>
                                <p>
                                    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse Lorem
                                    ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                                </p>
                            </div>
                            <div className='list-item'>
                                <div className='list-title'>
                                    <h5 className='pull-left'>ballerina/io</h5>
                                    <span className='pull-right'>version: 1.2.5</span>
                                </div>
                                <p>
                                    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse Lorem
                                    ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                                </p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={6}>
                    <div className='recent box-container'>
                        <h2>Recently Updated</h2>
                        <div className='listing'>
                            <div className='list-item'>
                                <div className='list-title'>
                                    <h5 className='pull-left'>ballerina/io</h5>
                                    <span className='pull-right'>version: 1.2.5</span>
                                </div>
                                <p>
                                    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse Lorem
                                    ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                                </p>
                            </div>
                            <div className='list-item'>
                                <div className='list-title'>
                                    <h5 className='pull-left'>ballerina/io</h5>
                                    <span className='pull-right'>version: 1.2.5</span>
                                </div>
                                <p>
                                    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse Lorem
                                    ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                                </p>
                            </div>
                            <div className='list-item'>
                                <div className='list-title'>
                                    <h5 className='pull-left'>ballerina/io</h5>
                                    <span className='pull-right'>version: 1.2.5</span>
                                </div>
                                <p>
                                    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse Lorem
                                    ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                                </p>
                            </div>
                            <div className='list-item'>
                                <div className='list-title'>
                                    <h5 className='pull-left'>ballerina/io</h5>
                                    <span className='pull-right'>version: 1.2.5</span>
                                </div>
                                <p>
                                    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse Lorem
                                    ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                                </p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>,
        ]);
    }
}

Container.propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(React.ReactElement)),
    location: PropTypes.instanceOf(PropTypes.object),
};

Container.defaultProps = {
    children: [],
    location: undefined,
};

export default Container;
