//Initial State
const initialState = {
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

//Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    default:
      return state;
  }
};
