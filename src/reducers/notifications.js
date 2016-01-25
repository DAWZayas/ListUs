import { SET_NOTIFICATIONS } from '../actions/notifications';

function setNotifications(state, fullState){
  return fullState;
}

export default function friendReduce(state = [], action){
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return setNotifications(state, action.state);
    default:
      return state;
  }
}
