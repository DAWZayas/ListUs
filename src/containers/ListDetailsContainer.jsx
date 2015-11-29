
import { connect } from 'react-redux';
import { addTask, removeTask, editTask, removeList, editList, addComment, removeComments, addFriendGroupToList, addFriendGroupToTask } from '../actions';
import ListDetails from '../components/ListDetails';


function mapStateToProps(state){
    const idList = state.router.params.idList;
    const list = state.lists.reduce( (listas, list) => list.id===idList ?  list : listas, {});
    const tasks = Object.values(state.tasks).reduce( (tasks, task) => task.idList === idList ? Object.assign(tasks, {[task.id]: task}) : tasks, {});
    return{list, tasks, friends: state.friends, groups: state.groups};
}

function mapActionsToProps(dispatch){
  return {
    onAddTask: (idList, title) => dispatch(addTask(idList, title)),
    onRemoveTask: id => dispatch(removeTask(id)),
    onEditTask: (id, title) => dispatch(editTask(id, title)),
    onAddFriendGroupToTask: (idTask, idParticipant) => dispatch(addFriendGroupToTask(idTask, idParticipant)),
    onRemoveList: (id, title, date) => dispatch(removeList(id, title, date)),
    onEditList: (id, title) => dispatch(editList(id, title)),
    onAddComment: (idList, user, date, msg) => dispatch(addComment(idList, user, date, msg)),
    onRemoveComments: idList => dispatch(removeComments(idList)),
    onAddFriendGroupToList: (idList, idParticipant) => dispatch(addFriendGroupToList(idList, idParticipant)),

  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ListDetails);
