import { ADD_DATE } from '../actions';

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

function addDate(state){
  
	/* Get year */

	let actualYear = returnActualDates(state, year);

	/* Get month */

	let actualMonth = returnActualDates(actualYear, month);

	/* Get day */

	let actualDay = returnActualDates(actualMonth, day);

	if(Object.keys(actualDay).length === 0){
	  actualMonth[day] = [taskObject];
	}else{
	  console.log(actualDay);
	  actualDay[actualDay.length] = taskObject;
	}


  return state;
}

export default function reducerCalendar( state = {}, action ){
  switch (action.type) {
    case ADD_DATE:
      return addDate(state);
    default:
      return state;
  }
}
