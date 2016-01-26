import { SET_NOTIFICATIONS } from '../actions/notifications';

function setNotifications(state, pendingActions){
  return pendingActions.slice();
}

export default function friendReduce(state = [], action){
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return setNotifications(state, action.pendingActions);
    default:
      return state;
  }
}
