import React, { Component } from 'react'
import {
  ListView,
  ListViewSection,
  ListViewSectionHeader,
  ListViewRow,
  Text
} from 'react-desktop/macOs'

class MessageList extends Component {
  render() {
    return (
      <ListView>
        <ListViewSection>
          {this.props.messages.map((message, index) =>
            this.renderItem(message)
          )}
        </ListViewSection>
      </ListView>
    )
  }

  renderItem(message) {
    return (
      <ListViewRow key={message.id}>
        <Text color="#414141" size="13" bold>
          {message.sender.name}:
        </Text>
        <Text color="#414141" size="13">
          {message.text}
        </Text>
      </ListViewRow>
    )
  }
}

export default MessageList
