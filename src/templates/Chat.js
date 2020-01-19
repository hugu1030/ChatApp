import React from 'react';
import firebase from '../firebase/config.js';
import '../components/Chat/Chat.css';

class Chat extends React.Component {

    render() {
        var currentUser = firebase.auth().currentUser;
        return (
            <div>
                <a>{this.props.user}</a>
                <input type="text" onChange={(e) => this.props.handleMessage(e)} value={this.props.message} />
                <input type="button" onClick={() => this.props.addEventListener()} value="send" />
                <input type="button" onClick={() => this.props.logout()} value="logout" />
                <div>
                    {this.props.log.map((chat, index) => {
                        return (
                            < div >
                                {
                                    (chat.user == currentUser.displayName) ? (<div className="currentUser">{chat.user},{chat.message}</div>) : (<div className="others">{chat.user},{chat.message}</div>)
                                }
                            </div>
                        )
                    })}
                </div>
            </div>

        )
    }
}
export default Chat




