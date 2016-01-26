import { SET_LISTS } from '../actions/listsDetailsActions';

function setList(state, lists) {
  return lists.slice();
}

export default function listReducer( state = [], action){
  switch (action.type) {
    case SET_LISTS:
  		return setList(state, action.lists);

    default:
      return state;
  }
}
