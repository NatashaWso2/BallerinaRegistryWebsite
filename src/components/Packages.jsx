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

/**
 * Component for packages.
 * @class Packages
 * @extends {React.Component}
 */
class Packages extends React.Component {
    /**
     * Creates an instance of Packages.
     * @param {any} props Component properties.
     * @memberof Packages
     */
    constructor(props) {
        super(props);
        this.state = { cliToken: props.location.cliToken };
    }

    /**
     * Rendering the packages view.
     * @returns {React.ReactElement} The view.
     * @memberof Packages
     */
    render() {
        // const packages = [
        //     {
        //         id: '001',
        //         orgName: 'natasha',
        //         packageName: 'foo-bar',
        //         version: '1.0.0',
        //     },
        //     {
        //         id: '002',
        //         orgName: 'natasha',
        //         packageName: 'foo-bar',
        //         version: '2.0.0',
        //     },
        //     {
        //         id: '012',
        //         orgName: 'natasha',
        //         packageName: 'string-utils',
        //         version: '2.0.3',
        //     },
        //     {
        //         id: '032',
        //         orgName: 'natasha',
        //         packageName: 'math.utils',
        //         version: '1.0.5',
        //     },
        //     {
        //         id: '101',
        //         orgName: 'manu',
        //         packageName: 'file-api',
        //         version: '1.2.0',
        //     },
        //     {
        //         id: '211',
        //         orgName: 'manu',
        //         packageName: 'toml-parser',
        //         version: '0.9.8',
        //     }
        // ]

        return (
            <div>
                <div>
                    {this.props.children}
                    <br />
                    {this.state.cliToken !== undefined &&
                        <span>
                            <h4>This is your CLI token : {this.state.cliToken} </h4>
                            Please copy and paste it in Settings.toml in your user repository (.ballerina/) as below
                            [central] accessToken = cli-token generated
                        </span>
                    }
                    <br /> <br />
                    <strong>List of All Packages</strong>
                </div>
            </div>
        );
    }
}

Packages.propTypes = {
    location: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.instanceOf(React.ReactElement)),
};

Packages.defaultProps = {
    children: [],
};

export default Packages;
