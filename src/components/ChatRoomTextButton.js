import React from 'react'
import '../style/ChatRoomTextButton.css'

class ChatRoomTextButton extends React.Component {
    render() {
        return (
            <div >
                <input type="button" className="ChatRoomTextButton" value="Send" onClick={() => this.props.RoomSetter()} />
            </div>
        )
    }
}

export default ChatRoomTextButton