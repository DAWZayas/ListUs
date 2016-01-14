import { SET_CALENDAR } from './action-types';

export function setFriends(calendar){
  return { type: SET_CALENDAR, calendar};
}

/*export function addCalendar(name){
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
}*/