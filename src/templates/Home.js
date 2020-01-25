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
            //log: [],
            roomNumTotal: 0,
            selectedRoomNum: null,
            roomName: '',
            roomNameError: '',
            //roomArray: [],
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

        const database = firebase.database();
        const RoomInformation = "RoomInformation"
        const roomNumInfo = database.ref("roomNum");
        let roomNum = 0
        roomNumInfo.on("value", (snapshot) => {
            snapshot.forEach((children) => {
                roomNum = children.val().roomNum
            })
        })
        database.ref(RoomInformation).push({
            roomName: this.state.roomName,
            roomNum: roomNum + 1
        });

        // const ChatArrayInformation = this.state.roomArray.slice()
        // const ChatObject = { roomName: this.state.roomName, roomNum: this.state.roomNumTotal + i, roomNumTotal: this.state.roomNumTotal + 1 }
        // ChatArrayInformation.push(ChatObject)
        // console.log(ChatObject)
        this.setState({
            // roomArray: ChatArrayInformation,
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
        const database = firebase.database()
        database.ref("selectedRoomNum").push({
            selectedRoomNum: num,
            user: this.state.user
        })
        database.ref("doneMakeRoom").push({
            doneMakeRoom: 1,
            user: this.state.user,
        })

        this.setState({
            doneMakeRoom: 1,
            selectedRoomNum: num
        })
    }

    RoomNumSelecter = (num) => {
        this.setState({
            selectedRoomNum: num
        })
    }

    /* handleDoneMakeRoom = () => {
        this.setState({
            doneMakeRoom: 1
        })
    } */

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
        const database = firebase.database();
        const selectedRoomNumLog = database.ref("selectedRoomNum")
        let selectedRoomNum = 0
        selectedRoomNumLog.on("value", (snapshot) => {
            snapshot.forEach((children) => {
                if (children.val().user == this.state.user)
                {
                    selectedRoomNum = children.val().selectedRoomNum
                }
            })
        })

        database.ref('selectedRoomNum').push({
            user: this.state.user,
            message: this.state.message,
            photo: this.state.photo
        });

        this.setState({
            message: '',
        })

        const chatLog = firebase.database().ref('selectedRoomNum');

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
        const database = firebase.database()
        database.ref("roomNum").push({
            roomNum: this.state.roomNumTotal,
        })

        const PageLink = [];
        const PageRouter = [];
        const roomChatLog = database.ref("RoomInformation")
        roomChatLog.on("value", (snapshot) => {
            snapshot.forEach((children) => {
                PageLink.push(< Link to='children.val().roomNum' onClick={() => this.ClickChatRoom(children.val().roomNum)}><div className="ChatRoomLinkBox" >Room名:{children.val().roomName}</div></Link>)
                PageRouter.push(<Route path='children.val().roomNum'><ChatPage {...this.state} /></Route>)
            })
        })
        /* console.log(this.state.roomName)
         console.log(this.state.roomNumTotal)
         console.log(this.state.doneMakeRoom)
         console.log(this.state.selectedRoomNum) */
        const doneMakeLog = database.ref("doneMakeRoom")
        let doneMakeRoom = 0
        doneMakeLog.on("value", (snapshot) => {
            snapshot.forEach((children) => {
                if (children.val().user == this.state.user)
                {
                    doneMakeRoom = children.val().doneMakeRoom
                }
            })
        })

        return (
            <div class="chatAll">
                {
                    this.state.user ?
                        (doneMakeRoom == 1 ? (<ChatPage {...this.state} addEventListener={this.addEventListener} handleMessage={this.handleMessage} logout={this.logout} RoomNumSelecter={this.RoomNumSelecter} />) :
                            (
                                <div className="ChatRoomContainer">
                                    <h1>Enter Chat Name</h1>
                                    <div className="ErrorMessage">
                                        {this.state.roomNameError}
                                    </div>
                                    <div className="ChatRoomTextBox">
                                        <ChatRoomTextBox  {...this.state} RoomNameHandler={this.RoomNameHandler} />
                                    </div>
                                    <div className="ChatRoomTextButtonP">
                                        <ChatRoomTextButton RoomSetter={this.RoomSetter} />
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
            </div>
        )
    }
}

export default Home