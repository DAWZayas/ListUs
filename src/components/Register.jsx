import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { TextField, RaisedButton } from 'material-ui';
import Logo from '../components/Logo';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state= {
      errorPassword: '',
      errorEmail: ''
    };
  }

  signUp(){
    const { createUser } = this.props;

    const user = this.refs.userSignUp.getValue();
    const password = this.refs.passwordSignUp1.getValue();

    createUser(user, password);
  }

  handleClickSignUp(){
    if(this.checkPasswords() && this.validateEmail()){
      this.signUp();
    }else{
      console.log('Errors');
    }
  }

  checkPasswords(){

    const { passwordSignUp1, passwordSignUp2 } = this.refs;
    const value1 = passwordSignUp1.getValue();
    const value2 = passwordSignUp2.getValue();
    if (value1 === value2) {
      this.setState({
        errorPassword: ''
      });
      return true;
    }else{
      this.setState({
        errorPassword: 'Passwords are different'
      });
      return false;
    }

  }

  validateEmail() {

    const { userSignUp } = this.refs;
    const email = userSignUp.getValue();

    if(email.length === 0){
      this.setState({
        errorEmail: ''
      });
      return false;
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(email)){
      this.setState({
        errorEmail: ''
      });
      return true;
    }else{
      this.setState({
        errorEmail: 'Email is invalid'
      });
      return false;
    }
  }

  render() {
    return (
    	<div className="enter">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
        <div className="enterHeader"></div>

        <div className="enterPrincipal">
          <br/>
      		<Logo />
      		<div className="login">
  	    		<TextField
  	    			ref = "userSignUp"
    					hintText="Email"
              onChange={this.validateEmail.bind(this)}
              style={{marginBottom: '10px', borderRadius: '10', paddingLeft: '10'}}

              />
            {(this.state.errorEmail !== '')? <p style={{color: 'red'}}>{this.state.errorEmail}</p>:''}

    				<TextField
    	    		ref = "passwordSignUp1"
    					hintText="Password"
              type="password"
              onChange={this.checkPasswords.bind(this)}
              style={{marginBottom: '10px', borderRadius: '10', paddingLeft: '10'}}/>
            <TextField
    	    		ref = "passwordSignUp2"
    					hintText="Repeat password"
              type="password"
              onChange={this.checkPasswords.bind(this)}
              style={{marginBottom: '10px', borderRadius: '10', paddingLeft: '10'}}/>
            {(this.state.errorPassword !== '')? <p style={{color: 'red'}}>{this.state.errorPassword}</p>:''}
            <RaisedButton label="SIGN UP" secondary  onTouchTap={()=>this.handleClickSignUp()} style={{}}/>
    		</div><br/>
        </div>
        <div className="enterHeader enterFooter" height="80px"></div>
    	</div>
    );
  }
}

Login.propTypes = {
  createUser: PropTypes.func
};
