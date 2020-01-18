import React from 'react';
import Login from '../Login.js';
import firebase from '../firebase/config.js';
import ChatPage from './Chat.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            message: null,
            log: [],
        }

        this.addEventListener = this.addEventListener.bind(this);
        this.addChatLog = this.addChatLog.bind(this);
    }

    login = () => {
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

    handleMessage = (e) => {
        this.setState({
            message: e.target.value,
        });
        console.log(this.state.message)
        console.log(this.state.user)
    }

    logout = () => {
        firebase.auth().signOut();
    }

    addEventListener = () => {
        let room = "chat"
        let database = firebase.database();
        database.ref(room).push({
            user: this.state.user,
            message: this.state.message,
        });

        this.setState({
            message: null,
        })

        let chatLog = firebase.database().ref(room);
        this.addChatLog.call(Home)
        chatLog.on("value", function (snapshot) {
            snapshot.forEach(function (children) {
                console.log(children.val().user)
                console.log(this)
                // this.addChatLog(children.val().user, children.val().message)
            })
        })
    }

    addChatLog = (user, message) => {
        let logchild = { user: user, message: message }
        let logarray = this.state.log.slice()
        logarray.push(logchild)
        this.setState({
            log: logarray
        })
    }

    componentDidMount() {
        console.log("DidMoutn")
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    let userId = firebase.auth().currentUser
                    console.log(userId.displayName)

                    this.setState({
                        user: userId.displayName
                    })
                } else {
                    this.setState({
                        user: null
                    })
                }

            }
        )
    }

    render() {
        return (
            <div>
                {this.state.user ? (<ChatPage {...this.state} addEventListener={this.addEventListener} handleMessage={this.handleMessage} />

                ) : (<Login {...this.state} logout={this.loout} login={this.login} />
                    )}
            </div>
        )
    }
}

export default Home
