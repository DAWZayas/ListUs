import { SET_LISTS, ADD_LIST_CORRECT } from '../actions/listsDetailsActions';

function setList(state, lists) {
  return lists.slice();
}

function showAdvice(state, msg){
  debugger;
  return msg;
}



export default function listReducer( state = [], action){
  if (action.type = "ADD_LIST_CORRECT") {
    debugger;
  }
  switch (action.type) {
    case SET_LISTS:
  		return setList(state, action.lists);
    case ADD_LIST_CORRECT:
      return showAdvice(state, action.payload);
    default:
      return state;
  }
}
