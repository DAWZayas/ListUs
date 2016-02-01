import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { TextField, RaisedButton } from 'material-ui';
import Logo from '../components/Logo';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state= {
      error: ''
    };
  }

  handleClickSignUp(){
    const { createUser } = this.props;

    const user = this.refs.userSignUp.getValue();
    const password = this.refs.passwordSignUp.getValue();

    createUser(user, password);

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
    					underlineStyle={{borderColor:'blue',  width: '236'}}
              style={{backgroundColor: 'lightgrey', marginBottom: '10px', borderRadius: '10', paddingLeft: '10'}}
              />
    				<TextField
    	    		ref = "passwordSignUp"
    					hintText="Password"
    					underlineStyle={{borderColor:'blue', width: '236'}}
              type="password"
              style={{backgroundColor: 'lightblue', marginBottom: '10px', borderRadius: '10', paddingLeft: '10'}}/>
              {(this.state.error !== '')? <p style={{color: 'red'}}>{this.state.error}</p>:''}
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
