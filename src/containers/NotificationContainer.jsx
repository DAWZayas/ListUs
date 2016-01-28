import { connect } from 'react-redux';

import Notifications from '../components/Notifications';
import * as notificationsActions from '../actions/notifications';

export default connect(
	state => ({ notifications: state.notifications }),
	notificationsActions
)(Notifications);
