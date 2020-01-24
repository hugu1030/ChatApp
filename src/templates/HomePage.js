import React from 'react';
import Home from './Home.js';
import firebase from '../firebase/config.js';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class HomePage extends React.Component {

    componentDidMount() {
        console.log(this.refs);
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user)
                {
                    let userId = firebase.auth().currentUser
                    this.refs.Home.UserRegister(userId.displayName, userId.photoURL)
                } else
                {
                    this.refs.Home.UserRegister(null, null)
                }
            }
        )
    }

    GetRoomNumTotal(roomNumTotal) {
        this.setState({ roomNumTotal })
    }

    render() {
        const PageLink = [];
        const PageRouter = [];
        const roomNumTotal = React.createRef().Home.RoomNumTotalGetter()

        for (let i = 0; i < roomNumTotal; i++)
        {
            PageLink.push(<li><Link to='roomNumTotal' oncLick={this.refs.Home.RoomNumSelecter(this.rootNumTotal)}>Room:{this.refs.Home.RoomNumTotalGetter()}</Link></li>)
            PageRouter.push(<Route path='roomNumTotal'><Home GetRoomNumTotal={this.GetRoomNumTotal(); } /></Route>)
        }


        return (
            <Router>
                <div>
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
        )

    }
}

export default HomePage