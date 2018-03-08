import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

export default class OrgName extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      packages: [
        {
          id: '001',
          orgName: 'natasha',
          packageName: 'foo-bar',
          version: '1.0.0',
          description: 'This is the foo-bar package'
        },
        {
          id: '002',
          orgName: 'natasha',
          packageName: 'foo-bar',
          version: '2.0.0',
          description: 'This is the foo-bar package'
        },
        {
          id: '012',
          orgName: 'natasha',
          packageName: 'string-utils',
          version: '2.0.3',
          description: 'This is the string-utils' +
          ' package'
        },
        {
          id: '032',
          orgName: 'natasha',
          packageName: 'math.utils',
          version: '1.0.5',
          description: 'This is the math.utils package'
        },
        {
          id: '101',
          orgName: 'manu',
          packageName: 'file-api',
          version: '1.2.0',
          description: 'This is the file-api package'
        },
        {
          id: '211',
          orgName: 'manu',
          packageName: 'toml-parser',
          version: '0.9.8',
          description: 'This is the toml-parser package'
        }
      ],
      accessTokenExpired: false
    }
    this.deletePkg = this.deletePkg.bind(this)
  }

  deletePkg (packageName, packageVersion) {
    axios.get('http://staging.central.ballerina.io:8080/registry/validate',
      {
        'withCredentials': true, headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      })
      .then((response) => {
        const accessTokenActive = response.data.active;
        if (accessTokenActive == true) {
          const items = this.state.packages
          items.map((element, index) => {
            if (packageName === element.packageName) {
              if (packageVersion === element.version) {
                items.splice(index, 1)
              }
            }
          })
          this.setState({
            packages: items
          })
          this.forceUpdate()
        } else {
          this.setState({accessTokenExpired: true})
          this.forceUpdate()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {

    const {accessTokenExpired} = this.state
    if (accessTokenExpired) {
      return <Redirect to='/login'/>
    }

    const cookies = new Cookies()
    const userLogged = cookies.get('userLogged')

    var packages = this.state.packages
    var objArr = []
    var orgName = this.props.location.pathname.replace('/packages/', '')
    packages.find((element) => {
      var requestedPackagePath = element.orgName
      if (orgName === requestedPackagePath) {
        objArr.push(element)
      }
    })
    return (
      <div>
        <h3> Packages of {orgName}</h3>
        <ul>
          {objArr.map((pkg) =>
            <li>
              <h2> {pkg.packageName + '.' + pkg.version} </h2> <br/>
              {userLogged != undefined &&
              <button onClick={(e) => this.deletePkg(pkg.packageName, pkg.version)}>Delete</button> }
              <hr/>
              <h3>Org-Name : {pkg.orgName}</h3>
              <h3>Package Name : {pkg.packageName} </h3>
              <h3>Version : {pkg.version} </h3>
              <h3>Description : {pkg.description} </h3>
            </li>
          )}
        </ul>
      </div>
    )
  }
}