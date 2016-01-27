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
          notifications.map( (not, id) =>
            <li key={id}><span>{not.descr}</span> <button onClick={() => this.props.aceptPendingAction(not) }> Acept </button>
              <button onClick={ () => this.props.refusePendingAction(not) }> X </button>
            </li>)
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
