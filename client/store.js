import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import axios from 'axios';

//Initial State
export const initialState = {
  messsages: [],
};

//Action Types
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

//Action Creators
//Messages is the payload of the action
export const gotMessagesFromServer = messages => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages,
});

export const fetchMessages = () => {
  return async dispatch => {
    const response = await axios.get('/api/messages');
    const messages = response.data;
    const action = gotMessagesFromServer(messages);
    dispatch(action);
  };
};

//Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;
