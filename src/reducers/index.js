
import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import tasks from './tasks';
import lists from './lists';
import comments from './comments';
import friends from './friends';
import groups from './groups';
import user from './user';
import allUsers from './allUsers';

export default combineReducers({
  lists,
  tasks,
  comments,
  friends,
  groups,
  user,
  allUsers,
  router
});
