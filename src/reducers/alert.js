import { SET_ALERT } from '../actions/alerts';

function setAlert(state, msg){
  return msg;
}

export default function reducerCalendar( state = {}, action ){
  switch (action.type) {
    case SET_ALERT:
      return setAlert(state, action.msg);
    default:
      return state;
  }
}
