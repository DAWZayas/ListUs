import React from 'react';

import { Dialog, TextField, FloatingActionButton, DatePicker, DatePickerDialog } from 'material-ui';


export default class Account extends React.Component {

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

  showDialogChangePhoto(){
    const nodeDialog = this.refs.changePhoto;
    nodeDialog.show();
  }

  hideDialogChangePhoto(){
    const nodeDialog = this.refs.changePhoto;
    nodeDialog.dismiss();
  }

  handleChangeUserPhoto(url){
    debugger;
    this.props.onChangeUserPhoto(this.refs.newUrl.getValue());
    this.hideDialogChangePhoto();

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

    let changePhotoActions = [
      { text: 'Cancel', onClick: this.hideDialogChangePhoto.bind(this) },
      { text: 'Submit', onClick: this.handleChangeUserPhoto.bind(this), ref: 'submit' }
    ];
		return (
			<article className='article account'>
     		
       

        <div className="acountImg">
         <div className="photo">
            <img src={this.props.user.img} width="80" height="80" style={{borderRadius: '50px'}} />
            <div></div>
            <div><a href='#' onClick={this.showDialogChangePhoto.bind(this)}><img width="18" src={'http://vignette3.wikia.nocookie.net/java/images/0/0e/Camera_icon.gif/revision/latest?cb=20090227194712' } /></a></div>
          </div>
          <span style={{fontFamily: 'verdana', fontWeight: 'bold', fontSize: '20'}}>{this.props.user.name}</span>
        </div><br/>
      	<ul className="nav nav-pills nav-stacked">
          <li role="presentation"><a onClick={this.showDialogChangeName.bind(this)} href='#'><span className='glyphicon marginGlyph glyphicon-user'></span>Change Name</a></li>
          <li role="presentation"><a onClick={this.showDialogChangePassword.bind(this)} href='#'><span className='glyphicon marginGlyph glyphicon-lock'></span>Change password</a></li>
        </ul>

         <Dialog ref='changeName' title='Change Name' actions={changeNameActions} >
            <TextField ref='newName' floatingLabelText="New name" /> 
        </Dialog>

        <Dialog ref='changePassword' title='Change Password' actions={changePasswordActions} >
            <TextField type='password' ref='oldPassword' floatingLabelText="Old password" /> 
            <br/><br/>
            <TextField type='password' ref='newPassword' floatingLabelText="New password" /> 
            <TextField type='password' ref='newPassword2' floatingLabelText="Repeat new password" /> 

        </Dialog>

        <Dialog ref='changePhoto' title='Change Photo' actions={changePhotoActions} >
            <TextField ref='newUrl' floatingLabelText="New photo" /> 
        </Dialog>
      </article>
		);
	}
}

