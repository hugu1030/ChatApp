import React from 'react'
import '../style/ChatRoomTextBox.css'

class ChatRoomTextBox extends React.Component {
    render() {
        return (
            <div >
                <input type="text" className="ChatRoomTextBox" value={this.props.roomName} onChange={(e) => this.props.RoomNameHandler(e)} />
            </div>
        )
    }
}

export default ChatRoomTextBox