import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Package from './Package'
import OrgName from './OrgName'
import PackageName from './PackageName'

export default class Packages extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {render: ''}
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
      <Router>
        <div>
          <div>
            <strong>List of All Packages</strong>
            <ul>
              {packages.map((element) =>
                <li key={element.id}>
                  <Link to={'/central.ballerina.io/' + element.orgName}> {element.orgName + ":"} </Link>
                  <Link to={'/central.ballerina.io/' + element.orgName + "/" + element.packageName}>
                    {element.packageName + ":"} </Link>
                  <Link
                    to={'/central.ballerina.io/' + element.orgName + '/' + element.packageName + '/' + element.version}
                  >
                      {element.version}
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <Switch>
            <Route path="/central.ballerina.io/:orgName/:packageName/:version" component={Package}/>
            <Route path="/central.ballerina.io/:orgName/:packageName" component={PackageName}/>
            <Route path="/central.ballerina.io/:orgName" component={OrgName}/>
          </Switch>
        </div>
      </Router>
    )
  }
}