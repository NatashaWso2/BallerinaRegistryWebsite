import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

export default class Package extends React.PureComponent {
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
      redirect: false,
      accessTokenExpired: false
    }
    this.deletePkg = this.deletePkg.bind(this)
  }

  deletePkg () {
    axios.get('http://staging.central.ballerina.io:8080/registry/validate',
      {
        'withCredentials': true, headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      })
      .then((response) => {
        const accessTokenActive = response.data.active;
        if (accessTokenActive == true) {
          this.setState({redirect: true})
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
    const cookies = new Cookies()
    const userLogged = cookies.get('userLogged')

    let obj
    this.state.packages.find((element) => {
      var requestedPackagePath = element.orgName + '/' + element.packageName + '/' + element.version
      if (this.props.location.pathname.replace('/packages/', '') === requestedPackagePath) {
        obj = element
      }
    })
    const {redirect, accessTokenExpired} = this.state
    if (redirect) {
      return <Redirect to='/packages'/>
    }
    if (accessTokenExpired) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
        <div>
          <div>
            <h2> {obj.orgName + '.' + obj.packageName + '.' + obj.version} </h2> <br/>
            {userLogged != undefined &&
            <button onClick={this.deletePkg}>Delete</button> }
            <hr/>
            <h3>Org-Name : {obj.orgName}</h3>
            <h3>Package Name : {obj.packageName} </h3>
            <h3>Version : {obj.version} </h3>
            <h3>Description : {obj.description} </h3>
          </div>
        </div>
      </div>
    )
  }
}