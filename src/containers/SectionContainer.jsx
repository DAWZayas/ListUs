import { connect } from 'react-redux';

import * as listsActions from '../actions/lists';
//import { addList, removeList, editList, addFriendGroupToList, removeFriendGroupToList } from '../actions';

import Section from '../components/Section';
import * as listActions from '../actions/list';

/*function mapStateToProps(state){
  return {
    lists: state.lists
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

	state => ({ lists: state.lists }),
	listsActions

)(Section);
