import { SET_USER, CHANGE_IMG_ERROR, CHANGE_NAME_ERROR, CHANGE_VISIBILITY_ERROR } from './action-types';

export function setUser(user){
  return { type: SET_USER, user };
}


export function changeImg(url){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`users/${auth.id}/img`).set(url, error => {
        if(error){
          console.error('ERROR @ changeImg:', error);
          dispatch({
            type: CHANGE_IMG_ERROR,
            payload: error,
        });
        }
    });
  };
}

export function changeVisibility(visibility){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`users/${auth.id}/visibility`).set(visibility, error => {
        if(error){
          console.error('ERROR @ changeVisibility:', error);
          dispatch({
            type: CHANGE_VISIBILITY_ERROR,
            payload: error,
        });
        }
    });
  };
}


export function changeName(name){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();


    firebase.child(`users/${auth.id}`).once('value', snapshotUser => {
      const oldName = snapshotUser.val().name;

      //CHANGE OLDER NAME IN GROUPS
      firebase.child('groups').once('value', snapshotGroups => {
        Object.keys( snapshotGroups.val() ).map( function(groupId){
          if(snapshotGroups.val()[groupId].friends!==undefined && snapshotGroups.val()[groupId].friends.indexOf(oldName)!==-1){
            const friends = snapshotGroups.val()[groupId].friends.filter( nameUserInParticipantsGroups => nameUserInParticipantsGroups!==oldName ).concat(name);
            firebase.child(`groups/${groupId}`).update({friends});
          }/*else if (snapshotGroups.val().groupId.admin.indexOf(oldName)!==-1){
            const admin = snapshotGroups.val().groupId.admin.filter( nameUserInAdminGroups => nameUserInAdminGroups!==oldName ).concat(name);
            firebase.child(`groups/${groupId}`).update({admin});
          }*/
        });
      });

      //CHANGE NAME IN LISTS
      firebase.child('lists').once('value', snapshotLists => {
        Object.keys( snapshotLists.val() ).map( function(listId){
          if(snapshotLists.val()[listId].participants!==undefined && snapshotLists.val()[listId].participants.indexOf(oldName)!==-1){
            const participants = snapshotLists.val()[listId].participants.filter( nameUserInParticipantsGroups => nameUserInParticipantsGroups!==oldName ).concat(name);
            firebase.child(`lists/${listId}`).update({participants});
          }/*else if (snapshotGroups.val().groupId.admin.indexOf(oldName)!==-1){
            const admin = snapshotGroups.val().groupId.admin.filter( nameUserInAdminGroups => nameUserInAdminGroups!==oldName ).concat(name);
            firebase.child(`groups/${groupId}`).update({admin});
          }*/
        });
      });

      //CHANGE NAME IN USERS FRIENDS
      firebase.child(`users`).once('value', snapshotUsers => {
        Object.keys( snapshotUsers.val() ).map( function(userId){
          if(snapshotUsers.val()[userId].friends!==undefined && snapshotUsers.val()[userId].friends.indexOf(oldName)!==-1){
            const friends = snapshotUsers.val()[userId].friends.filter( nameUserInParticipantsGroups => nameUserInParticipantsGroups!==oldName ).concat(name);
            firebase.child(`users/${userId}`).update({friends});
          }
      });

    });

  });

    firebase.child(`users/${auth.id}/name`).set(name, error => {
        if(error){
          console.error('ERROR @ changeName:', error);
          dispatch({
            type: CHANGE_NAME_ERROR,
            payload: error,
        });
        }
    });


  };
}
