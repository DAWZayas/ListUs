import { SET_LISTS } from '../actions/lists';

function setList(state, lists) {
  return lists.slice();
}

/*function addList( state, title, date, importance, id ){
  return state.concat({
    id,
    'title': title,
    participants: [],
    'date': date,
    'importance': importance
  });
}

function removeList( state, idList ){
  return state.filter( list => list.id !== idList );
}

function editList(state, idList, title, newDate, importance){
  return state.map( list => list.id === idList ? Object.assign( {}, list, {'title': title, 'date': newDate, 'importance': importance }) : list );
}

function addFriendGroupToList(state, idList, id){
  return state.map( list => list.id===idList ? Object.assign( {}, list, {participants:list.participants.concat(id)}) : list);
}

function removeFriendGroupToList(state, idList, idPaticipant){
  return state.map( list => list.id===idList ? Object.assign( {}, list, {participants:list.participants.filter(item => idPaticipant!==item.id)}) : list);
}

*/
export default function listReducer( state = [], action){
  switch (action.type) {
    case SET_LISTS:
  		return setList(state, action.lists);
    /*case ADD_LIST:
      return addList(state, action.title, action.date, action.importance, action.id);
    case REMOVE_LIST:
      return removeList(state, action.idList);*/
    default:
      return state;
  }
}
