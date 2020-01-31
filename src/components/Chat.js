import React from 'react';
import firebase from '../firebase/config.js';
import '../style/Chat.css';

class Chat extends React.Component {
    logMaker = (nowRoomNum) => {
        const database = firebase.database();
        const ChatLog = database.ref(nowRoomNum);
        let Log = [];
        ChatLog.on("value", (snapshot) => {
            snapshot.forEach((children) => {
                let ob = { user: children.val().user, message: children.val().message, photo: children.val().photo }
                Log.push(ob)
            })
        })
        return Log;
    }

    render() {
        console.log(this.props.nowRoomNum);
        let nowRoomNum = this.props.nowRoomNum;
        const currentUser = firebase.auth().currentUser;
        const database = firebase.database();
        let selectedRoomNum;
        let Log = this.logMaker(nowRoomNum);
        console.log(Log);

        return (
            < div className="chatPage" >
                {console.log("returnが呼ばれ増田")}
                <div className="userNamePosition"><a className="userName">User:{this.props.user}</a></div>
                <input type="text" className="chatText" onChange={(e) => this.props.handleMessage(e)} value={this.props.message} placeholder="Message" />
                <input type="button" className="chatButton" onClick={() => this.props.addEventListener(nowRoomNum)} value="send" />
                <input type="button" className="chatLogout" onClick={() => this.props.logout()} value="logout" />
                <input type="button" className="chatBack" onClick={() => this.props.chatBack()} value="back" />
                <div className="chatDisplayArea">
                    {Log.map((chat, index) => {

                        return (
                            (chat.user == currentUser.displayName) ? (<div className="currentUser"><div className="userPhotoPosition"><img src={chat.photo} className="userPhoto" /></div>
                                <div className="currentUserMessagePosition"><p className="currentUserMessage">{chat.message}</p></div>
                                <div className="currentUserNamePosition"><p className="currentUserName">{chat.user}</p></div></div>)
                                : (<div className="others"><div className="othersPhotoPosition"><img src={chat.photo} className="othersPhoto" /></div>
                                    <div className="othersMessagePosition"><p className="othersMessage">{chat.message}</p></div>
                                    <div className="othersNamePosition"><p className="othersName">{chat.user}</p></div></div>)
                        )
                    })
                    })
                    })}
                </div>
            </div >
        )
    }
}
export default Chat




