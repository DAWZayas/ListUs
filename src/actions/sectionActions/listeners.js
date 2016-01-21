import { SET_LISTS } from '../lists/action-types';
import { SET_TASKS } from './action-types';
import { SET_GROUPS } from './action-types';
import { SET_FRIENDS } from '../friends/action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const refTasks = firebase.child('tasks');
    const refLists = firebase.child('lists');
    const refFriends = firebase.child('friends');


    let tasksUser = [];
    firebase.child(`users/${auth.id}/tasks`).once('value', snapshot =>{

      tasksUser = snapshot.val()===null ? tasksUser : snapshot.val();

      refTasks.on('value', snapshot => { dispatch({
        type: SET_TASKS,
        tasks: Object.keys(snapshot.val() || {}).reduce( (init, id) => tasksUser.indexOf([id])!==-1 ?
          Object.assign({}, init, {[id]:{
            id,
            idList: snapshot.val()[id].idList,
            title: snapshot.val()[id].title,
            done: snapshot.val()[id].done
          }}) : init, {})
        });
      });
    });

    let listsUser = [];
    firebase.child(`users/${auth.id}/lists`).once('value', snapshot =>{

      listsUser = snapshot.val()===null ? listsUser : snapshot.val();

      refLists.on('value', snapshot => {dispatch({
        type: SET_LISTS,
        lists: Object.keys(snapshot.val() || [])
          .reduce( (init, id) => listsUser.indexOf(id)!==-1 ?
            init.concat({id,
              title:snapshot.val()[id].title,
              importance:snapshot.val()[id].importance,
              date:snapshot.val()[id].date,
              participants: snapshot.val()[id].participants===undefined ? [] : [snapshot.val()[id].participants]}) : init, [])
        });
      });
    });



  refFriends.on('value', snapshot => {dispatch({
    type: SET_FRIENDS,
    friends: Object.keys(snapshot.val() || []).reduce( (init, id) => init.concat({id, groups:snapshot.val()[id].groups, img:snapshot.val()[id].img, name:snapshot.val()[id].name}), [])
  });
  });


  let groupsUser = [];
  firebase.child(`users/${auth.id}/groups`).once('value', snapshot =>{

    groupsUser = snapshot.val()===null ? groupsUser : snapshot.val();

    firebase.child('groups').on('value', snapshot => {dispatch({
          type: SET_GROUPS,
          groups: Object.keys(snapshot.val() || []).reduce( (init, id) => groupsUser.indexOf(id)!==-1 ?
           init.concat({id,
              name:snapshot.val()[id].name,
              showFriends:snapshot.val()[id].showFriends,
              administrator:snapshot.val()[id].administrator,
              friends: (snapshot.val()[id].friends) ? snapshot.val()[id].friends.split(',') :[]}) : init, [])
        });
    });

});


}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const refTasks = firebase.child('tasks');
    const refLists = firebase.child('lists');
    const refFriends = firebase.child('friends');
    const refGroups = firebase.child('groups');

    refTasks.off();
    dispatch({
      type: SET_TASKS,
      tasks: {}
    });

    refLists.off();
    dispatch({
      type: SET_LISTS,
      lists: []
    });

    refFriends.off();
    dispatch({
      type: SET_FRIENDS,
      friends: []
    });

    refGroups.off();
    dispatch({
      type: SET_GROUPS,
      groups: []
    });
  };

}
