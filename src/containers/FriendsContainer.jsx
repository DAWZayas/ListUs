import { connect } from 'react-redux';
import Friends from '../components/Friends';

import * as friendsActions from '../actions/friends';


export default connect(
	function(state){
		return ({ friends: state.friends.friends, users: state.friends.users, alert: state.alert });
	},
	friendsActions
)(Friends);
