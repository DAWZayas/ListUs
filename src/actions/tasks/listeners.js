import { SET_TASKS } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('tasks');

    ref.on('value', snapshot => {dispatch({
      type: SET_TASKS,
      tasks: Object.keys(snapshot.val() || {}).reduce( (init, id) =>
        Object.assign({}, init, {[id]:{
          id,
          idList: snapshot.val()[id].idList,
          title: snapshot.val()[id].title,
          done: false
        }}), {})
      });
    });
  };
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('tasks');
    ref.off();
    dispatch({
      type: SET_TASKS,
      tasks: {}
    });
  };
}
