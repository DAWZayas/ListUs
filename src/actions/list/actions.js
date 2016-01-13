import { SET_LISTS } from './action-types';


export function setList(list){
  return { type: SET_LIST, list};
}
export function onAddList(title, date, importance, id){
  return (dispatch, getState) => {
    const { firebase } = getState();
    debugger;
    firebase.child('lists').push({title}, error => {
      if(error){
        console.error('ERROR @ addPoll :', error); // eslint-disable-line no-console
          dispatch({
             type: ADD_LIST_ERROR,
             payload: error
      });
      }
    })
  };
}
