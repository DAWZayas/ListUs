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
    debugger;
    return(
      <div>
        Notifications
      </div>
    );
  }

}

Notifications.propTypes = {
  state: PropTypes.object,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired
};
