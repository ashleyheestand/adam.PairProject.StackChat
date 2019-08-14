import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

//Initial State
export const initialState = {
  messages: [],
  channels: [],
  newMessage: '',
};

//Action Types
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_CHANNELS_FROM_SERVER = 'GOT_CHANNELS_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

//Action Creators
//Messages is the payload of the action
export const gotMessagesFromServer = messages => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages,
});

export const gotChannelsFromServer = (messages, channels) => ({
  type: GOT_CHANNELS_FROM_SERVER,
  messages,
  channels,
});

export const writeMessage = inputContent => ({
  type: WRITE_MESSAGE,
  newMessage: inputContent,
});

export const gotNewMessageFromServer = message => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  message,
});

export const fetchMessages = () => {
  return async dispatch => {
    const response = await axios.get('/api/messages');
    const messages = response.data;
    const action = gotMessagesFromServer(messages);
    dispatch(action);
  };
};

export const fetchChannels = () => {
  return async dispatch => {
    const response = await axios.all([
      axios.get('/api/messages'),
      axios.get('/api/channels'),
    ]);
    const messages = response[0].data;
    const channels = response[1].data;
    const action = gotChannelsFromServer(messages, channels);
    dispatch(action);
  };
};

export const postNewMessage = message => {
  return async dispatch => {
    const response = await axios.post('/api/messages', message);
    const newMessage = response.data;
    const action = gotNewMessageFromServer(newMessage);
    dispatch(action);
    socket.emit('new-message', newMessage);
  };
};

//Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case GOT_CHANNELS_FROM_SERVER:
      let intermediary = { ...state, messages: action.messages };
      return { ...intermediary, channels: action.channels };
    case WRITE_MESSAGE:
      return { ...state, newMessage: action.newMessage };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {
        ...state,
        messages: [...state.messages, action.message],
        newMessage: '',
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;
