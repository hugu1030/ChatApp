import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyB4MYz-3RHiGIVGNgydpdBWWd27E5Ttjfk",
    authDomain: "react-chat-293c3.firebaseapp.com",
    databaseURL: "https://react-chat-293c3.firebaseio.com",
    projectId: "react-chat-293c3",
    storageBucket: "react-chat-293c3.appspot.com",
    messagingSenderId: "955904400424",
    appId: "1:955904400424:web:e14ef33f4685774e1ee91d",
    measurementId: "G-MG01CKSXMF"
};


firebase.initializeApp(firebaseConfig)

export default firebase