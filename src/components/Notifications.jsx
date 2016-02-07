import React, { Component, PropTypes } from 'react';


export default class Notifications extends Component{

  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.registerListeners();
  }

  componentWillUnmount() {
    this.props.unregisterListeners();
  }


  render() {
    const { notifications } = this.props;
    return(
      <div>
        <ul>
        {
        notifications.length!==0 ?
          notifications.map( (not, id) =>
            <li className="row notificationList" key={id}>
              <span className="col-xs-6">{not.descr}</span>
              <div className="btn-group pull-right" role="group" >
                <button className="btnNotificationsOk btn btn-default glyphicon glyphicon-ok" onClick={() => this.props.aceptPendingAction(not) }>  </button>
                <button className="btnNotificationsNot btn btn-default glyphicon glyphicon-remove" onClick={ () => this.props.refusePendingAction(not) }> </button>
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
