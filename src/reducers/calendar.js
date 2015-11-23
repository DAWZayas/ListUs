import { ADD_LIST } from '../actions';

const months = [ "", "Enero", "Febrero",
"Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
"Septiembre", "Octubre", "Noviembre", "Diciembre" ];

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

function addDate(state, title, date, importance){
  
  const day = date.split("/")[0];
  const month = date.split("/")[1];
  const monthName = months[month];
	const year = date.split("/")[2];

  const taskObject = {
    title,
    importance 
  }

	/* Get year */
	let actualYear = returnActualDates(state, year);

	/* Get month */

	let actualMonth = returnActualDates(actualYear, monthName);

	/* Get day */

	let actualDay = returnActualDates(actualMonth, day);
  debugger;
	if(Object.keys(actualDay).length === 0){
	  actualMonth[day] = [taskObject];
	}else{
	  console.log(actualDay);
	  actualDay[actualDay.length] = taskObject;
	}

  debugger;


  return state;
}

export default function reducerCalendar( state = {}, action ){
  switch (action.type) {
    case ADD_LIST:
      return addDate(state, action.title, action.date, action.importance);
    default:
      return state;
  }
}
