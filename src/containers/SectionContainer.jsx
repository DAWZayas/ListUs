import { connect } from 'react-redux';
import { addList, removeList, editList,  } from '../actions';
import Section from '../components/Section';

function mapStateToProps(state){
  return {
    lists: state.lists,
    asideVisibility: state.aside,
  };
}

function mapActionsToProps(dispatch){
	return {
		onAddList: title => dispatch(addList(title)),
    	onRemoveList: id => dispatch(removeList(id)),
    	onEditList: (id, title) => dispatch(editList(id, title))
	};
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(Section);