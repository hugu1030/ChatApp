import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.user ? (<button onClick={this.props.logout}>Google Logout</button>)
                        : (<button onClick={this.props.login}>Google Login</button>)
                }
            </div >
        )
    }
}

export default Login