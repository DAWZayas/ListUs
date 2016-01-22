import { SET_USER } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    firebase.child(`users/${auth.id}`).on('value', snapshot => {dispatch({
          type: SET_USER,
          user: {name: snapshot.val()['name'],
            img: snapshot.val()['img'],
            visibility: snapshot.val()['visibility']
          }
    });});
  };
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const ref = firebase.child(`users/${auth.id}`);
    ref.off();
    dispatch({
      type: SET_USER,
      user: {}
    });
  };
}

