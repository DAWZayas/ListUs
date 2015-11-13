import React from 'react';

import { connect } from 'react-redux';

import { Dialog, TextField, FloatingActionButton, DatePicker, DatePickerDialog } from 'material-ui';


class Account extends React.Component {

  showDialogChangeName(){
    const nodeDialog = this.refs.changeName;
    nodeDialog.show();
  }

  hideDialogChangeName(){
    const nodeDialog = this.refs.changeName;
    nodeDialog.dismiss();
  }

  showDialogChangePassword(){
    const nodeDialog = this.refs.changePassword;
    nodeDialog.show();
  }

  hideDialogChangePassword(){
    const nodeDialog = this.refs.changePassword;
    nodeDialog.dismiss();
  }

	render() {

    let changeNameActions = [
      { text: 'Cancel', onClick: this.hideDialogChangeName.bind(this) },
      { text: 'Submit', onClick: this.hideDialogChangeName.bind(this), ref: 'submit' }
    ];

    let changePasswordActions = [
      { text: 'Cancel', onClick: this.hideDialogChangePassword.bind(this) },
      { text: 'Submit', onClick: this.hideDialogChangePassword.bind(this), ref: 'submit' }
    ];

		return (
			<article className='article account'>
     		
        <Dialog ref='changeName' title='Change Name' actions={changeNameActions} >
            <TextField ref='newName' floatingLabelText="New name" /> 
        </Dialog>

        <Dialog ref='changePassword' title='Change Password' actions={changePasswordActions} >
            <TextField type='password' ref='oldPassword' floatingLabelText="Old password" /> 
            <br/><br/>
            <TextField type='password' ref='newPassword' floatingLabelText="New password" /> 
            <TextField type='password' ref='newPassword2' floatingLabelText="Repeat new password" /> 

        </Dialog>

        <h3>Account management</h3>
      	<ul className="nav nav-pills nav-stacked">
          <li role="presentation"><a href='#'><span className='glyphicon marginGlyph glyphicon-camera'></span>Photo</a></li>
          <li role="presentation"><a onClick={this.showDialogChangeName.bind(this)} href='#'><span className='glyphicon marginGlyph glyphicon-user'></span>Change Name</a></li>
          <li role="presentation"><a onClick={this.showDialogChangePassword.bind(this)} href='#'><span className='glyphicon marginGlyph glyphicon-lock'></span>Change password</a></li>
        </ul>
      </article>
		);
	}
}

function mapStateToProps(state) {
  return {
  };
}

function mapActionsToProps(dispatch) {
  return {
  };
}

export default connect(
	mapActionsToProps,
	mapStateToProps
)(Account);