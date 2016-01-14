import { SET_GROUPS } from './action-types';
import { SET_FRIENDS } from '../friends/action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();

    firebase.child('groups').on('value', snapshot => {dispatch({
          type: SET_GROUPS,
          groups: Object.keys(snapshot.val() || []).reduce( (init, id) =>
           init.concat({id, 
              name:snapshot.val()[id].name, 
              showFriends:snapshot.val()[id].showFriends, 
              administrator:snapshot.val()[id].administrator,
              friends: (snapshot.val()[id].friends) ?snapshot.val()[id].friends.split(',') :[]}), [])
    })});

     firebase.child('friends').on('value', snapshot => {dispatch({
          type: SET_FRIENDS,
          friends: Object.keys(snapshot.val() || []).reduce( (init, id) => 
           init.concat({id, 
              groups:snapshot.val()[id].groups, 
              img:snapshot.val()[id].img, 
              name:snapshot.val()[id].name}), [])
    })});
  };
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('groups');
    ref.off();
    dispatch({
      type: SET_GROUPS,
      groups: []
    });
  };
}

