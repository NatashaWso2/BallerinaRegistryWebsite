import React from 'react'

export default class Package extends React.PureComponent {
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

    let obj
    packages.find((element) => {
      var requestedPackagePath = element.orgName + '/' + element.packageName + '/' + element.version
      if (this.props.location.pathname.replace('/central.ballerina.io/', '') === requestedPackagePath) {
        obj = element
      }
    })

    return (
      <div>
        <div>
          <div>
            <h2> {obj.orgName + '.' + obj.packageName + '.' + obj.version} </h2>
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