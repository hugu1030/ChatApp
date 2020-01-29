import React from 'react';
import './style/Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <input type="button" onClick={this.props.login} className="LoginButton" value="Google Login" />
      </div >
    )
  }
}
export default Login

