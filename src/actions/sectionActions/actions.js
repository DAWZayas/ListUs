import { SET_LIST, ADD_LIST_ERROR, REMOVE_LIST_ERROR, EDIT_LIST_ERROR } from './action-types';
import sequencer from '../sequencer';

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
          // get day
          const dayNumber = convertDay(date);

          //get month
          const monthNumber = convertMonth(date);
          const monthName = months[monthNumber];

          const calendar = firebase.child(`calendar/${date.split('/')[2]}/${monthName}/${dayNumber}`);

          calendar.push(`${[idList]}`);
        }
    });



  };
}


/*
* la lista nunca se podra borrar bien del calendario hasta que no consigamos cambiar la estructura de datos
*/
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
      // get day
      const dayNumber = convertDay(date);

      //get month
      const monthNumber = convertMonth(date);
      const monthName = months[monthNumber];

        firebase.child(`calendar/${date.split('/')[2]}/${monthName}/${dayNumber}/${idList}`).remove(error => {
          if(error){
            console.error('ERROR @ removeListCalendar:', error);
            dispatch({
              type: REMOVE_LIST_ERROR,
              payload: error
            });
          }
        });
      };
    });
  };
}


export function editList(idList, title, date, newDate, importance){

  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`lists/${idList}`).set({ title, date:newDate, importance }, error => {
      if(error){
        console.error('ERROR @ editList:', error);
        dispatch({
          type: EDIT_LIST_ERROR,
          payload, error
        });
      }else{
        sequencer([
              () => dispatch(removeList(idList, title, date)),
              () => dispatch(addList(title, newDate, importance))
            ]);
      }
    });
  };
}




/*function returnActualDates(objectToIterate, dateToCheck){

  let actualDate = {};

  for (var key in objectToIterate){
    if(key === dateToCheck){
      actualDate = objectToIterate[key];
    }
  }

  if(Object.keys(actualDate).length === 0){
    actualDate = objectToIterate;
    actualDate[dateToCheck] = {};
    actualDate = actualDate[dateToCheck];
  }

  return actualDate;

}*/
