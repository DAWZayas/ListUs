import { SET_COMMENTS } from './action-types';

export function registerListeners(){

  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('comments');
    //state.router.params.idList;

    ref.on('value', snapshot => {debugger;dispatch({
      type: SET_COMMENTS,
      comments: snapshot.val()[idList] ? snapshot.val()[idList] :  []
    });
  });

  };
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('comments');
    ref.off();
    dispatch({
      type: SET_COMMENTS,
      friends: []
    });
  };
}
