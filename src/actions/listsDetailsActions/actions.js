import { SET_LIST, ADD_LIST_ERROR, REMOVE_LIST_ERROR, EDIT_LIST_ERROR } from './action-types';

const convertDay = date => date.split('/')[0][0]==='0' ? date.split('/')[0][1] : date.split('/')[0];
const convertMonth = date => date.split('/')[1][0]==='0' ? date.split('/')[1][1] : date.split('/')[1];

const months = [ '', 'Enero', 'Febrero',
'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];


export function setList(lists){
  return { type: SET_LIST, lists};
}

export function addList(title, date, importance){
  return (dispatch, getState) => {
    const { firebase } = getState();
    let fireReference = firebase.child('lists').push({title, date, importance, participants:[]}, error => {
        if(error){
          console.error('ERROR @ addList:', error);
          dispatch({
            type: ADD_LIST_ERROR,
            payload: error
          });
        }else{
          const idList = fireReference.key();
          addToCalendarNewDate(idList, date);
        }
    });



  };
}

function addToCalendarNewDate(firebase, idList, date){
  // get day
  const dayNumber = convertDay(date);

  //get month
  const monthNumber = convertMonth(date);
  const monthName = months[monthNumber];


  const refDate = firebase.child(`calendar/${date.split('/')[2]}/${monthName}/${dayNumber}`);
  const refMonth = firebase.child(`calendar/${date.split('/')[2]}/${monthName}`);
  let listsInDay = [];
  refDate.once('value', snapshot => {
    listsInDay = snapshot.val()===null ? [idList] : snapshot.val().concat([idList]);
    refMonth.update({[dayNumber]:listsInDay});
  });
}

export function removeList(idList, title, date){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`lists/${idList}`).remove(error => {
      if(error){
        console.error('ERROR @ removeList:', error);
        dispatch({
          type: REMOVE_LIST_ERROR,
          payload: error
        });
      }else{
        removeDateFromCalendar(idList, date);
      }
    });
  };
}

function removeDateFromCalendar(firebase, idList, date){
  // get day
  const dayNumber = convertDay(date);

  //get month
  const monthNumber = convertMonth(date);
  const monthName = months[monthNumber];

  const refDate = firebase.child(`calendar/${date.split('/')[2]}/${monthName}/${dayNumber}`);
  const refMonth = firebase.child(`calendar/${date.split('/')[2]}/${monthName}`);
  let listsInDay = [];
  refDate.once('value', snapshot => {
    listsInDay = snapshot.val()===null ? [] : snapshot.val().filter( iterableIdList => iterableIdList!==idList );
    refMonth.update({[dayNumber]:listsInDay});
  });
}

export function editList(idList, title, date, newDate, importance){

  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`lists/${idList}`).update({ title, date:newDate, importance }, error => {
      if(error){
        console.error('ERROR @ editList:', error);
        dispatch({
          type: EDIT_LIST_ERROR,
          payload, error
        });
      }else{

        addToCalendarNewDate(firebase, idList, newDate);
        removeDateFromCalendar(firebase, idList, date);
      }
    });
  };
}


export function addFriendGroupToList( idList, newParticipant){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const refParticipants = firebase.child(`lists/${idList}/participants`);
    const refIdList = firebase.child(`lists/${idList}`);
    let participants = [];
    refParticipants.once('value', snapshot => {
      participants = snapshot.val()===null ? [newParticipant.id] : snapshot.val().concat([newParticipant.id]);
      refIdList.update({participants});
    });

  };
}

export function removeFriendGroupToList( idList, idPaticipant){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const refParticipants = firebase.child(`lists/${idList}/participants`);
    const refIdList = firebase.child(`lists/${idList}`);
    let participants = [];
    refParticipants.once('value', snapshot => {
      participants = snapshot.val()===null ? [] : snapshot.val().filter( iterableIdList => iterableIdList!==idPaticipant );
      refIdList.update({participants});
    });

  };
}


export function addTask( idList, title){
  return (dispatch, getState) => {
    const { firebase } = getState();
    let ref = firebase.child('tasks').push({idList, title, done:false}, error => {
        if(error){
          console.error('ERROR @ addList:', error);
          dispatch({
            type: ADD_LIST_ERROR,
            payload: error
          });
        }else{
          const idTask = ref.key();
          firebase.child(`tasks/${idTask}`).update({id: idTask, idList, title, done:false});
        }
    });
  };
}

export function removeTask( idTask ){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`tasks/${idTask}`).remove();
  };
}

export function editTask( idTask, title){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child('tasks').once('value', snapshot => {
      const editedTask = Object.assign({}, snapshot.val().idTask, {title});
      firebase.child(`tasks/${idTask}`).update(editedTask);
    });
  };
}

export function addFriendGroupToTask( idTask, id){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const refParticipants = firebase.child(`tasks/${idTask}/participants`);
    const refIdList = firebase.child(`tasks/${idTask}`);
    let participants = [];
    refParticipants.once('value', snapshot => {
      participants = snapshot.val()===null ? [id] : snapshot.val().concat([id]);
      refIdList.update({participants});
    });

  };
}


export function markAsDone(id){
  return (dispatch, getState) => {
    const {firebase} = getState();
    const taskRef = firebase.child(`tasks/${id}`);
    taskRef.once('value', snapshot => {
      const isDone = !snapshot.val().done;
      taskRef.update({done:isDone});
    });
  };
};