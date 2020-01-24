import React from 'react';
import Login from '../components/Login.js';
import firebase from '../firebase/config.js';
import ChatPage from '../components/Chat.js';
import ChatRoomTextBox from '../components/ChatRoomTextBox.js';
import ChatRoomTextButton from '../components/ChatRoomTextButton.js';
import '../style/Home.css'

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
            log: [],
            roomNumTotal: 0,
            selectedRoomNum: null,
            roomName: '',
            roomNameError: '',
            roomArray: [],
            doneMakeRoom: 0,
        }
    }

    SetUser = (e) => {
        console.log(this.state.roomNumTotal)
        this.setStata({
            user: e.target.value
        })
    }

    RoomNumTotalGetter = () => {
        return this.state.roomNumTotal
    }

    SetMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    RoomSetter = () => {
        if (this.state.roomName == '')
        {
            this.setState({
                roomNameError: "文字を入力してください"
            })
            return
        }
        const i = 1
        const ChatArrayInformation = this.state.roomArray.slice()
        const ChatObject = { roomName: this.state.roomName, roomNum: this.state.roomNumTotal + i, roomNumTotal: this.state.roomNumTotal + 1 }
        ChatArrayInformation.push(ChatObject)
        console.log(ChatObject)
        this.setState({
            roomArray: ChatArrayInformation,
            roomName: '',
            roomNumTotal: this.state.roomNumTotal + 1,
            roomNameError: ''
        })
    }

    RoomNameHandler = (e) => {
        this.setState({
            roomName: e.target.value,
        })
    }

    ClickChatRoom = (num) => {
        this.setState({
            doneMakeRoom: 1,
            selectedRoomNum: num
        })
    }

    RoomNumSelecter = () => {
        this.setState({
            selectedRoomNum: 1
        })
        console.log("RoomNumSelecter")
    }

    handleDoneMakeRoom = () => {
        this.setState({
            doneMakeRoom: 1
        })
    }

    login = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential)
            {
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

    handleMessage = (e) => {
        this.setState({
            message: e.target.value,
        });

    }

    logout = () => {
        firebase.auth().signOut();
    }

    addEventListener = () => {
        const room = "chat"
        const database = firebase.database();
        console.log(this.state.selectedRoomNum)
        //console.log(this.state.)
        database.ref(this.state.selectedRoomNum).push({
            user: this.state.user,
            message: this.state.message,
            photo: this.state.photo
        });

        this.setState({
            message: '',
        })

        const chatLog = firebase.database().ref(this.state.selectedRoomNum);

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
                if (user)
                {
                    let userId = firebase.auth().currentUser
                    this.setState({
                        user: userId.displayName,
                        photo: userId.photoURL,
                    })
                }
                else
                {
                    this.setState({
                        user: null
                    })
                }
            }
        )
    }

    render() {
        const PageLink = [];
        const PageRouter = [];
        let roomNumTotal = this.state.roomNumTotal
        for (let i = 0; i < roomNumTotal; i++)
        {
            PageLink.push(<li><Link to='roomNumTotal' onClick={() => this.ClickChatRoom(roomNumTotal)}>Room:{this.state.roomArray[i].roomName}</Link></li>)
            PageRouter.push(<Route path='roomNumTotal'><ChatPage {...this.state} /></Route>)
        }
        /* console.log(this.state.roomName)
         console.log(this.state.roomNumTotal)
         console.log(this.state.doneMakeRoom)
         console.log(this.state.selectedRoomNum) */
        return (
            <div class="chatAll">
                {
                    this.state.user ?
                        (this.state.doneMakeRoom == 1 ? (<ChatPage {...this.state} addEventListener={this.addEventListener} handleMessage={this.handleMessage} logout={this.logout} />) :
                            (<div className="ChatRoomContainer">
                                <h1>Enter Chat Name</h1>
                                <div className="ChatRoomTextBox">
                                    <ChatRoomTextBox  {...this.state} RoomNameHandler={this.RoomNameHandler} />
                                </div>
                                <div className="ChatRoomTextButton">
                                    <ChatRoomTextButton RoomSetter={this.RoomSetter} />
                                </div>
                                <div className="ErrorMessage">
                                    {this.state.roomNameError}
                                </div>
                                <Router>
                                    <div className="ChatRoomLinkContainer">
                                        <nav>
                                            <ul>
                                                {PageLink}
                                            </ul>
                                        </nav>
                                    </div>
                                    <Switch>
                                        {PageRouter}
                                    </Switch>
                                </Router>
                            </div>

                            )) : (<Login {...this.state} logout={this.logout} login={this.login} />
                        )
                }
            </div>
        )
    }
}

export default Home