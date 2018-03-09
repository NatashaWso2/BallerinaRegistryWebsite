import React from 'react';
import Nav from './Nav';

export default class Container extends React.PureComponent {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    )
  }
}