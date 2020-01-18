import React from 'react'
import firebase from '../firebase/config.js';

class Chat extends React.Component {

    render() {
        return (
            <div>
                <a>{this.props.user}</a>
                <input type="text" onChange={(event) => this.props.handleMessage(event)} />
                <input type="button" onClick={() => this.props.addEventListener()} value="send" />
                <div>
                    {this.props.log.map((chat, index) => {
                        return (
                            <div>{chat.user},{chat.message}</div>
                        )
                    })}
                </div>
            </div>

        )
    }
}
export default Chat




