import { connect } from 'react-redux';
import Header from '../components/Header';
import { switchUser, setList, setTask, setGroups } from '../actions';

function mapStateToProps(state){
	return{
		lists: state.lists
	};
}

function mapActionsToProps(dispatch){
	return {
		onSetUser: user => dispatch(switchUser(user)),
	    onSetLists: lists => dispatch(setList(lists)),
	    onSetTasks: tasks => dispatch(setTask(tasks)),
	    onSetGroups: groups => dispatch(setGroups(groups))
	};
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(Header);
