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
import { validate } from '../api-client';

/**
 * Component view a package.
 * @class Package
 * @extends {React.PureComponent}
 */
class Package extends React.PureComponent {
    /**
     * Creates an instance of Package.
     * @param {any} props Component properties.
     * @memberof Package
     */
    constructor(props) {
        super(props);
        this.state = {
            packages: [
                {
                    id: '001',
                    orgName: 'natasha',
                    packageName: 'foo-bar',
                    version: '1.0.0',
                    description: 'This is the foo-bar package',
                },
                {
                    id: '002',
                    orgName: 'natasha',
                    packageName: 'foo-bar',
                    version: '2.0.0',
                    description: 'This is the foo-bar package',
                },
                {
                    id: '012',
                    orgName: 'natasha',
                    packageName: 'string-utils',
                    version: '2.0.3',
                    description: 'This is the string-utils package',
                },
                {
                    id: '032',
                    orgName: 'natasha',
                    packageName: 'math.utils',
                    version: '1.0.5',
                    description: 'This is the math.utils package',
                },
                {
                    id: '101',
                    orgName: 'manu',
                    packageName: 'file-api',
                    version: '1.2.0',
                    description: 'This is the file-api package',
                },
                {
                    id: '211',
                    orgName: 'manu',
                    packageName: 'toml-parser',
                    version: '0.9.8',
                    description: 'This is the toml-parser package',
                },
            ],
            redirect: false,
            accessTokenExpired: false,
        };
        this.deletePkg = this.deletePkg.bind(this);
    }

    /**
     * Delete a package.
     * @memberof Package
     */
    deletePkg() {
        validate()
            .then((response) => {
                const accessTokenActive = response.data.active;
                if (accessTokenActive === true) {
                    this.setState({ redirect: true });
                    this.forceUpdate();
                } else {
                    this.setState({ accessTokenExpired: true });
                    this.forceUpdate();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Renders the package view.
     * @returns {React.ReactElement} The view.
     * @memberof Package
     */
    render() {
        const cookies = new Cookies();
        const userLogged = cookies.get('userLogged');

        const obj = this.state.packages.find((element) => {
            const requestedPackagePath = element.orgName + '/' + element.packageName + '/' + element.version;
            return this.props.location.pathname.replace('/packages/', '') === requestedPackagePath;
        });
        const { redirect, accessTokenExpired } = this.state;
        if (redirect) {
            return (<Redirect to='/packages' />);
        }
        if (accessTokenExpired) {
            return (<Redirect to='/login' />);
        }
        return (
            <div>
                <div>
                    <div>
                        <h2> {obj.orgName + '.' + obj.packageName + '.' + obj.version} </h2> <br />
                        {userLogged !== undefined &&
                            <button onClick={this.deletePkg}>Delete</button>}
                        <hr />
                        <h3>Org-Name : {obj.orgName}</h3>
                        <h3>Package Name : {obj.packageName} </h3>
                        <h3>Version : {obj.version} </h3>
                        <h3>Description : {obj.description} </h3>
                    </div>
                </div>
            </div>
        );
    }
}

Package.propTypes = {
    location: PropTypes.string.isRequired,
};

export default Package;
