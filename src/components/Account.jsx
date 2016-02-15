import React, { PropTypes } from 'react';
import { Dialog, TextField, Toggle } from 'material-ui';
import DatePicker from 'react-datepicker';
var moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');
import { countries } from '../utils/functions';


export default class Account extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      error:'',
      edit: false,
      value: 2
    };
  }

  componentWillMount(){
    this.props.registerListeners();
  }

  componentWillUnmount(){
    this.props.unregisterListeners();
  }

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
    this.setState({'error': ''});
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

  handleChangeUserPhoto(){
    this.props.changeImg(this.refs.newUrl.getValue());
    this.hideDialogChangePhoto();
  }

  handleChangeUserName(){
    if(this.refs.newName.getValue() !== ''){
      this.props.changeName(this.refs.newName.getValue());
      this.hideDialogChangeName();
    }
  }

  handleChangeUserPassword(){
    if(this.refs.oldPassword.getValue() === this.props.user.password){
      if(this.refs.newPassword.getValue() === this.refs.newPassword2.getValue()){
        if(this.refs.newPassword.getValue().length >= 6){
          this.props.onChangeUserPassword(this.refs.newPassword.getValue());
          this.setState({'error': ''});
          this.hideDialogChangePassword();
        }
        else this.setState({'error': 'Length password less than 6 characteres'});
      }
      else this.setState({'error': 'Reapeted password incorrect'});
    }
    else this.setState({'error': 'Password incorrect.'});
  }

  handleVisibility(){
    var togg = this.refs.visibility.isToggled();
    var vis = this.props.user.visibility;
    if(togg !== vis){
      this.props.changeVisibility(togg);
    }
    else {
      this.props.changeVisibility(!togg);
      this.refs.visibility.setToggled(!togg);
    }
  }

  

  handleLoginGithub(){
    this.props.signInWithGithub();
  }

  handleLoginTwitter(){
    this.props.signInWithTwitter();
  }

  handleLoginGoogle(){
    this.props.signInWithGoogle();
  }

  handleEditPersonalData(){
    this.setState({ edit: true});
  }


  handleChange(event, index, value){
    this.setState({value});
  }

  handleConfirmEdit(){
    const gender = (this.refs.genderSelect) ? this.refs.genderSelect.value :'';
    const town = (this.refs.townSelect) ? this.refs.townSelect.value :'';
    const birthday = (this.refs.birthdaySelect.getValue()) 
        ? this.refs.birthdaySelect.getValue().format('DD/MM/YYYY')
        :''; 
    this.props.changeGender(gender);
    this.props.changeTown(town);
    (birthday !== '') ?this.props.changeBirthday(birthday) :'';
    
    this.setState({edit: false});
  }

  handleCancelEdit(){
    this.setState({edit: false});
  }


  render() {
    let changeNameActions = [
      { text: 'Cancel', onClick: this.hideDialogChangeName.bind(this) },
      { text: 'Submit', onClick: this.handleChangeUserName.bind(this), ref: 'submit' }
    ];

    let changePasswordActions = [
      { text: 'Cancel', onClick: this.hideDialogChangePassword.bind(this) },
      { text: 'Submit', onClick: this.handleChangeUserPassword.bind(this), ref: 'submit' }
    ];

    let changePhotoActions = [
      { text: 'Cancel', onClick: this.hideDialogChangePhoto.bind(this) },
      { text: 'Submit', onClick: this.handleChangeUserPhoto.bind(this), ref: 'submit' }
    ];

    let a = [{payload: '0', text: 'hhh'}];


    return (
      <article className="article account">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
        <div className="acountImg" style={{display: 'flex', justifyContent: 'space-between', paddingRight: '10px'}}>
         <div>
           <div className="photo">
              <img src={this.props.user.img} width="80" height="80" style={{borderRadius: '50px'}} />
              <div></div>
              <div><a href="#" onClick={this.showDialogChangePhoto.bind(this)}><img width="18" src={"http://vignette3.wikia.nocookie.net/java/images/0/0e/Camera_icon.gif/revision/latest?cb=20090227194712" } /></a></div>
           </div>
           <span style={{fontFamily: 'verdana', fontWeight: 'bold', fontSize: '20'}}>{this.props.user.name}</span>
         </div>
        { (!this.state.edit) ?<button className="btn btn-default" onClick={() => this.handleEditPersonalData()} style={{height: '40', alignSelf: 'flex-end'}}>EDIT</button> :''}

        </div><br/>



        {/*<ul className="tools nav nav-pills nav-stacked ">
          <li role="presentation">
            <a onClick={this.showDialogChangeName.bind(this)} href="#">
              <span className="glyphicon marginGlyph glyphicon-user"></span>
              <span>Change Name</span>
            </a>
          </li>*/}

          {/*<li role="presentation"><a onClick={this.showDialogChangePassword.bind(this)} href="#"><span className="glyphicon marginGlyph glyphicon-lock"></span>Change password</a></li>*/}
          {/*<li role="presentation" style={{display: 'flex', justifyContent: 'center'}}>
            <a style={{width: '190px', textAlign: 'justify'}}>
              <Toggle
                ref="visibility"
                style={{fontFamily: '"Helvetica"',
                        color: 'blue', fontWeight: '100'}}
                label="Visibility"
                defaultToggled={this.props.user.visibility}
                onToggle={ () => this.handleVisibility()}/>
              </a>
            </li>
        </ul>*/}

        {

          (this.props.user.personalData)
              ?(this.state.edit) 
                ?(<div style={{display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
                  <ul className="tools nav nav-pills nav-stacked" >

                    <li role="presentation">
                      <a onClick={this.showDialogChangeName.bind(this)} href="#">
                        <span className="glyphicon marginGlyph glyphicon-user"></span>
                        <span>Change Name</span>
                      </a>
                    </li>

                    <li role="presentation" style={{display: 'flex', justifyContent: 'center'}}>
                      <a style={{width: '190px', textAlign: 'justify'}}>
                        <Toggle
                          ref="visibility"
                          style={{fontFamily: '"Helvetica"',
                                  color: 'blue', fontWeight: '100'}}
                          label="Visibility"
                          defaultToggled={this.props.user.visibility}
                          onToggle={ () => this.handleVisibility()}/>
                      </a>
                    </li>

                    <li>
                      <div className="form-group">
                        <label for="genderSelect">Gender</label>
                        <select ref="genderSelect" className="form-control">
                          <option>{(this.props.user.personalData.gender !== '') 
                            ? this.props.user.personalData.gender
                            : ''}</option>
                          <option>Female</option>
                          <option>Male</option>
                          <option>Alien</option>
                        </select>
                      </div>
                    </li>

                    <li>
                      <label for="townSelect">Country</label>
                      <select ref="townSelect" className="form-control">
                        <option>{(this.props.user.personalData.town !== '') ?this.props.user.personalData.town: ''}</option>
                      { countries.map(country => <option key={country}>{country}</option>)}
                      </select>
                    </li>

                    <li><br/>
                        <label>Birthday: {this.props.user.personalData.birthday}</label>
                        <DatePicker
                            ref="birthdaySelect"
                            key={3}
                            dateFormat="DD/MM/YYYY"
                            popoverAttachment="bottom center"
                            popoverTargetAttachment="top center"
                            popoverTargetOffset="0px 0px" />
                    </li><li><br/></li>
                    <li style={{display: 'flex', justifyContent: 'space-between'}}>
                      <button className="btn btn-default" onClick={() => this.handleCancelEdit()}>CANCEL</button>
                      <button className="btn btn-default" onClick={() => this.handleConfirmEdit()}>EDIT</button>
                    </li>
                  </ul>
                </div>)

              :(<ul>
                {this.props.user.personalData.gender !== '' 
                  ? <li><span style={{textTransform: 'capitalize'}}>{ this.props.user.personalData.gender }</span></li>
                  :''}

                { this.props.user.personalData.town !== ''
                  ? <li><span style={{textTransform: 'capitalize'}}>{ this.props.user.personalData.town }</span></li>
                  :''}

                { this.props.user.personalData.birthday !== '' 
                  ? <li><span style={{textTransform: 'capitalize'}}>Birthday: { this.props.user.personalData.birthday }</span></li>
                  : ''}
              </ul>)
              :''
          }


        <br/>
        <br/>

          <div style={{'textAlign': 'center'}}>
            <span>If you have any of these accounts, vinculate them to the actual:</span><br/><br/>
            <div>
              <span onClick={()=>this.handleLoginGithub()} style={{'fontSize' : '1.5em', 'marginLeft' : '20px'}} className="fa fa-github githubLogin"></span>
              <span onClick={()=>this.handleLoginTwitter()} style={{'fontSize' : '1.5em', 'marginLeft' : '20px'}} className="fa fa-twitter twitterLogin"></span>
              <span onClick={()=>this.handleLoginGoogle()} style={{'fontSize' : '1.5em', 'marginLeft' : '20px'}} className="fa fa-google-plus googleLogin"></span>

          </div>

          </div>


         <Dialog ref="changeName" title="Change Name" actions={changeNameActions} >
            <TextField ref="newName" floatingLabelText="New name" />
        </Dialog>

        <Dialog ref="changePassword" title="Change Password" actions={changePasswordActions} >
            <TextField type="password" ref="oldPassword" floatingLabelText="Old password" />
            <br/><br/>
            <TextField type="password" ref="newPassword" floatingLabelText="New password" />
            <TextField type="password" ref="newPassword2" floatingLabelText="Repeat new password" />
            <p className="error" style={{color: 'red'}}>{this.state.error}</p>
        </Dialog>

        <Dialog ref="changePhoto" title="Change Photo" actions={changePhotoActions} >
            <TextField ref="newUrl" floatingLabelText="New photo" />
        </Dialog>

      </article>
    );
  }
}

Account.propTypes = {
  changeName: PropTypes.func,
  changeVisibility: PropTypes.func,
  onChangeUserPassword: PropTypes.func,
  changeImg: PropTypes.func,
  changeBirthday: PropTypes.func,
  changeGender: PropTypes.func,
  changeTown: PropTypes.func,
  user: PropTypes.object,
  auth: PropTypes.object,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  signInWithGithub: PropTypes.func,
  signInWithTwitter: PropTypes.func,
  signInWithGoogle: PropTypes.func
};
