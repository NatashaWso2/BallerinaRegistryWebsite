import React from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';


export default class Nav extends React.PureComponent {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout () {
    const cookies = new Cookies();
    cookies.remove('userLogged', {path: '/'})
    cookies.remove('accessTokenSH', {path: '/'})
  }

  render () {

    const cookies = new Cookies();
    const userLogged = cookies.get('userLogged');

    if (userLogged == undefined) {
      return (
        <div>
          <Link to='/register'>Register</Link> <br/> <br/>
          <Link to='/login'>Login</Link> <br/> <br/>
          <Link to='/packages'>Packages</Link>
        </div>
      )
    }
    return (
      <div>
        <Link to='/packages'>Packages</Link> <br/>
        <div>
          <form onSubmit={this.on}>
          <label> Username : {userLogged} </label> <br/> <br/>
          <button onClick={this.logout}>Signout</button> <br/>
          </form>
        </div>
      </div>
    )
  }
}