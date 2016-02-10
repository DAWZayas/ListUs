import React, { Component, PropTypes } from 'react';
import { menuItemsDate } from '../utils/functions';
import SectionHeader from './SectionHeader';

export default class Notifications extends Component{

  constructor(props){
    super(props);
    this.state = {
      sorted: 'Sort By',
    };
  }

  componentWillMount() {
    this.props.registerListeners();
  }

  componentWillUnmount() {
    this.props.unregisterListeners();
  }

  handleSorted(e, selectedIndex, menuItemsDate){
    e.preventDefault();
    this.setState({sorted: menuItemsDate.text});
  }

  render() {
    const { notifications } = this.props;
    const notificationsList = (this.state.sorted === 'Sort By' || this.state.sorted.split(' ')[1] === 'Ascendant') ?
      notifications :
      notifications.reverse();
    return(
      <div>
        <SectionHeader title="NOTIFICATIONS" menuItems={menuItemsDate}
          func={(e, selectedIndex, menuItemsDate)=>this.handleSorted(e, selectedIndex, menuItemsDate)} />
        <ul className="ulNotifications">
        {
        notifications.length!==0 ?
          notificationsList.map( (not, id) =>
            <li className="notificationList" key={id}>
              <div className="row">
                <span className="col-xs-6">{not.descr}</span>
                <div className="btn-group pull-right" role="group" style={{'marginRight': '15px'}}>
                  <button className="btnNotificationsOk btn btn-default glyphicon glyphicon-ok" onClick={() => this.props.aceptPendingAction(not) }>  </button>
                  <button className="btnNotificationsNot btn btn-default glyphicon glyphicon-remove" onClick={ () => this.props.refusePendingAction(not) }> </button>
                </div>
              </div>
              <div className="row">
                <span className="pull-right" style={{'marginRight': '15px', 'marginTop': '15px', 'fontSize': '12px'}}><i>{not.date}</i></span>
              </div>
          </li>) : ''
        }
        </ul>
      </div>
    );
  }

}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  aceptPendingAction: PropTypes.func.isRequired,
  refusePendingAction: PropTypes.func.isRequired,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired
};
