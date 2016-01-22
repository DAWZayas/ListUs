import { connect } from 'react-redux';
import Account from '../components/Account';
import * as userActions from '../actions/user';

function mapStateToProps(state) {
  return {
  	user: state.user, 
    auth: state.auth
  };
}


export default connect(
	mapStateToProps,
  	userActions
)(Account);