import { SET_LIST, ADD_LIST_ERROR, REMOVE_LIST_ERROR, EDIT_LIST_ERROR } from './action-types';

const convertDay = date => date.split('/')[0][0]==='0' ? date.split('/')[0][1] : date.split('/')[0];
const convertMonth = date => date.split('/')[1][0]==='0' ? date.split('/')[1][1] : date.split('/')[1];

const months = [ '', 'Enero', 'Febrero',
'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];


export function setList(lists){
  return { type: SET_LIST, lists};
}


export function addList(title, date, importance){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();


    firebase.child(`users/${auth.id}`).once('value', snapshot => {

      let fireReference = firebase.child('lists').push({title, date, importance, admin: snapshot.val().name, participants:[]}, error => {
          if(error){
            console.error('ERROR @ addList:', error);
            dispatch({
              type: ADD_LIST_ERROR,
              payload: error
            });
          }else{
            //ACTION ADD TO ALL LISTS
            const idList = fireReference.key();
            // get day
            const dayNumber = convertDay(date);

            //get month
            const monthNumber = convertMonth(date);
            const monthName = months[monthNumber];


            const refDate = firebase.child(`calendar/${auth.id}/${date.split('/')[2]}/${monthName}/${dayNumber}`);
            const refMonth = firebase.child(`calendar/${auth.id}/${date.split('/')[2]}/${monthName}`);
            let listsInDay = [];
            refDate.once('value', snapshot => {
              listsInDay = snapshot.val()===null ? [idList] : snapshot.val().concat([idList]);
              refMonth.update({[dayNumber]:listsInDay});
            });
            //ACTION ADD TO USER LISTS

            const refListsUser = firebase.child(`users/${auth.id}/lists`);
            const refUser = firebase.child(`users/${auth.id}`);
            let lists = [];
            refListsUser.once('value', snapshot => {
              lists = snapshot.val()===null ? [idList] : snapshot.val().concat([idList]);
              refUser.update({lists});
            });

          }
      });

    });

  };
}

/*function addToCalendarNewDate(firebase, idList, date){
  // get day
  const dayNumber = convertDay(date);

  //get month
  const monthNumber = convertMonth(date);
  const monthName = months[monthNumber];


  const refDate = firebase.child(`calendar/${date.split('/')[2]}/${monthName}/${dayNumber}`);
  const refMonth = firebase.child(`calendar/${date.split('/')[2]}/${monthName}`);
  let listsInDay = [];
  refDate.once('value', snapshot => {
    listsInDay = snapshot.val()===null ? [idList] : snapshot.val().concat([idList]);
    refMonth.update({[dayNumber]:listsInDay});
  });
}*/

export function removeList(list){
  return (dispatch, getState) => {

    const { firebase, auth } = getState();
    let lists = [];
    //ACTION REMOVE LIST IN ALL participants
    if(list.participants[0]!==undefined){
      firebase.child(`lists/${list.id}/participants`).once('value', snapshot => {
        if(snapshot.val()!==null){
          snapshot.val().map( nameUser => firebase.child(`users`).once('value', function(snapshotUsers){
            const user = Object.values(snapshotUsers.val()).filter( user => user.name===nameUser )[0];
            const userId = Object.keys(snapshotUsers.val()).filter( id => snapshotUsers.val()[id].name===user.name)[0];
            if(user.lists!==undefined){
              lists = user.lists.filter( listId => list.id!==listId );
            }
            firebase.child(`users/${userId}`).update({lists});
          }));
        }
      });
    }

    //REMOVE ACTIONSPENGIG WITH IDLIST IN ALL THE USERS
    firebase.child(`users`).once('value', snapshotUsers => {
      let pendingActions;
      const users = Object.values(snapshotUsers.val());
      users.map( function(userIterate){
        if(userIterate.pendingActions!==undefined){
          pendingActions = userIterate.pendingActions.filter( action => action.idList!==list.id );
          let userId = Object.keys(snapshotUsers.val()).filter( userId => snapshotUsers.val()[userId].name===userIterate.name );
          firebase.child(`users/${userId}`).update({pendingActions});
        }
      });
    });


    firebase.child(`lists/${list.id}`).remove(error => {
      if(error){
        console.error('ERROR @ removeList:', error);
        dispatch({
          type: REMOVE_LIST_ERROR,
          payload: error
        });
      }else{
      // get day
      const date = list.date;
      const dayNumber = convertDay(date);

      //get month
      const monthNumber = convertMonth(date);
      const monthName = months[monthNumber];

      const refDate = firebase.child(`calendar/${auth.id}/${date.split('/')[2]}/${monthName}/${dayNumber}`);
      const refMonth = firebase.child(`calendar/${auth.id}/${date.split('/')[2]}/${monthName}`);
      let listsInDay = [];
      refDate.once('value', snapshot => {
        listsInDay = snapshot.val()===null ? [] : snapshot.val().filter( iterableIdList => iterableIdList!==list.id );
        refMonth.update({[dayNumber]:listsInDay});
      });

      //ACTION REMOVE TO USER LISTS

      const refListsUser = firebase.child(`users/${auth.id}/lists`);
      const refUser = firebase.child(`users/${auth.id}`);
      lists = [];
      refListsUser.once('value', snapshot => {
        lists = snapshot.val()===null ? [] : snapshot.val().filter(id => id!==list.id);
        refUser.update({lists});
      });



      };
    });
  };
}


/*function removeDateFromCalendar(firebase, idList, date){
  // get day
  const dayNumber = convertDay(date);

  //get month
  const monthNumber = convertMonth(date);
  const monthName = months[monthNumber];

  const refDate = firebase.child(`calendar/${date.split('/')[2]}/${monthName}/${dayNumber}`);
  const refMonth = firebase.child(`calendar/${date.split('/')[2]}/${monthName}`);
  let listsInDay = [];
  refDate.once('value', snapshot => {
    listsInDay = snapshot.val()===null ? [] : snapshot.val().filter( iterableIdList => iterableIdList!==idList );
    refMonth.update({[dayNumber]:listsInDay});
  });
}*/

export function editList(idList, title, date, newDate, importance){

  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`lists/${idList}`).set({ title, date:newDate, importance }, error => {
      if(error){
        console.error('ERROR @ editList:', error);
        dispatch({
          type: EDIT_LIST_ERROR,
          payload, error
        });
      }else{
        addList(title, newDate, importance);
        removeList(idList, title, date);

      }
    });
  };
}


export function addFriendGroupToList( list, newParticipant){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();


    //ENVIARLA AL USER
    firebase.child('users').once('value', userSnapshot => {
      //CREAR LA ACCION PENDING
      const nameUserCreateAction = userSnapshot.val()[auth.id].name;
      const descr = nameUserCreateAction + ' want to add you a this list: ' + list.title;
      const newActionPending = {
        type: ADD_FRIEND_TO_LIST,
        idList: list.id,
        descr
      };

      let pendingActions = Object.values(userSnapshot.val()).reduce( (init, user) => user.name===newParticipant.name ? user.pendingActions : init, [] );
      pendingActions = pendingActions===undefined ? [newActionPending] : pendingActions.concat(newActionPending);
      const idUser = Object.keys(userSnapshot.val()).filter( idUser => userSnapshot.val()[idUser].name===newParticipant.name);
      firebase.child(`users/${idUser}`).update({pendingActions});
    });
  };
}

export function removeFriendGroupToList( idList, newParticipant){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const refParticipants = firebase.child(`users/${auth.id}/lists/${idList}/participants`);
    const refIdList = firebase.child(`lists/${idList}`);
    let participants = [];

    refParticipants.once('value', snapshot => {
      participants = snapshot.val()===null ? [] : snapshot.val().filter( iterableIdList => iterableIdList!==newParticipant.name );
      refIdList.update({participants});
    });
//para diferenciar grupo de amigo newParticipant.administrador===undefined
    if(newParticipant.administrador===undefined){
      //borrar de la lista al amigo
      firebase.child('users').once('value', snapshot => {
        const lists = newParticipant.lists.filter( id => id!==idList);
        const idUser = Object.keys(snapshot.val()).filter( idUser => snapshot.val()[idUser].name===newParticipant.name);
        firebase.child(`users/${idUser}`).update({lists});
      });
    }else{
      //borrar la lista del grupo

    }

  };
}

export function addTask( idList, title){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    let ref = firebase.child('tasks').push({idList, title, done:false}, error => {
        if(error){
          console.error('ERROR @ addList:', error);
          dispatch({
            type: ADD_LIST_ERROR,
            payload: error
          });
        }else{
          const idTask = ref.key();
          firebase.child(`tasks/${idTask}`).update({id: idTask, idList, title, done:false});

          //ACTION ADD TO USER LISTS
          let tasks = [];

          firebase.child(`users/${auth.id}/tasks`).once('value', snapshot => {
            tasks = snapshot.val()===null ? [idTask] : snapshot.val().concat([idTask]);
            firebase.child(`users/${auth.id}`).update({tasks});
          });
        }
    });
  };
}

export function removeTask( idTask ){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`tasks/${idTask}`).remove();

    //ACTION ADD TO USER LISTS

    const refTasksUser = firebase.child(`users/${auth.id}/tasks`);
    const refUser = firebase.child(`users/${auth.id}`);
    let tasks = [];
    refTasksUser.once('value', snapshot => {
      tasks = snapshot.val()===null ? [] : snapshot.val().filter(id => id!==idTask);
      refUser.update({tasks});
    });
  };
}

export function editTask( idTask, title){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child('tasks').once('value', snapshot => {
      const editedTask = Object.assign({}, snapshot.val().idTask, {title});
      firebase.child(`tasks/${idTask}`).update(editedTask);
    });
  };
}

export function addFriendGroupToTask(idTask, id){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const refParticipants = firebase.child(`tasks/${idTask}/participants`);
    const refIdList = firebase.child(`tasks/${idTask}`);
    let participants = [];

    refParticipants.once('value', snapshot => {
      participants = snapshot.val()===null ? [id] : snapshot.val().concat([id]);
      refIdList.update({participants});
    });

  };
}


export function markAsDone(id){
  return (dispatch, getState) => {
    const {firebase} = getState();
    const taskRef = firebase.child(`tasks/${id}`);
    taskRef.once('value', snapshot => {
      const isDone = !snapshot.val().done;
      taskRef.update({done:isDone});
    });
  };
};
