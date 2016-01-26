import Snackbar from 'material-ui/lib/snackbar';

import React, { Component, PropTypes } from 'react';


export default class Advice extends Component{

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 2000,
      open: true,
    };
  }

  handleActionTouchTap() {
    alert('We removed the event from your calendar.');
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={this.props.message}
          action="undo"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }


}

Advice.propTypes = {
  message: PropTypes.string
};
