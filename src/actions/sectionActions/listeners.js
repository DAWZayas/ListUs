import { SET_LISTS } from '../listsDetailsActions/action-types';
import { SET_TASKS } from './action-types';
import { SET_GROUPS, ADD_LIST_CORRECT } from './action-types';
import { SET_FRIENDS } from '../friends/action-types';


export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const refTasks = firebase.child('tasks');
    const refLists = firebase.child('lists');
    const refFriends = firebase.child('friends');


    let tasksUser = [];
    firebase.child(`users/${auth.id}/tasks`).on('value', snapshot =>{

      tasksUser = snapshot.val()===null ? tasksUser : snapshot.val();

      refTasks.once('value', snapshot => { dispatch({
        type: SET_TASKS,
        tasks: Object.keys(snapshot.val() || {}).reduce( (init, id) => tasksUser.indexOf(id)!==-1 ?
          Object.assign({}, init, {[id]:{
            id,
            idList: snapshot.val()[id].idList,
            title: snapshot.val()[id].title,
            done: snapshot.val()[id].done
          }}) : init, {})
        });
      });
    });

    firebase.child(`users/${auth.id}/lists`).on('child_added', snapshot =>{
      dispatch({
        type: ADD_LIST_CORRECT,
        payload: snapshot.val()
      });

    });




    let listsUser = [];
    firebase.child(`users/${auth.id}/lists`).on('value', snapshot =>{

      listsUser = snapshot.val()===null ? listsUser : snapshot.val();

      refLists.on('value', snapshot => {dispatch({
        type: SET_LISTS,
        lists: Object.keys(snapshot.val() || [])
          .reduce( (init, id) => listsUser.indexOf(id)!==-1 ?
            init.concat({id,
              admin: snapshot.val()[id].admin,
              title:snapshot.val()[id].title,
              importance:snapshot.val()[id].importance,
              date:snapshot.val()[id].date,
              participants: snapshot.val()[id].participants===undefined ? [] : [snapshot.val()[id].participants]}) : init, [])
        });
      });
    });


    let friends;

    firebase.child(`users/${auth.id}/friends`).on('value', snapshot => {
      friends = snapshot.val() === null ? [] : snapshot.val();
      firebase.child('users').once('value', snapshot => {dispatch({
        type: SET_FRIENDS,
        friends: Object.values(snapshot.val() || []).reduce( (init, user) => friends.indexOf(user.name) !== -1 ? init.concat({user, groups:user.groups, img:user.img, name:user.name, lists:user.lists}) : init, [])
      });
    });
  });


  let groupsUser = [];
  firebase.child(`users/${auth.id}/groups`).on('value', snapshot =>{

    groupsUser = snapshot.val()===null ? groupsUser : snapshot.val();

    firebase.child('groups').once('value', snapshot => {dispatch({
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

};
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const refTasks = firebase.child(`users/${auth.id}/tasks`);
    const refLists = firebase.child(`users/${auth.id}/lists`);
    const refFriends = firebase.child(`users/${auth.id}/friends`);
    const refGroups = firebase.child(`users/${auth.id}/groups`);

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
