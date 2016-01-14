/*import { registerListeners  as registerListenersLists } from '../lists/listeners';
import { onregisterListeners  as onregisterListenersLists } from '../lists/listeners';
import { registerListeners  as registerListenersTasks } from '../tasks/listeners';
import { onregisterListeners  as onregisterListenersTasks } from '../tasks/listeners';
import sequencer from '../sequencer';*/
import { SET_LISTS } from '../lists/action-types';
import { SET_TASKS } from '../tasks/action-types';


export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const refTasks = firebase.child('tasks');
    const refLists = firebase.child('lists');

    refTasks.on('value', snapshot => { dispatch({
      type: SET_TASKS,
      tasks: Object.keys(snapshot.val() || {}).reduce( (init, id) =>
        Object.assign({}, init, {[id]:{
          id,
          idList: snapshot.val()[id].idList,
          title: snapshot.val()[id].title,
          participants: snapshot.val()[id].participants===undefined ? [] : snapshot.val()[id].participants,
          done: false
        }}), {})
      });
    });

  refLists.on('value', snapshot => {dispatch({
    type: SET_LISTS,
    lists: Object.keys(snapshot.val() || [])
      .reduce( (init, id) =>
        init.concat({id, title:snapshot.val()[id].title, importance:snapshot.val()[id].importance, date:snapshot.val()[id].date, participants:snapshot.val()[id].participants}), [])
    });
  });
};
}
export function unregisterListeners(){

}
