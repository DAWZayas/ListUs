import { SET_LIST, ADD_LIST, REMOVE_LIST, EDIT_LIST, ADD_FRIEND_OR_GROUP_TO_LIST, REMOVE_FRIEND_OR_GROUP_TO_LIST } from '../actions';


function setList(state, list) {
  return list.slice();
}

function addList( state, title, date, importance, id ){
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


export default function listReducer( state = [], action){
  switch (action.type) {
    case SET_LIST:
  		return setList(state, action.list);
    case ADD_LIST:
      return addList(state, action.title, action.date, action.importance, action.id);
    case REMOVE_LIST:
      return removeList(state, action.idList);
    case EDIT_LIST:
      return editList(state, action.idList, action.title, action.newDate, action.importance);
    case ADD_FRIEND_OR_GROUP_TO_LIST:
      return addFriendGroupToList(state, action.idList, action.id);
    case REMOVE_FRIEND_OR_GROUP_TO_LIST:
      return removeFriendGroupToList(state, action.idList, action.idPaticipant);
    default:
      return state;
  }
}
