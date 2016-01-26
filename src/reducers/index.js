
import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import tasks from './tasks';
import lists from './lists';
import comments from './comments';
import friends from './friends';
import groups from './groups';
import user from './user';
import dataBase from './dataBase';
import calendar from './calendar';
import firebase from './firebase';
import auth from './auth';
import notifications from './notifications';



export default combineReducers({
  auth,
  lists,
  tasks,
  comments,
  friends,
  groups,
  user,
  dataBase,
  calendar,
  router,
  notifications,
  firebase
});
