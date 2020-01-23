import React from 'react';
import Home from './Home.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state({
            user: null,
            photo: null,
            message: '',
            log: [],
            roomNumTotal: 0
        })
    }

    SetUser = (e) => {
        this.setStata({
            user: e.target.value
        })
    }
    SetMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    PageNumAdder = () => {
        const i = 1
        this.setState({
            roomNumTotal: this.state.roomNumTotal + i
        })


    }
    render() {
        const PageLink = [];
        const PageRouter = [];
        {
            for (let i = 0; i < this.state.rootNumTotal; i++)
            {
                PageLink.push(<li><Link to="this.state.rootNumTotal" >Room:{this.state.roomNumTotal}</Link></li>)
                PageRouter.push(<Route path="this.state.rootNumTotal"><Home onClick={this.state.PageNumAdder} {...this.state} SetUser={this.SetUser} SetMessag={this.SetMessage} /></Route >)
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