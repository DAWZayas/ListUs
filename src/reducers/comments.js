import {ADD_COMMENT, REMOVE_COMMENTS, ADD_LIST } from '../actions';


function addComment(state, idList, user, date, hour, msg){
  const arrayComents = state[idList] === undefined ? [] : state[idList];
  const newArray = arrayComents.concat({ user, date, hour, msg});
  return Object.assign( {}, state, {[idList]:newArray});
}

function removeComments(state, idList){
  let newState = Object.assign({}, state);
  delete newState[idList];
  return newState;
}

function addCommentToList(state, id) {
  return Object.assign( {}, state, {[id]: []});
}


export default function reduceComment( state={}, action ){

  switch (action.type) {
    case ADD_COMMENT:
      return addComment(state, action.idList, action.user, action.date, action.hour, action.msg);
    case REMOVE_COMMENTS:
      return removeComments(state, action.idList);
    case ADD_LIST:
      return addCommentToList(state, action.id);
    default:
      return state;
  }
}
