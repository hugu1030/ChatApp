import React from 'react';
import firebase from '../firebase/config.js';
import '../style/Chat.css';

class Chat extends React.Component {
    componentDidMount() {
        console.log("ChatのcomponentDidMountです")
        const database = firebase.database()
        let selectedRoomNum = 0;
        let selectedRoomNumLog = database.ref("nowRoomNum" + this.props.user)
        selectedRoomNumLog.once("value").then((snapshot) => {
            selectedRoomNum = snapshot.val().nowSelectedRoomNum
            this.props.nowRoomNumSetter(selectedRoomNum)
        })
    }

    render() {
        console.log(this.props.nowRoomNum)
        let nowRoomNum = this.props.nowRoomNum;
        const currentUser = firebase.auth().currentUser;
        const database = firebase.database();
        let selectedRoomNum;
        const ChatLog = database.ref('nowRoomNum');
        return (
            < div className="chatPage" >
                {console.log("returnが呼ばれ増田")}
                <div className="userNamePosition"><a className="userName">User:{this.props.user}</a></div>
                <input type="text" className="chatText" onChange={(e) => this.props.handleMessage(e)} value={this.props.message} placeholder="Message" />
                <input type="button" className="chatButton" onClick={() => this.props.addEventListener()} value="send" />
                <input type="button" className="chatLogout" onClick={() => this.props.logout()} value="logout" />
                <input type="button" className="chatBack" onClick={() => this.props.chatBack()} value="back" />
                <div className="chatDisplayArea">
                    {ChatLog.on("value", (snapshot) => {
                        snapshot.forEach((children) => {
                            return (
                                (children.val().user === currentUser.displayName) ? (<div className="currentUser"><div className="userPhotoPosition"><img src={children.val().photo} className="userPhoto" /></div>
                                    <div className="currentUserMessagePosition"><p className="currentUserMessage">{children.val().message}</p></div>
                                    <div className="currentUserNamePosition"><p className="currentUserName">{children.val().user}</p></div></div>)
                                    : (<div className="others"><div className="othersPhotoPosition"><img src={children.val().photo} className="othersPhoto" /></div>
                                        <div className="othersMessagePosition"><p className="othersMessage">{children.val().message}</p></div>
                                        <div className="othersNamePosition"><p className="othersName">{children.val().user}</p></div></div>)
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




