import {ADD_COMMENT, REMOVE_COMMENTS, ADD_LIST } from '../actions';
//import { ROUTER_DID_CHANGE } from 'redux-router/lib/constants';

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
/*
function setCommentsReaded(state, path){
  const idList = path.slice(6, path.length);
  "/list/"===path.slice(0,6) && path.length>6 ? 'leidos' : 'no leidos';
}*/

export default function reduceComment( state={}, action ){

  switch (action.type) {
    case ADD_COMMENT:
      return addComment(state, action.idList, action.user, action.date, action.hour, action.msg);
    case REMOVE_COMMENTS:
      return removeComments(state, action.idList);
    case ADD_LIST:
      return addCommentToList(state, action.id);
    /*case ROUTER_DID_CHANGE:
      return setCommentsReaded(state, action.payload.location.pathname);*/
    default:
      return state;
  }
}
