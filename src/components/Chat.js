import React from 'react';
import firebase from '../firebase/config.js';
import '../style/Chat.css';

class Chat extends React.Component {
    render() {
        const currentUser = firebase.auth().currentUser;
        return (
            <div className="chatPage">
                <div className="userNamePosition"><a className="userName">User:{this.props.user}</a></div>
                <input type="text" className="chatText" onChange={(e) => this.props.handleMessage(e)} value={this.props.message} placeholder="Message" />
                <input type="button" className="chatButton" onClick={() => this.props.addEventListener()} value="send" />
                <input type="button" className="chatLogout" onClick={() => this.props.logout()} value="logout" />
                <div className="chatDisplayArea">

                    {this.props.log.map((chat, index) => {
                        console.log(chat)
                        return (
                            (chat.user == currentUser.displayName) ? (<div className="currentUser"><div className="userPhotoPosition"><img src={chat.photo} className="userPhoto" /></div><div className="currentUserMessagePosition"><p className="currentUserMessage">{chat.message}</p></div> <div className="currentUserNamePosition"><p className="currentUserName">{chat.user}</p></div></div>) : (<div className="others"><div className="othersPhotoPosition"><img src={chat.photo} className="othersPhoto" /></div><div className="othersMessagePosition"><p className="othersMessage">{chat.message}</p></div> <div className="othersNamePosition"><p className="othersName">{chat.user}</p></div></div>)
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default Chat




