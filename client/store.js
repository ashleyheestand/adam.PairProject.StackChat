import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import axios from 'axios';

//Initial State
export const initialState = {
  messages: [],
  channels: [],
};

//Action Types
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_CHANNELS_FROM_SERVER = 'GOT_CHANNELS_FROM_SERVER';

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

//Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case GOT_CHANNELS_FROM_SERVER:
      let intermediary = { ...state, messages: action.messages };
      return { ...intermediary, channels: action.channels };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;
