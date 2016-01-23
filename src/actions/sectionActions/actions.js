import { SET_LIST, ADD_LIST_ERROR, REMOVE_LIST_ERROR, EDIT_LIST_ERROR } from './action-types';
//import sequencer from '../sequencer';

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

    let fireReference = firebase.child('lists').push({title, date, importance, participants:[]}, error => {
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

  };
}


export function removeList(idList, title, date){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`lists/${idList}`).remove(error => {
      if(error){
        console.error('ERROR @ removeList:', error);
        dispatch({
          type: REMOVE_LIST_ERROR,
          payload: error
        });
      }else{
      // get day
      const dayNumber = convertDay(date);

      //get month
      const monthNumber = convertMonth(date);
      const monthName = months[monthNumber];

      const refDate = firebase.child(`calendar/${auth.id}/${date.split('/')[2]}/${monthName}/${dayNumber}`);
      const refMonth = firebase.child(`calendar/${auth.id}/${date.split('/')[2]}/${monthName}`);
      let listsInDay = [];
      refDate.once('value', snapshot => {
        listsInDay = snapshot.val()===null ? [] : snapshot.val().filter( iterableIdList => iterableIdList!==idList );
        refMonth.update({[dayNumber]:listsInDay});
      });

      //ACTION ADD TO USER LISTS

      const refListsUser = firebase.child(`users/${auth.id}/lists`);
      const refUser = firebase.child(`users/${auth.id}`);
      let lists = [];
      refListsUser.once('value', snapshot => {
        lists = snapshot.val()===null ? [] : snapshot.val().filter(id => id!==idList);
        refUser.update({lists});
      });

      };
    });
  };
}


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


export function addFriendGroupToList( idList, newParticipant){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const refParticipants = firebase.child(`users/${auth.id}/lists/${idList}/participants`);
    const refIdList = firebase.child(`lists/${idList}`);
    let participants = [];

    refParticipants.once('value', snapshot => {
      participants = snapshot.val()===null ? [newParticipant.name] : snapshot.val().concat([newParticipant.name]);
      refIdList.update({participants});
    });
    //añadir la lista a un amigo
    firebase.child('users').once('value', snapshot => {
      let lists = Object.values(snapshot.val()).reduce( (init, user) => user.name===newParticipant.name ? user.lists : init, [] );
debugger;
      lists = lists.concat(idList);
      const idUser = Object.keys(snapshot.val()).filter( idUser => snapshot.val()[idUser].name===newParticipant.name);
      firebase.child(`users/${idUser}`).update({lists});
    });
    /* DEBERÍA LLEGARLE EL ID DEL USER Y añadirsela a sus lists ids pero tocando su calendario,
    al conectarse podría tener unas actions pendings y si las acepta que se ejecuten las acciones*/

  };
}

export function removeFriendGroupToList( idList, idPaticipant){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const refParticipants = firebase.child(`users/${auth.id}/lists/${idList}/participants`);
    const refIdList = firebase.child(`lists/${idList}`);
    let participants = [];
    refParticipants.once('value', snapshot => {
      participants = snapshot.val()===null ? [] : snapshot.val().filter( iterableIdList => iterableIdList!==idPaticipant );
      refIdList.update({participants});
    });

  };
}
/*  addFriendGroupToList tendria que crear una accion pendiente en el otro user y a la hora de conectarse le salga el aviso
    hay que tocar auth/actions para cuando el login sea correcto envie todas las acciones pendientes y  al aceptaarlas las
    realice
*/
