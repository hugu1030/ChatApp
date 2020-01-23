import React from 'react';
import Login from '../components/Login.js';
import firebase from '../firebase/config.js';
import ChatPage from '../components/Chat.js';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            photo: null,
            message: '',
            log: [],
        }

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
    }

    logout = () => {
        firebase.auth().signOut();
    }

    addEventListener = () => {
        const room = "chat"
        const database = firebase.database();

        database.ref(room).push({
            user: this.state.user,
            message: this.state.message,
            photo: this.state.photo
        });

        this.setState({
            message: '',
        })

        const chatLog = firebase.database().ref(room);

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
            <div class="chatAll">
                {this.state.user ? (<ChatPage {...this.state} addEventListener={this.addEventListener} handleMessage={this.handleMessage} logout={this.logout} />

                ) : (<Login {...this.state} logout={this.logout} login={this.login} />
                    )}
            </div>
        )
    }
}

export default Home
