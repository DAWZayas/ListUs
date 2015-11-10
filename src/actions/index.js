//import { pushState } from 'redux-router';

/*
 * action types
 */
export const SET_LISTS = 'SET_LISTS';
export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';

/****************************/

export const SET_TASKS = 'SET_TASKS';

/*
 * Poll action creators
 */

export function setLists(lists) {
  return {
     type: SET_LISTS, lists	
  };
}

export function addList(title, date){
  return {
    type: ADD_LIST, title, date
  };
}

export function removeList(id){
	return {
		type: REMOVE_LIST, id
	};
}


export function setTasks(tasks){
	return {
		type: SET_TASKS, tasks
	};
}


