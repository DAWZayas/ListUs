export function onAddComment(idList, user, date, hour, msg){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    const refUser = firebase.child(`users/${auth.id}/name`);
    let user;
    refUser.once('value', snapshot => {
      user = snapshot.val();
      firebase.child(`comments/${idList}`).push({idList, user, date, hour, msg }, error => {
          if(error){
            console.error('ERROR @ addFriend:', error);
            dispatch({
              type: ADD_COMMENT_ERROR,
              payload: error,
          });
          }
      });
    });
    
  };
}

export function onRemoveComments(idList){
  debugger;
}
