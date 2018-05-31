import React, { Component } from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import OnlineList from './OnlineList'
import config from '../configuration.js'

class Chat extends React.Component {
  state = {
    currentUser: null,
    currentRoom: {},
    messages: []
  }

  componentDidMount() {
    const chatkit = new ChatManager({
      instanceLocator: 'YOUR INSTANCE LOCATOR',
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url: 'YOUR TOKEN PROVIDER URL'
      })
    })

    chatkit
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })

        return currentUser.subscribeToRoom({
          roomId: 8434070,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            },
            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()
          }
        })
      })
      .then(currentRoom => {
        console.log('currentRoom', currentRoom)
        this.setState({ currentRoom })
      })
      .catch(error => console.error('error', error))
  }

  onSend = text => {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div>
          <OnlineList
            currentUser={this.state.currentUser}
            users={this.state.currentRoom.users}
          />
        </div>
        <div className="chat">
          <MessageList messages={this.state.messages} />
          <SendMessageForm onSend={this.onSend} />
        </div>
      </div>
    )
  }
}

export default Chat
