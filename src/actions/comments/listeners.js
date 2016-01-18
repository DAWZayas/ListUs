import { SET_COMMENTS } from './action-types';

export function registerListeners(idList){

  return (dispatch, getState) => {

    const { firebase } = getState();
    const ref = firebase.child('comments');
    ref.on('value', snapshot => {
      const list = snapshot.val()[idList] ?
                        Object.keys(snapshot.val()[idList]).map( () => snapshot.val()[idList])[0]
                        : null;
      dispatch({
        type: SET_COMMENTS,
        comments: list ? Object.keys(list).reduce( (init, id) => init.concat({id, user:list[id].user, date:list[id].date, hour:list[id].hour, msg:list[id].msg}), []) :  []
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
      comments: []
    });
  };
}
