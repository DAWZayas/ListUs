import { SET_GROUPS, ADD_GROUP_ERROR, REMOVE_GROUP_ERROR, ADD_FRIEND_GROUP_ERROR } from './action-types';

export function setGroups(groups){
  return { type: SET_GROUPS, groups };
}

export function addGroup(name){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const groupRef = firebase.child('groups').push({name, showFriends: false,
       administrator: auth.id
     }, error => {
        if(error){
          console.error('ERROR @ addGroup:', error);
          dispatch({
            type: ADD_GROUP_ERROR,
            payload: error,
        });
        }
    });
    
    new Promise( resolve => {
      firebase.child(`users/${auth.id}/groups`).once('value', snap => {
        resolve((snap.val()) ?snap.val().concat(groupRef.key()) :[groupRef.key()]);
     });
    }).then(groups => firebase.child(`users/${auth.id}/groups`).set(groups));
  };
}

export function removeGroup(id){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`groups/${id}`).remove(
     error => {
        if(error){
          console.error('ERROR @ removeGroup:', error);
          dispatch({
            type: REMOVE_GROUP_ERROR,
            payload: error,
          });
        }
    });

    let groups = [];
    firebase.child(`users/${auth.id}/groups`).once('value', snap => {
      groups = snap.val().filter(groupId => groupId !== id);
      firebase.child(`users/${auth.id}/groups`).set(groups);
    });
  };
}

export function editGroup(id, name){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child('groups/'+id).update({name},
     error => {
        if(error){
          console.error('ERROR @ editGroup:', error);
          dispatch({
            type: EDIT_GROUP_ERROR,
            payload: error,
        });
        }
    });
  };
}


export function changeGroupAdmin(idFriend, idGroup){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`groups/${idGroup}/administrator`).set(idFriend,
     error => {
        if(error){
          console.error('ERROR @ changeGroupAdmin:', error);
          dispatch({
            type: CHANGE_GROUP_ADMIN_ERROR,
            payload: error,
        });
        }
    });
  };
}


export function addGroupFriend(idFriend, idGroup){
  return (dispatch, getState) => {
    let val='';
    const { firebase } = getState();
    firebase.child(`groups/${idGroup}/friends`).once('value', snapshot => val = snapshot.val().split(','));
    if(val.indexOf(idFriend) === -1){
        val.join(',');
        val += (val === '') ?idFriend :','+idFriend;
        firebase.child(`groups/${idGroup}/friends`).set(val,
         error => {
            if(error){
              console.error('ERROR @ addGroupFriend:', error);
              dispatch({
                type: ADD_FRIEND_GROUP_ERROR,
                payload: error,
            });
            }
        });
    }
  };
}

export function removeGroupFriend(idFriend, idGroup){
  return (dispatch, getState) => {
    let val='';
    const { firebase } = getState();
    firebase.child(`groups/${idGroup}/friends`).once('value', snapshot => val = snapshot.val().split(','));
    val.splice(val.indexOf(idFriend), 1);
    val = val.join(',');
    firebase.child(`groups/${idGroup}/friends`).set(val,
     error => {
        if(error){
          console.error('ERROR @ removeGroupFriend:', error);
          dispatch({
            type: REMOVE_FRIEND_GROUP_ERROR,
            payload: error,
        });
        }
    });
  };
}







