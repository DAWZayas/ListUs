import { connect } from 'react-redux';
import Account from '../components/Account';
import { changeUserPhoto, changeUserName, changeUserPassword, changeUserVisibility } from '../actions';

function mapStateToProps(state) {
  return {
  	user: state.user
  };
}

function mapActionsToProps(dispatch) {
  return {
  	onChangeUserPhoto: url => dispatch(changeUserPhoto(url)),
  	onChangeUserName: name => dispatch(changeUserName(name)),
  	onChangeUserPassword: password => dispatch(changeUserPassword(password)),
  	onChangeUserVisibility: visibility => dispatch(changeUserVisibility(visibility))
  };
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(Account);