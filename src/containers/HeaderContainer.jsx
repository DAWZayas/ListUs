import { connect } from 'react-redux';
import Header from '../components/Header';
import * as authActions from '../actions/auth';

function mapStateToProps(state){
	return{
		lists: state.lists,
		state: state.auth
	};
}


export default connect(
	mapStateToProps,
	authActions
)(Header);
