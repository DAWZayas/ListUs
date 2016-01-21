import { SET_CALENDAR, SET_LISTS } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const ref = firebase.child(`calendar/${auth.id}`);

    ref.on('value', snapshot => {dispatch({
      type: SET_CALENDAR,
      calendar: snapshot.val()
    });
  });

    const refLists = firebase.child('lists');

    refLists.on('value', snapshot => {dispatch({
      type: SET_LISTS,
      lists: Object.keys(snapshot.val() || [])
        .reduce( (init, id) =>
          init.concat({id,
            title:snapshot.val()[id].title,
            importance:snapshot.val()[id].importance,
            date:snapshot.val()[id].date,
            participants: snapshot.val()[id].participants===undefined ? [] : [snapshot.val()[id].participants]}), [])
      });
    });
  };
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const ref = firebase.child(`caledar/${auth.id}`);
    ref.off();
    dispatch({
      type: SET_CALENDAR,
      friends: []
    });
  };
}
