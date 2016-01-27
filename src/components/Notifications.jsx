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
              <button className="btnNotifications btn btn-success" onClick={() => this.props.aceptPendingAction(not) }> Acept </button>
              <button className="btnNotifications btn btn-danger" onClick={ () => this.props.refusePendingAction(not) }> X </button>
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
