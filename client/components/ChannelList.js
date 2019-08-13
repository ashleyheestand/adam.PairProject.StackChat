import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store, { fetchChannels } from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
// const RANDOM_CHANNEL = '/channels/1';
// const GENERAL_CHANNEL = '/channels/2';
// const DOGS_CHANNEL = '/channels/3';
// const LUNCH_CHANNEL = '/channels/4';

export class ChannelList extends Component {
  constructor() {
    super();
    this.state = { channels: [], messages: [] };
  }
  async componentDidMount() {
    await this.props.fetchInitialChannels();
    this.setState(store.getState);
  }

  render() {
    const channels = this.state.channels;
    const messages = this.state.messages;
    // console.log(this.state);
    return (
      <ul>
        {channels.map(channel => (
          <li key={channel.id}>
            <NavLink to={`/channels/${channel.id}`} activeClassName="active">
              <span>{channel.name}</span>
              <span className="badge">
                {
                  messages.filter(message => message.channelId === channel.id)
                    .length
                }
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channels,
    messages: state.messages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialChannels: () => dispatch(fetchChannels()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChannelList),
);
