import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

export default class Packages extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {cliToken: props.location.cliToken}
  }

  render () {
    var packages = [
      {
        id: '001',
        orgName: 'natasha',
        packageName: 'foo-bar',
        version: '1.0.0',
      },
      {
        id: '002',
        orgName: 'natasha',
        packageName: 'foo-bar',
        version: '2.0.0',
      },
      {
        id: '012',
        orgName: 'natasha',
        packageName: 'string-utils',
        version: '2.0.3',
      },
      {
        id: '032',
        orgName: 'natasha',
        packageName: 'math.utils',
        version: '1.0.5',
      },
      {
        id: '101',
        orgName: 'manu',
        packageName: 'file-api',
        version: '1.2.0',
      },
      {
        id: '211',
        orgName: 'manu',
        packageName: 'toml-parser',
        version: '0.9.8',
      }
    ]

    return (
      <div>
        <div>
          <Nav />
          {this.props.children}
          <br/>
          {this.state.cliToken != undefined &&
          <span>
          <h4>This is your CLI token : {this.state.cliToken} </h4>
            Please copy and paste it in Settings.toml in your user repository (.ballerina/) as below
            [central] accessToken = "cli-token generated" </span>
          }
          <br/> <br/>
          <strong>List of All Packages</strong>
          <ul>
            {packages.map((element) =>
              <li key={element.id}>
                <Link to={'/packages/' + element.orgName}> {element.orgName + ':'} </Link>
                <Link
                  to={'/packages/' + element.orgName + '/' + element.packageName + '/' + element.version}
                >
                  {element.packageName + ':'} {element.version}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}