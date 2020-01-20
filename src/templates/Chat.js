import React from 'react';
import firebase from '../firebase/config.js';
import '../components/Chat/Chat.css';

class Chat extends React.Component {
    render() {
        let currentUser = firebase.auth().currentUser;
        let currentUserLogo = currentUser.photoURL;
        console.log(currentUserLogo)
        return (
            <div className="chatPage" >
                <div className="userPhotoPosition"><a className="userPhoto"></a></div>
                <div className="userNamePosition"><a className="userName">User:{this.props.user}</a></div>
                <input type="text" className="chatText" onChange={(e) => this.props.handleMessage(e)} value={this.props.message} placeholder="Message" />
                <input type="button" className="chatButton" onClick={() => this.props.addEventListener()} value="send" />
                <input type="button" className="chatLogout" onClick={() => this.props.logout()} value="logout" />
                <div className="chatDisplayArea">
                    {this.props.log.map((chat, index) => {
                        return (
                            (chat.user == currentUser.displayName) ? (<div className="currentUser"><p className="currentUserName">{chat.user},{chat.message}</p></div>) : (<div className="others"><p className="othersName">{chat.user},{chat.message}</p></div>)
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default Chat




