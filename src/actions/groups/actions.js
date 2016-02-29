import { SET_GROUPS, ADD_GROUP_ERROR, REMOVE_GROUP_ERROR, ADD_FRIEND_GROUP } from './action-types';
import { getActualDate } from '../../utils/functions';
import { registerListeners } from './listeners';

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
    abandonGroup(id, firebase);
  };
}

export function abandonGroup(id, firebase){
  firebase.child('users').once('value', snap => {
    Object.keys(snap.val()).map(idUser => {
      if(snap.val()[idUser].groups){
        if (snap.val()[idUser].groups.indexOf(id) !== -1){
          const groups = snap.val()[idUser].groups.filter(groupId => groupId !== id);
          firebase.child(`users/${idUser}/groups`).set(groups);
        }
      }
    });
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
    dispatch(registerListeners());
  };
}


export function changeGroupAdmin(friendName, idGroup, userName){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`groups/${idGroup}/administrator`).once('value', snap => {
      const admins = snap.val().map( admin => (admin === userName) ?friendName :admin);
      firebase.child(`groups/${idGroup}/administrator`).set(admins);
      firebase.child('users').once('value', snaps => {
        Object.keys(snaps.val()).map(authId => {
          if(snaps.val()[authId].name === friendName){
            const groups = snaps.val()[authId].groups 
              ? snaps.val()[authId].groups.indexOf(idGroup) === -1
                ? snaps.val()[authId].groups.concat(idGroup) 
                : snaps.val()[authId].groups
              :[idGroup];
            firebase.child(`users/${authId}/groups`).set(groups);
          }
        });
      });
    });
    dispatch(registerListeners());
  };
}


export function addGroupFriend(friendName, idGroup){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    new Promise(resolve => {
      firebase.child(`groups/${idGroup}`).once('value', snapGroup => {
        resolve(snapGroup.val().name);
      });
    }).then(group => {
      firebase.child('users').once('value', snapshot => {
        const description = snapshot.val()[auth.id].name+' wants you to join the group "'+group+'"';
        const date = getActualDate();
        const newPendingAction = {
          type: ADD_FRIEND_GROUP,
          friendName,
          idGroup,
          descr: description,
          date
        };
        Object.keys(snapshot.val()).map(idUser => {
          if(snapshot.val()[idUser].name === friendName){
            let pendingActions = (snapshot.val()[idUser].pendingActions)
                ? snapshot.val()[idUser].pendingActions.concat(newPendingAction)
                : [newPendingAction];
            firebase.child(`users/${idUser}/pendingActions`).set(pendingActions);
          }
        });
      });
    });
    dispatch(registerListeners());

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
    dispatch(registerListeners());

  };
}
