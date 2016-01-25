import { SET_GROUPS } from './action-types';
import { SET_FRIENDS } from '../friends/action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
      firebase.child(`users/${auth.id}/groups`).on('value', snapshot => {
        let promise = (snapshot.val() || []).map(idGroup => new Promise(
          resolve => firebase.child(`groups/${idGroup}`).once('value', snap => {resolve({id: idGroup, name: snap.val().name});})
        ));
        Promise.all(promise).then(groups => dispatch({type: SET_GROUPS, groups}));
      });
      

      const refGlobal = firebase.child('friends');
      let friends;
      const ref = firebase.child(`users/${auth.id}/friends`);

      ref.on('value', snapshot => {
        friends = snapshot.val() === null ? [] : snapshot.val();
        refGlobal.once('value', snapshot => {dispatch({
            type: SET_FRIENDS,
            friends: Object.keys(snapshot.val() || []).reduce( (init, id) => friends.indexOf(id) !== -1 
              ? init.concat({id, groups:snapshot.val()[id].groups, img:snapshot.val()[id].img, name:snapshot.val()[id].name}) 
              : init, [])
          });
        });
      });
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

