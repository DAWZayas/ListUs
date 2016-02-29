import { connect } from 'react-redux';
import Header from '../components/Header';
import * as authActions from '../actions/auth';
import { setMetadata } from '../actions';

function mapStateToProps(state){
	return{
		lists: state.lists,
		state: state.auth,
		user: state.user,
		metadata: state.metadata
	};
}


export default connect(
	mapStateToProps,
	Object.assign( {}, authActions, { setMetadata } )
)(Header);
