import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

export default class OrgName extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      packages: [],
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
        if (accessTokenActive === true) {
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