//import {  SET_TASK, ADD_TASK, REMOVE_TASK, EDIT_TASK, ADD_FRIEND_OR_GROUP_TO_TASK } from '../actions';
//import { getId } from '../utils';
import { SET_TASKS } from '../actions/tasks';

function setTask(state, tasks){
  debugger;
    return Object.assign({}, tasks);
}
/*

function addTask(state, idList, title){
  const id = getId();
  const task = {
    [id]:{
      id,
      idList,
      title,
      participants: [],
      done: false
    }
  };
  return Object.assign({}, state, task);
}

function removeTask(state, idTask){
  //return Object.values(state).reduce( (tasks, task) => task.id === idTask ? tasks : Object.assign( tasks, { [task.id]: task }),{});

  let newState = Object.assign({}, state);
  delete newState[idTask];
  return newState;
}

function editTask(state, idTask, title){
  let newTask = Object.assign({}, state[idTask], {title} );
  return Object.assign( {}, state, { [idTask]: newTask });
  //return Object.values(state).reduce( (tasks, task)  => task.id === idTask ? Object.assign(tasks, { [task.id]: {id:task.id,idList:task.idList,title} }, { }) : Object.assign( tasks, { [task.id]: task }) , {});
}

function addFriendGroupToTask(state, idTask, id){
  let newTask = Object.values(state).filter( task => task.id===idTask )[0];
  newTask = Object.assign({}, { [newTask.id]:newTask }, { [newTask.id]: {id: newTask.id, idList: newTask.idList, title: newTask.title, participants: newTask.participants.concat(id)} } );
  return Object.assign({}, state, newTask);
  //return Object.values(state).reduce( (tasks, task) => task.id===idTask ? Object.assign(tasks, {[task.id]:{id: task.id, idList: task.idList, title: task.title, participants: task.participants.concat(id)}}) : Object.assign( tasks, { [task.id]: task} ) ,{});
}
*/
export default function taskReducer( state = {}, action){
  switch (action.type) {
    case SET_TASKS:
      return setTask(state, action.tasks);
    /*case ADD_TASK:
      return addTask(state, action.idList, action.title);
    case REMOVE_TASK:
      return removeTask(state, action.idTask);
    case EDIT_TASK:
      return editTask(state, action.idTask, action.title);
    case ADD_FRIEND_OR_GROUP_TO_TASK:
      return addFriendGroupToTask(state, action.idTask, action.id);*/
    default:
      return state;
  }
}
