import {SET_COMMENTS} from '../actions/comments';

function setComments(state, comments){
  return comments.slice();
}

export default function reduceComment( state=[], action ){

  switch (action.type) {
    case SET_COMMENTS:
      return setComments(state, action.comments);
    default:
      return state;
  }
}
