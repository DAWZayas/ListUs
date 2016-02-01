import { pushState } from 'redux-router';
import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './action-types.js';

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
        });

        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: authData,
          meta: {
            timestamp: Date.now()
          },
          greet: greet
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
    firebase.createUser({
      email,
      password
    }, function(error, userData) {
      if (error) {
        console.log('Error creating user:', error);
      } else {
        console.log('Successfully created user account with uid:', userData.uid);
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

  if(authData.provider === 'github')  name = authData.github.username;
  else if(authData.provider === 'twitter') name = authData.twitter.username;

  firebase.child(`users/${authData.uid}`).update({name, img: '', visibility: false});
  return 'Welcome to ListUs';
}
