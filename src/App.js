import React, { Component } from 'react'
import UsernameForm from './UsernameForm'
import Chat from './Chat'

class App extends Component {
  state = {
    currentUsername: null,
    currentId: null,
    currentScreen: 'usernameForm'
  }

  onUsernameSubmitted = username => {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          currentId: data.id,
          currentUsername: data.name,
          currentScreen: 'chat'
        })
      })
      .catch(error => {
        console.error('error', error)
      })
  }

  render() {
    if (this.state.currentScreen === 'usernameForm') {
      return <UsernameForm handleSubmit={this.onUsernameSubmitted} />
    }

    if (this.state.currentScreen === 'chat') {
      return <Chat currentId={this.state.currentId} />
    }
  }
}

export default App
