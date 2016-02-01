import { connect } from 'react-redux';
import * as listsActions from '../actions/sectionActions';

//import { addList, removeList, editList, addFriendGroupToList, removeFriendGroupToList } from '../actions';
import Section from '../components/Section';

export default connect(
	function(state) {
		return ({ user: state.user, lists: state.lists, tasks: state.tasks, friends: state.friends.friends, groups: state.groups, pendingActions: state.notifications });
	},
	listsActions
)(Section);
