import { SET_LIST, ADD_LIST_ERROR, REMOVE_LIST_ERROR } from './action-types';

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
          let day = date.split('/')[0];

          if(day[0] === '0'){
            day = day[1];
          }
          //get month
          let month = date.split('/')[1];

          if (month[0] === '0') {
            month = month[1];
          }

          const monthName = months[month];
          const calendar = firebase.child(`calendar/${date.split('/')[2]}/${monthName}/${day}`);

          calendar.push(`${[idList]}`);
        }
    });



  };
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
      }
    });
  };
}


export function editList(idList, title, date, newDate, importance){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`lists/${idList}`).set({ title, date:newDate, importance });
  };
}

const months = [ '', 'Enero', 'Febrero',
'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];

function returnActualDates(objectToIterate, dateToCheck){

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

}
