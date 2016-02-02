import { SET_LISTS } from '../listsDetailsActions/action-types';
import { SET_TASKS } from './action-types';
import { SET_GROUPS } from './action-types';
import { SET_FRIENDS } from '../friends/action-types';
import { SET_NOTIFICATIONS } from '../notifications/action-types';
import { SET_USER } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const refTasks = firebase.child('tasks');
    const refLists = firebase.child('lists');


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
              participantsFriends: snapshot.val()[id].participantsFriends===undefined ? [] : [snapshot.val()[id].participantsFriends],
              participantsGroups: snapshot.val()[id].participantsGroups===undefined ? [] : [snapshot.val()[id].participantsGroups]}) : init, [])

        });
      });
    });


    let friends;

    firebase.child(`users/${auth.id}/friends`).on('value', snapshot => {
      friends = snapshot.val() === null ? [] : snapshot.val();
      firebase.child('users').once('value', snapshot => {dispatch({
        type: SET_FRIENDS,
        friends: Object.values(snapshot.val() || []).reduce( (init, user) => friends.indexOf(user.name) !== -1 ? init.concat({ groups:user.groups, img:user.img, name:user.name, lists:user.lists}) : init, [])
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
              friends: (snapshot.val()[id].friends) ? snapshot.val()[id].friends :[]}) : init, [])
            });
          });
      });
    firebase.child(`users/${auth.id}/pendingActions`).on('value', snapshot => {
      dispatch({
        type: SET_NOTIFICATIONS,
        pendingActions: snapshot.val()!==null ? Object.values(snapshot.val()) : []
      });
    });

    firebase.child(`users/${auth.id}`).on('value', snapshot => {dispatch({
      type: SET_USER,
      user: {name: snapshot.val()['name'],
        lists: snapshot.val().lists || [],
        img: snapshot.val()['img'],
        visibility: snapshot.val()['visibility']
      }
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
    const refNotifications = firebase.child(`users/${auth.id}/pendingActions`);

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

    refNotifications.off();
    dispatch({
      type: SET_NOTIFICATIONS,
      pendingActions: []
    });

    firebase.child(`users/${auth.id}`).off();
    dispatch({
      type: SET_USER,
      user: {}
    });

  };

}
