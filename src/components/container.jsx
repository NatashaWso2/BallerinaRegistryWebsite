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
import { Grid, Well, Row, Col, PageHeader } from 'react-bootstrap';
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
        return (
            <Grid>
                {this.props.children}
                <PageHeader>Welcome to Ballerina Central</PageHeader>
                {tokenView}
            </Grid>
        );
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
