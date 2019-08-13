import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeMessage } from '../store';

export class NewMessageEntry extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.writeMessage(event.target.value);
  }

  render() {
    console.log('props', this.props);
    return (
      <form id="new-message-form">
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMessageEntry);
