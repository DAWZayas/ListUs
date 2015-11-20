import { ADD_DATE } from '../actions';


function addDate(state){
  return state;
}

export default function reducerCalendar( state={}, action ){
  switch (action.type) {
    case ADD_DATE:
      return addDate(state);
    default:
      return state;
  }
}
