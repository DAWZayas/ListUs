import { SET_ALERT, CLEAN_ALERT } from '../actions/alerts';

function setAlert(state, msg){
  return msg;
}

function cleanAlert(){
  return {msg:''};
}

export default function reducerCalendar( state = {msg:''}, action ){
  switch (action.type) {
    case SET_ALERT:
      return setAlert(state, action);
    case CLEAN_ALERT:
      return cleanAlert();
    default:
      return state;
  }
}
