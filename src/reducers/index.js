
import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import tasks from './task';
import lists from './list';
import comments from './comment';
import friends from './friend';
import groups from './groups';
import user from './user';

export default combineReducers({
  lists,
  tasks,
  comments,
  friends,
  groups,
  user,
  router
});
