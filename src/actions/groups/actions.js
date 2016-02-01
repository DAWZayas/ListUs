import { SET_GROUPS, ADD_GROUP_ERROR, REMOVE_GROUP_ERROR, ADD_FRIEND_GROUP_ERROR } from './action-types';

export function setGroups(groups){
  return { type: SET_GROUPS, groups };
}

export function addGroup(name){
  return (dispatch, getState) => {
    const { firebase, user, auth } = getState();
    const groupRef = firebase.child('groups').push({name, showFriends: false,
       administrator: [user.name]
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

    new Promise(resolve => {
      firebase.child(`groups/${id}/name`).once('value', snaps => { 
        resolve(snaps.val());
      });
    }).then( name =>{
      removeGroupFormLists(name, firebase);
    }).then( () => {
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
    });
    abandonGroup(id, firebase, auth);
  };
}

export function abandonGroup(id, firebase, auth){
    let groups = [];
    firebase.child(`users/${auth.id}/groups`).once('value', snap => {
      groups = snap.val().filter(groupId => groupId !== id);
      firebase.child(`users/${auth.id}/groups`).set(groups);
    });
}

export function removeGroupFormLists(name, firebase){
    firebase.child('lists').once('value', snap => {
      Object.keys(snap.val()).map( idList => {
        firebase.child(`lists/${idList}/participantsGroups`).once('value', snapshot => {
            if(snapshot.val().indexOf(name) !== -1){
              let participantsGroups = snapshot.val().filter(nameGroup => nameGroup !== name);
              firebase.child(`lists/${idList}/participantsGroups`).set(participantsGroups);
            }  
        });
      });
    });

}

export function editGroup(id, name){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
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
    firebase.child(`users/${auth.id}`).update({refresh: ''});
    firebase.child(`users/${auth.id}/refresh`).remove();
  };
}


export function changeGroupAdmin(friendName, idGroup){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`groups/${idGroup}/administrator`).set(friendName,
     error => {
        if(error){
          console.error('ERROR @ changeGroupAdmin:', error);
          dispatch({
            type: CHANGE_GROUP_ADMIN_ERROR,
            payload: error,
        });
        }
    });
    firebase.child(`users/${auth.id}`).update({refresh: ''});
    firebase.child(`users/${auth.id}/refresh`).remove();
  };
}


export function addGroupFriend(friendName, idGroup){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    new Promise( resolve => {
      firebase.child(`groups/${idGroup}/friends`).once('value', snapshot => resolve(snapshot.val() || []));
    }).then( val => {
      if(val.indexOf(friendName) === -1){
        val.push(friendName);
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
      }}
    ).then(
        () => firebase.child(`users/${auth.id}`).update({refresh: ''})).then(
        () => firebase.child(`users/${auth.id}/refresh`).remove()
    );
  };
}

export function removeGroupFriend(friendName, idGroup){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    new Promise( resolve => {
      firebase.child(`groups/${idGroup}/friends`).once('value', snapshot => resolve(snapshot.val()));
    }).then( val => {
      val.splice(val.indexOf(friendName), 1);
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
    }).then(
        () => firebase.child(`users/${auth.id}`).update({refresh: ''})).then(
        () => firebase.child(`users/${auth.id}/refresh`).remove()
    );
  };
}
