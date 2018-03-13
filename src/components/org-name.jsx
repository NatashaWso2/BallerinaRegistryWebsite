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

/**
 * Component for an organization.
 * @class OrgName
 * @extends {React.Component}
 */
class OrgName extends React.Component {
    /**
     * Creates an instance of OrgName.
     * @param {any} props Component properties.
     * @memberof OrgName
     */
    constructor(props) {
        super(props);
        this.state = {
            packages: [],
            accessTokenExpired: false,
        };
        this.deletePkg = this.deletePkg.bind(this);
    }

    /**
     * Deletes a package.
     * @param {any} packageName The name of the package.
     * @param {any} packageVersion  The version of the package.
     * @memberof OrgName
     */
    deletePkg(packageName, packageVersion) {
        axios.get('http://staging.central.ballerina.io:8080/registry/validate', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => {
                const accessTokenActive = response.data.active;
                if (accessTokenActive === true) {
                    const items = this.state.packages;
                    items.forEach((element, index) => {
                        if (packageName === element.packageName) {
                            if (packageVersion === element.version) {
                                items.splice(index, 1);
                            }
                        }
                    });
                    this.setState({
                        packages: items,
                    });
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
     * Rendering the organization name.
     * @returns {React.ReactElement} The view.
     * @memberof OrgName
     */
    render() {
        const { accessTokenExpired } = this.state;
        if (accessTokenExpired) {
            return (<Redirect to='/login' />);
        }

        // const cookies = new Cookies();
        // const userLogged = cookies.get('userLogged');

        const { packages } = this.state;
        const objArr = [];
        const orgName = this.props.location.pathname.replace('/packages/', '');
        packages.forEach((element) => {
            const requestedPackagePath = element.orgName;
            if (orgName === requestedPackagePath) {
                objArr.push(element);
            }
        });
        return (
            <div>
                <h3> Packages of {orgName}</h3>
            </div>
        );
    }
}

OrgName.propTypes = {
    location: PropTypes.string.isRequired,
};

export default OrgName;
