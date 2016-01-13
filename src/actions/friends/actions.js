import { SET_FRIENDS, ADD_FRIENDS_ERROR, REMOVE_FRIENDS_ERROR } from './action-types';

export function setFriends(friends){
  return { type: SET_FRIENDS, friends};
}

export function addFriend(name){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child('friends').push({name, groups:'', img:'' }, error => {
        if(error){
          console.error('ERROR @ addFriend:', error);
          dispatch({
            type: ADD_FRIENDS_ERROR,
            payload: error,
        });
        }
    });
  };
}

export function removeFriend(id){
  //Function that removes a friend from Firebase;
}