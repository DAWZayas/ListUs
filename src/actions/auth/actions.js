import { pushState } from 'redux-router';
import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './action-types.js';
import { SET_METADATA } from '../';

function authenticate(provider) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const users = firebase.child('users');

    firebase.authWithOAuthPopup(provider, (error, authData) => {
      if (error) {
        console.error('ERROR @ authWithOAuthPopup :', error); // eslint-disable-line no-console
      }
      else {
        var greet = '';
        users.orderByKey().equalTo(authData.uid).once('value', snap => {
          if(!snap.val()) greet = createUserIfNotExists(authData, firebase);

           dispatch({
            type: SET_METADATA,
            metadata : {greet}
          });
        });

        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: authData,
          meta: {
            timestamp: Date.now()
          }
        });

      }
    });
  };
}

export function initAuth() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    dispatch({
      type: INIT_AUTH,
      payload: firebase.getAuth(),
      meta: {
        timestamp: Date.now()
      }
    });
  };
}

export function createUser(email, password){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const users = firebase.child('users');

    firebase.createUser({
      email,
      password
    }, function(error, userData) {
      if (error) {
        console.log('Error creating user:', error);
      } else {
        console.log('Successfully created user account with uid:', userData.uid);
        users.orderByKey().equalTo(userData.uid).once('value', snap => {
          if(!snap.val()){
            userData.email = email;
            createUserIfNotExists(userData, firebase);
            dispatch(authWithUserPass(email, password));
          }
        });
      }
    });
  };
}

export function authWithUserPass(email, password){
  return (dispatch, getState) => {
    const { firebase } = getState();

    firebase.authWithPassword({
      email,
      password
    }, function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        dispatch(pushState(null, '/'));
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: authData,
          meta: {
            timestamp: Date.now()
          },
          greet: 'Hello'
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

export function signInWithGoogle(){
  return authenticate('google');
}

export function signOut() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.unauth();
    dispatch(pushState(null, '/'));
    dispatch({
      type: SIGN_OUT_SUCCESS
    });
  };
}


export function cancelSignIn() {
  return dispatch => {
    return dispatch(pushState(null, '/'));
  };
}

export function createUserIfNotExists(authData, firebase){
  let name = '';
  let img = '';
  if(authData.provider === 'github')  {
    name = authData.github.username;
    img = authData[authData.provider].cachedUserProfile.avatar_url;
  }
  else if(authData.provider === 'twitter') name = authData.twitter.username;
  else if(authData.provider === 'google'){
    name = authData[authData.provider].displayName;
    img = authData.google.profileImageURL;
  }else if(authData.email) name = authData.email;
  firebase.child(`users/${authData.uid}`).update({name, img, visibility: true, personalData: {town: '', birthday: '', gender: ''}});
  return 'Welcome to ListUs';
}
