import React, { Component } from 'react'
import { TextInput } from 'react-desktop/macOs'
import { Button } from 'react-desktop/macOs'

class UsernameForm extends Component {
  constructor() {
    super()
    this.state = {
      username: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit(this.state.username)
  }

  handleChange = e => {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <div className="username-form">
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextInput
              label="Username:"
              placeholder="For example, @bookercodes"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <Button color="blue" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default UsernameForm
