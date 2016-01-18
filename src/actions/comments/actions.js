import { SET_COMMENTS } from './action-types';



export function onAddComment(idList, user, date, hour, msg){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child('comments').push({idList, user:'Pepe', date, hour, msg }, error => {
        if(error){
          console.error('ERROR @ addFriend:', error);
          dispatch({
            type: ADD_COMMENT_ERROR,
            payload: error,
        });
        }
    });
  };
}

export function onRemoveComments(idList){
  //Function that removes a friend from Firebase;
}
