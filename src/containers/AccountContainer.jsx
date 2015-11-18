import { connect } from 'react-redux';
import Account from '../components/Account';
import { changeUserPhoto } from '../actions';

function mapStateToProps(state) {
  return {
  	user: state.user
  };
}

function mapActionsToProps(dispatch) {
  return {
  	onChangeUserPhoto: url => dispatch(changeUserPhoto(url))
  };
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(Account);