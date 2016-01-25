import { SET_USER } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    debugger;
  };
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    
  };
}
