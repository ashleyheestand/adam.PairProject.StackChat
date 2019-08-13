import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { connect } from 'react-redux';
import { initialState, fetchMessages } from '../store';

export class MessagesList extends Component {
  constructor() {
    super();
    this.state = { messages: [] };
  }

  async componentDidMount() {
    await this.props.fetchInitialMessages();

    this.setState({ messages: this.props.messages });
  }

  render() {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(
      message => message.channelId === channelId,
    );

    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map(message => (
            <Message message={message} key={message.id} />
          ))}
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialMessages: () => dispatch(fetchMessages()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagesList);
