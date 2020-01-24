import React from 'react';
import './style/Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <button onClick={this.props.login} className="LoginButton">aGoogle Login</button>
      </div >
    )
  }
}

export default Login

