import { SET_CALENDAR, SET_LISTS } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const ref = firebase.root();

    ref.on('value', snapshot =>{

      let calendarUser = snapshot.val().calendar[auth.id] === undefined ? [] : [snapshot.val().calendar[auth.id]];

      new Promise( resolve => {
        resolve(snapshot.val().users[auth.id].accounts !== undefined ? snapshot.val().users[auth.id].accounts.map( idUser => {
          firebase.child(`calendar/${idUser}`).on('value', snapshotCalendar => {
            calendarUser = calendarUser.concat(snapshotCalendar.val());
          });
        }) : '');
      }).then( () => {
        firebase.child(`calendar`).once('value', () => { dispatch({
          type: SET_CALENDAR,
          calendar: calendarUser
          });
        });
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
      calendar: []
    });
  };
}
