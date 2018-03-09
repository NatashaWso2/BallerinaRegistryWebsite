import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import Packages from './components/Packages';
import Container from './components/Container';
import Register from './components/Register';
import Package from './components/Package'
import OrgName from './components/OrgName'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Switch>
        <Route exact path='/' component={Container} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        <Route exact path='/packages' component={Packages}/>
          <Switch>
          <Route path="/packages/:orgName/:packageName/:version" component={Package}/>
          <Route path="/packages/:orgName" component={OrgName}/>
          </Switch>
        <Route path='*' component={NotFound} />
        </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)