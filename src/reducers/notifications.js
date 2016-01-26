import { SET_NOTIFICATIONS } from '../actions/notifications';
import { ADD_LIST_CORRECT, REMOVE_LIST_CORRECT } from '../actions/sectionActions';

function showAdvice(state, msg){
  return msg;
}

export default function friendReduce(state = [], action){
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return setNotifications(state, action.state);
    case ADD_LIST_CORRECT:
      return showAdvice(state, action.msg);
    case REMOVE_LIST_CORRECT:
      return showAdvice(state, action.msg);
    default:
      return state;
  }
}
