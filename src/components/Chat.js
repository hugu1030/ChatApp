import React from 'react';
import firebase from '../firebase/config.js';
import '../style/Chat.css';

class Chat extends React.Component {

    componentDidMount() {
        console.log("componentDidMount")
        const database = firebase.database()
        let selectedRoomNumLog = database.ref("selectedRoomNum")
        let selectedRoomNum = 0
        selectedRoomNumLog.on("value", (snapshot) => {
            snapshot.forEach((children) => {
                if (children.val().user == this.props.user)
                {
                    selectedRoomNum = children.val().selectedRoomNum
                }
                console.log(selectedRoomNum)
            })
        })
        this.props.RoomNumSelecter(selectedRoomNum)
    }

    render() {
        const currentUser = firebase.auth().currentUser;
        const database = firebase.database()
        let selectedRoomNum = this.props.selectedRoomNum
        const ChatLog = database.ref('selectedRoomNum')
        return (
            <div className="chatPage">
                <div className="userNamePosition"><a className="userName">User:{this.props.user}</a></div>
                <input type="text" className="chatText" onChange={(e) => this.props.handleMessage(e)} value={this.props.message} placeholder="Message" />
                <input type="button" className="chatButton" onClick={() => this.props.addEventListener()} value="send" />
                <input type="button" className="chatLogout" onClick={() => this.props.logout()} value="logout" />
                <input type="button" className="chatBack" onClick={() => this.props.chatBack()} value="back" />
                <div className="chatDisplayArea">
                    {ChatLog.on("value", (snapshot) => {
                        snapshot.forEach((children) => {
                            return (
                                (children.val().user == currentUser.displayName) ? (<div className="currentUser"><div className="userPhotoPosition"><img src={children.val().photo} className="userPhoto" /></div><div className="currentUserMessagePosition"><p className="currentUserMessage">{children.val().message}</p></div> <div className="currentUserNamePosition"><p className="currentUserName">{children.val().user}</p></div></div>) : (<div className="others"><div className="othersPhotoPosition"><img src={children.val().photo} className="othersPhoto" /></div><div className="othersMessagePosition"><p className="othersMessage">{children.val().message}</p></div> <div className="othersNamePosition"><p className="othersName">{children.val().user}</p></div></div>)
                            )
                        })
                    })
                    })}
                </div>
            </div>
        )
    }
}
export default Chat




