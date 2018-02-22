import React from 'react'

export default class PackageName extends React.PureComponent {
  constructor (props) {
    super(props)
  }

  render () {
    var packages = [
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
    ]
    var objArr = [];
    var pkgName = (this.props.location.pathname.replace('/central.ballerina.io/', '').split("/"))[1];
    packages.find((element) => {
      if (pkgName === element.packageName) {
        objArr.push(element);
      }
    })
    return (
      <div>
        <h3> Versions of {pkgName} available</h3>
        <ul>
          {objArr.map((pkg) =>
            <li>
              <h2> {pkg.packageName + '.' + pkg.version} </h2>
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