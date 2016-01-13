import { connect } from 'react-redux';
import { removeList, editList, addFriendGroupToList, removeFriendGroupToList } from '../actions';
import Section from '../components/Section';
import * as listActions from '../actions/list';

function mapStateToProps(state){
  return {
    lists: state.lists,
    tasks: state.tasks,
    friends: state.friends,
    groups: state.groups
  };
}

/*function mapActionsToProps(dispatch){
	return {
    onAddList,
    //onAddList: (title, date, importance, id) => dispatch(addList(title, date, importance, id)),
    onRemoveList: (id, title, date) => dispatch(removeList(id, title, date)),
    onEditList: ( idList, title, date, newDate, importance ) => dispatch(editList( idList, title, date, newDate, importance )),
    onAddFriendGroupToList: (idList, idParticipant) => dispatch(addFriendGroupToList(idList, idParticipant)),
    onRemoveFriendGroupToList: (idList, idParticipant) => dispatch(removeFriendGroupToList(idList, idParticipant))
	};
}*/

export default connect(
	mapStateToProps,
	listActions
)(Section);
