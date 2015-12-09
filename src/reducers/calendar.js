import { ADD_LIST, REMOVE_LIST } from '../actions';

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


function addDate(state, title, date, importance, id){

  console.log(date);

  let day = date.split('/')[0];

  if(day[0] === '0'){
    day = day[1];
  }


  const month = date.split('/')[1];
  const monthName = months[month];
	const year = date.split('/')[2];

  const taskObject = {
    title,
    importance,
    id
  };

	/* Get year */
	let actualYear = returnActualDates(state, year);

	/* Get month */

	let actualMonth = returnActualDates(actualYear, monthName);

	/* Get day */

	let actualDay = returnActualDates(actualMonth, day);


  if(Object.keys(actualDay).length === 0){
	  actualMonth[day] = [taskObject];
	}else{
	  actualDay[actualDay.length] = taskObject;
	}

  return state;
}


function removeDate(state, title, date) {
  let day = date.split('/')[0];
  if(day[0] === '0'){
    day = day[1];
  }
  const month = date.split('/')[1];
  const monthName = months[month];
  const year = date.split('/')[2];

  const objectToDelete = state[year][monthName];

  let newState = state;

  if(objectToDelete[day].length > 1){
    newState[year][monthName][day] = newState[year][monthName][day].filter ( (list) => list.title !== title);
  }else{
    delete newState[year][monthName][day];
  }

  return newState;
}



export default function reducerCalendar( state = {}, action ){
  switch (action.type) {
    case ADD_LIST:
      return addDate(state, action.title, action.date, action.importance, action.id);
    case REMOVE_LIST:
      return removeDate(state, action.title, action.date);
    default:
      return state;
  }
}
