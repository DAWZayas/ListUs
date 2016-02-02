import { SET_USER, CHANGE_IMG_ERROR, CHANGE_NAME_ERROR, CHANGE_VISIBILITY_ERROR } from './action-types';

function authenticate(provider) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const users = firebase.child('users');

    firebase.authWithOAuthPopup(provider, (error, authData) => {
      if (error) {
        console.error('ERROR @ authWithOAuthPopup :', error);
      }else {
        users.once('value', snap => {

          let newId = authData.id;
          if(!newId) newId = authData.uid;
          const oldAccounts = snap.val()[auth.id].accounts;

          if(oldAccounts.indexOf(newId) === -1){
            createUserIfNotExists(authData, firebase);
            users.child(`${auth.id}`).update({accounts: [authData.uid]});
          }
        });
      }
    });
  };
}

export function signInWithGithub() {
  return authenticate('github');
}

export function signInWithTwitter() {
  return authenticate('twitter');
}

export function signInWithGoogle() {
  return authenticate('google');
}

export function cancelSignIn() {
  return dispatch => {
    return dispatch(pushState(null, '/'));
  };
}

export function createUserIfNotExists(authData, firebase){
  let name = '';

  if(authData.provider === 'github')  name = authData.github.username;

  if(authData.provider === 'twitter') name = authData.twitter.username;

  if(authData.provider === 'google') name = authData[authData.provider].displayName;

  if(authData.provider === 'password') name = authData.password.email;

  firebase.child(`users/${authData.uid}`).update({name, img: '', visibility: false, accounts: [auth.id]});
}

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
          }else if (snapshotGroups.val().groupId.administrator.indexOf(oldName)!==-1){
            const administrator = snapshotGroups.val().groupId.administrator.filter( nameUserInAdminGroups => nameUserInAdminGroups!==oldName ).concat(name);
            firebase.child(`groups/${groupId}`).update({administrator});
          }
        });
      });

      //CHANGE NAME IN LISTS
      firebase.child('lists').once('value', snapshotLists => {
        Object.keys( snapshotLists.val() ).map( function(listId){
          if(snapshotLists.val()[listId].participants!==undefined && snapshotLists.val()[listId].participants.indexOf(oldName)!==-1){
            const participants = snapshotLists.val()[listId].participants.filter( nameUserInParticipantsGroups => nameUserInParticipantsGroups!==oldName ).concat(name);
            firebase.child(`lists/${listId}`).update({participants});
          }else if (snapshotGroups.val().groupId.admin.indexOf(oldName)!==-1){
            const admin = snapshotGroups.val().groupId.admin.filter( nameUserInAdminGroups => nameUserInAdminGroups!==oldName ).concat(name);
            firebase.child(`groups/${groupId}`).update({admin});
          }
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
