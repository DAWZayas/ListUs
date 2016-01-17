
import { connect } from 'react-redux';
//import { addTask, removeTask, removeListAndNavigate, editTask, editList, addComment, removeComments, addFriendGroupToList, removeFriendGroupToList } from '../actions';
import ListDetails from '../components/ListDetails';
import * as listsActions from '../actions/listsDetailsActions';

function mapStateToProps(state){
  
    const idList = state.router.params.idList;
    const list = state.lists.reduce( (listas, list) => list.id===idList ?  list : listas, {});
    const tasks = Object.values(state.tasks).reduce( (tasks, task) => task.idList === idList ? Object.assign(tasks, {[task.id]: task}) : tasks, {});
    return{list, lists: state.lists, tasks, friends: state.friends, groups: state.groups};
}

/*function mapActionsToProps(dispatch){
  return {
    onAddTask: (idList, title) => dispatch(addTask(idList, title)),
    onRemoveTask: id => dispatch(removeTask(id)),
    onEditTask: (id, title) => dispatch(editTask(id, title)),
    onAddFriendGroupToTask: (idTask, idParticipant) => dispatch(addFriendGroupToTask(idTask, idParticipant)),
    onRemoveList: (id, title, date) => dispatch(removeListAndNavigate(id, title, date)),
    onEditList: ( idList, title, date, newDate, importance ) => dispatch(editList( idList, title, date, newDate, importance )),
    onAddComment: (idList, user, date, msg) => dispatch(addComment(idList, user, date, msg)),
    onRemoveComments: idList => dispatch(removeComments(idList)),
    onAddFriendGroupToList: (idList, idParticipant) => dispatch(addFriendGroupToList(idList, idParticipant)),
    onRemoveFriendGroupToList: (idList, idParticipant) => dispatch(removeFriendGroupToList(idList, idParticipant))
  };
}*/

export default connect(
  mapStateToProps,
  listsActions
)(ListDetails);
