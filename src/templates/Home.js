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
            roomName: '',
            roomNameError: '',
            doneMakeRoom: 0,
            forRender: 0,
        }
    }

    setUser = (e) => {
        console.log(this.state.roomNumTotal)
        this.setStata({
            user: e.target.value
        })
    }

    roomNumTotalGetter = () => {
        return this.state.roomNumTotal
    }

    setMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    roomSetter = () => {
        var roomNum;
        const database = firebase.database();
        const RoomInformation = "RoomInformation";
        const roomNumInfo = database.ref("roomNum");
        if (this.state.roomName == '')                  //OK
        {
            this.setState({
                roomNameError: "文字を入力してください"
            })
            return
        }

        roomNumInfo.on("value", (snapshot) => {
            console.log("a")
            console.log(snapshot.val())
            if (snapshot.val() == null)
            {
                console.log("push")
                roomNumInfo.push({
                    roomNum: 1
                })
            }
        })

        let roomNumMax = 0;

        var result = new Promise((resolve) => {
            roomNumInfo.on("value", (snapshot) => {                            //非同期だから少し遅い
                snapshot.forEach((children) => {
                    console.log(children.val().roomNum)
                    if (roomNumMax < children.val().roomNum)
                    {
                        roomNumMax = children.val().roomNum
                    }
                    console.log(roomNumMax)
                })
                console.log(roomNumMax)
                //                resolve(roomNumMax)
            })
            resolve(roomNumMax)
        })

        result.then((innerResult) => {
            console.log(innerResult)     //なぜ0と表示される?
            roomNumInfo.push({
                roomNum: innerResult
            })
        })


        let roomNumTemp = 0;
        const roomNumFinal = 0;
        const roomName = this.state.roomName

        roomNumInfo.on("value", (snapshot) => {
            snapshot.forEach((children) => {
                if (roomNumTemp < children.val().roomNum)
                {
                    roomNumTemp = children.val().roomNum
                    console.log("roomNumTempの値:" + roomNumTemp)             //OK
                }
            })
            database.ref(RoomInformation).push({
                user: roomName,
                roomNum: roomNumTemp,
            })
        })

        console.log("roomNumTempの値:" + roomNumTemp)
        this.setState({
            // roomArray: ChatArrayInformation,
            roomName: '',
            roomNumTotal: this.state.roomNumTotal + 1,
            roomNameError: ''
        })
        console.log("RoomSetterのsetStateが呼ばれました")
    }

    roomNameHandler = (e) => {
        this.setState({
            roomName: e.target.value,
        })
    }

    clickChatRoom = (num) => {
        const database = firebase.database()
        database.ref("selectedRoomNum").push({
            selectedRoomNum: num,
            user: this.state.user
        })
        database.ref("doneMakeRoom").push({          //doneGoneRoomって名前を変えた方がいい。部屋選択画面に戻ると、doneMakeRoom:0,user:this.state.userとしてあげる
            doneMakeRoom: 1,
            user: this.state.user,
        })
        this.setState({
            doneMakeRoom: 1,
            selectedRoomNum: num
        })
    }

    roomNumSelecter = (num) => {
        this.setState({
            selectedRoomNum: num
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

    chatBack = () => {
        const database = firebase.database()
        database.ref("doneMakeRoom").push({
            doneMakeRoom: 0,
            user: this.state.user,
        })
        this.setState({
            forRender: 1
        })

    }

    logout = () => {
        firebase.auth().signOut();
    }

    addEventListener = () => {
        if (this.state.message == '')
        {
            return
        }
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

        database.ref(selectedRoomNum).push({
            user: this.state.user,
            message: this.state.message,
            photo: this.state.photo
        });

        this.setState({
            message: '',
        })

        const chatLog = firebase.database().ref(selectedRoomNum);

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
        console.log("Homeのrender（）が呼ばれました")
        const database = firebase.database()
        const PageLink = [];
        const PageRouter = [];
        const RoomInformation = "RoomInformation"
        const roomChatLog = database.ref(RoomInformation)

        roomChatLog.on("value", (snapshot) => {
            snapshot.forEach((children) => {
                PageLink.push(< Link to='children.val().roomNum' onClick={() => this.ClickChatRoom(children.val().roomNum)}><div className="ChatRoomLinkBox" >Room名:{children.val().roomName}</div></Link>)
                PageRouter.push(<Route path='children.val().roomNum'><ChatPage {...this.state} /></Route>)
            })
        })
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

        console.log("doneMakeRoom:" + doneMakeRoom)
        return (
            <div class="chatAll">
                {
                    this.state.user ?
                        (doneMakeRoom == 1 ? (<ChatPage {...this.state} addEventListener={this.addEventListener} chatBack={this.chatBack} handleMessage={this.handleMessage} logout={this.logout} RoomNumSelecter={this.roomNumSelecter} />) :
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
                                        <ChatRoomTextButton RoomSetter={this.roomSetter} />
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