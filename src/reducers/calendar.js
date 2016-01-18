import { SET_CALENDAR} from '../actions/calendar';

function setCalendar(state, calendar){
  return Object.assign({}, state, calendar);
}

export default function reducerCalendar( state = {}, action ){
  switch (action.type) {
    case SET_CALENDAR:
      return setCalendar(state, action.calendar);
    default:
  
      return state;
  }
}
