import React from 'react';
import Home from './Home.js';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class HomePage extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user)
                {
                    let userId = firebase.auth().currentUser
                    this.setState({                          //初期登録
                        user: userId.displayName,
                        photo: userId.photoURL,
                    })
                } else
                {
                    this.setState({
                        user: null,
                        photo: null
                    })
                }

            }
        )
    }

    render() {
        const PageLink = [];
        const PageRouter = [];
        roomNumTotal = this.refs.Home.state.roomNumTotal
        {
            for (let i = 0; i < roomNumTotal; i++)
            {
                PageLink.push(<li><Link to='roomNumTotal' oncLick={this.refs.Home.RoomNumSelecter(rootNumTotal)}>Room:{this.state.roomNumTotal}</Link></li>)
                PageRouter.push(<Route path='roomNumTotal'><Home /></Route>)
            }
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