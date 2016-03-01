import { SET_GROUPS } from './action-types';
import { SET_FRIENDS } from '../friends/action-types';
import { SET_USER } from '../user/action-types';



export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    firebase.child(`users/${auth.id}`).on('value', snapshot => {
      let promise = (snapshot.val().groups || []).map(idGroup => new Promise(
        resolve => firebase.child(`groups/${idGroup}`).once('value', snap => {
          resolve({id: idGroup, 
            name: snap.val().name,
            administrator: snap.val().administrator,
            friends: snap.val().friends,
            showFriends: snap.val().showFriends
          });})
      ));
      Promise.all(promise).then(groups => dispatch({type: SET_GROUPS, groups }));
    });
    setFriendsByFirebase(firebase, auth, dispatch);
    setUserByFirebase(firebase, auth, dispatch);
    
  };
}

function setFriendsByFirebase(firebase, auth, dispatch){
  let friends = [];

  firebase.child(`users/${auth.id}/friends`).on('value', snapshot => {
    friends = snapshot.val() === null ? [] : snapshot.val();
    firebase.child('users').once('value', snapshot => {dispatch({
      type: SET_FRIENDS,
      friends: Object.values(snapshot.val() || {}).reduce( (init, user) => friends.indexOf(user.name) !== -1 
        ? init.concat({user, img: user.img, name:user.name}) 
        : init, [])
      });
    });
  });
}

function setUserByFirebase(firebase, auth, dispatch){
  firebase.child(`users/${auth.id}`).on('value', snapshot => {
    dispatch({
      type: SET_USER,
      user: {
        id: auth.id,
        name: snapshot.val()['name'],
        img: snapshot.val()['img'],
        visibility: snapshot.val()['visibility']
      }
    });
  });
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`users/${auth.id}/groups`).off();
    firebase.child(`users/${auth.id}/friends`).off();
    dispatch({
      type: SET_GROUPS,
      groups: []
    });
    dispatch({
      type: SET_FRIENDS,
      friends: []
    });
    dispatch({
      type: SET_USER,
      user: {}
    });
  };
}

