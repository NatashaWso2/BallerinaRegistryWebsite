import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import NavBar from './NavBar';

export default class Container extends React.PureComponent {
  render () {
    return (
      <Grid>
        {this.props.children}
      </Grid>
    )
  }
}