import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeMessage, postNewMessage } from '../store';

export class NewMessageEntry extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.writeMessage(event.target.value);
  }

  handleSubmit(evt) {
    evt.preventDefault(); // don't forget to preventDefault!

    // our message content is on our state, which we're getting from our Redux store
    const content = this.props.newMessage;
    // our channelId is available from the props sent by MessagesList, which it receives as props from the Route!
    const channelId = this.props.channelId;

    this.props.postMessage({ content, channelId });
  }

  render() {
    console.log('props', this.props);
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.props.newMessage}
            onChange={this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  console.log(state, 'state');
  return {
    newMessage: state.newMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    writeMessage: str => dispatch(writeMessage(str)),
    postMessage: obj => dispatch(postNewMessage(obj)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMessageEntry);
