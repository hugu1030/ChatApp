import React from 'react';
import Login from '../components/Login.js';
import firebase from '../firebase/config.js';
import ChatPage from '../components/Chat.js';
import ChatRoomTextBox from '../components/ChatRoomTextBox.js';
import ChatRoomTextButton from '../components/ChatRoomTextButton.js';
import '../style/Home.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            photo: null,
            message: '',
            roomNumTotal: 0,
            selectedRoomNum: null,
            nowRoomNum: 0,
            roomName: '',
            roomNameError: '',
            forRender: 0,
        }
    }
    componentDidMount() {
        const database = firebase.database()
        const nowRoomNumInfo = database.ref("nowRoomNum" + this.state.user)
        nowRoomNumInfo.on("value", (snapshot) => {
            snapshot.forEach((children) => {
                if (children.val().user === this.state.user) {
                    this.nowRoomNumSetter(children.val().nowSelectedRoomRoomNum)
                } else {
                    this.nowRoomNumSetter(0)
                }
            })
        })
    }
    setUser = (e) => {                             //ok
        this.setStata({
            user: e.target.value
        })
    }

    nowRoomNumSetter = (nowRoomNumi) => {
        this.setState({
            nowRoomNum: nowRoomNumi,
        })
    }


    roomAdder = () => {                                 //roomNumを変更
        const database = firebase.database();
        const roomNum = database.ref("roomNum");
        const nowRoomNumInfo = database.ref("nowRoomNum" + this.state.user)
        var number = 1;
        if (this.state.roomName === '') {
            this.setState({
                roomNameError: " 文字を入力してください"
            })
        }

        roomNum.once("value").then((snapshot) => {
            console.log(snapshot.val())
            if (snapshot.val() === null) {
                roomNum.set({
                    roomNum: 1,
                })
                number = 1
            } else {
                //console.log("roomAdderのelse文")
                console.log(snapshot.val().roomNum)
                roomNum.set({
                    roomNum: snapshot.val().roomNum + 1,
                })
                number = snapshot.val().roomNum + 1
            }
            this.roomInformationAdder(number, this.state.roomName)
            //console.log("roomInformationAdderへ行きます")
        })
    }

    roomInformationAdder = (number, roomName) => {       //ok
        const database = firebase.database();
        const RoomNumInformation = database.ref("RoomInformation")
        RoomNumInformation.once("value").then((snapshot) => {
            RoomNumInformation.push({
                roomName: roomName,
                roomNum: number,
            })
        })

        this.setState({
            // roomArray: ChatArrayInformation,
            roomName: '',
            roomNameError: '',
        })
    }

    roomNameHandler = (e) => {
        this.setState({
            roomName: e.target.value,
        })
    }

    clickChatRoom = (num) => {
        const database = firebase.database()
        database.ref("nowRoomNum" + this.state.user).set({
            nowSelectedRoomNum: num,
            user: this.state.user,
        })
        this.setState({
            nowRoomNum: num
        })
    }

    roomNumSelecter = (num) => {
        this.setState({
            selectedRoomNum: num
        })
    }

    login = () => {    //変更なし
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                let token = result.credential.accessToken;
            }
            this.setState({
                user: result.user,
            })
        }).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
        });
    }

    handleMessage = (e) => {           //Chatのmessageなので改良なし
        this.setState({
            message: e.target.value,
        });

    }

    chatBack = () => {                            //nowRoomNum + usernameのn
        const database = firebase.database()
        database.ref("nowRoomNum" + this.state.user).set({
            nowSelectedRoomNum: 0,
            user: this.state.user,
        })
        this.setState({
            nowRoomNum: 0,
        })

    }

    logout = () => {
        firebase.auth().signOut();
    }

    addEventListener = (Num) => {
        if (this.state.message == '') {
            return
        }
        console.log(Num)
        let selectedRoomNum = 0
        const database = firebase.database();
        const selectedRoomNumLog = database.ref("nowRoomNum" + this.state.user)
        /* selectedRoomNumLog.on("value", (snapshot) => {
             snapshot.forEach((children) => {
                 if (children.val().user == this.state.user) {
                     selectedRoomNum = children.val().selectedRoomNum
 
 
                 }
                 this.setState({
                     selectedRoomNum: selectedRoomNum
                 })
             })
         })*/

        database.ref(Num).push({
            user: this.state.user,
            message: this.state.message,
            photo: this.state.photo
        });

        this.setState({
            message: '',
        })

        const chatLog = firebase.database().ref(Num);

        chatLog.on("value", (snapshot) => {
            this.setState({
                log: []
            })

            const logarray = []
            snapshot.forEach((children) => {
                const logchild = { user: children.val().user, message: children.val().message, photo: children.val().photo }
                logarray.push(logchild)
            })
            this.setState({
                log: logarray,
            })
        })
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    let userId = firebase.auth().currentUser
                    this.setState({
                        user: userId.displayName,
                        photo: userId.photoURL,
                    })
                }
                else {
                    this.setState({
                        user: null
                    })
                }
            }
        )
    }

    render() {
        const database = firebase.database()
        const PageLink = [];
        const PageRouter = [];
        const roomChatLog = database.ref("RoomInformation")
        const nowRoomNumInfo = database.ref("nowRoomNum" + this.state.user)
        roomChatLog.on("value", (snapshot) => {
            snapshot.forEach((children) => {
                console.log()
                PageLink.push(<Link to='children.val().roomNum' onClick={() => this.clickChatRoom(children.val().roomNum)}><div className="ChatRoomLinkBox" >Room名:{children.val().roomName}</div></Link>)
                PageRouter.push(<Route path='children.val().roomNum'><ChatPage {...this.state} /></Route>)
            })
        })

        console.log(this.state.nowRoomNum)
        return (

            < div class="chatAll" >
                {
                    this.state.user ?
                        (this.state.nowRoomNum != 0 ? (<ChatPage {...this.state} nowRoomNumSetter={this.nowRoomNumSetter} addEventListener={this.addEventListener} chatBack={this.chatBack} handleMessage={this.handleMessage} logout={this.logout} RoomNumSelecter={this.roomNumSelecter} />) :
                            (
                                <div className="ChatRoomContainer">
                                    <h1>Enter Chat Name</h1>
                                    <div className="ErrorMessage">
                                        {this.state.roomNameError}
                                    </div>
                                    <div className="ChatRoomTextBox">
                                        <ChatRoomTextBox  {...this.state} RoomNameHandler={this.roomNameHandler} />
                                    </div>
                                    <div className="ChatRoomTextButtonP">
                                        <ChatRoomTextButton roomAdder={this.roomAdder} roomInformationAdder={this.roomInformationAdder} />
                                    </div>
                                    <Router>
                                        <div className="ChatRoomLinkContainer">
                                            {PageLink}
                                        </div>
                                        <Switch>
                                            {PageRouter}
                                        </Switch>
                                    </Router>
                                </div>

                            )) : (<Login {...this.state} logout={this.logout} login={this.login} />
                        )
                }
            </div >
        )
    }
}

export default Home