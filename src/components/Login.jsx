import React, { Component, PropTypes } from 'react';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import { TextField, RaisedButton } from 'material-ui';
import Logo from '../components/Logo';
import { Link } from 'react-router';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state= {
      error: ''
    };
  }

  handleClickLogIn(){
    const { authWithUserPass } = this.props;

    const user = this.refs.userLogIn.getValue();
    const password = this.refs.passwordLogIn.getValue();

    authWithUserPass(user, password);
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
  	    			ref = "userLogIn"
    					hintText="Email"
              style={{marginBottom: '10px', borderRadius: '10', paddingLeft: '10'}}
              />
    				<TextField
    	    		ref = "passwordLogIn"
    					hintText="Password"
              type="password"
              style={{marginBottom: '10px', borderRadius: '10', paddingLeft: '10'}}/>
              {(this.state.error !== '')? <p style={{color: 'red'}}>{this.state.error}</p>:''}
    				<RaisedButton label="LOG IN" secondary  onClick={()=>this.handleClickLogIn()} style={{}}/>
            <br/>
            <div>
              <span className="btn" onClick={()=>this.handleLoginGithub()} style={{}} title="Github">
                <i className="fa fa-github githubLogin biggerFont"></i>
              </span>

              <span className="btn" onClick={()=>this.handleLoginGithub()} style={{}} title="Twitter">
                <i className="fa fa-twitter twitterLogin biggerFont"></i>
              </span>

              <span className="btn" onClick={()=>this.handleLoginGoogle()} style={{}} title="Google">
                <i className="fa fa-google-plus googleLogin biggerFont"></i>
              </span>
            </div>

    			</div><br/>
        <div className="text-center">Do not have an account yet? <br/><Link to={`register`} style={{cursor: 'pointer'}}>Register now</Link></div><br/>
        </div>
        <div className="enterHeader enterFooter" height="80px"></div>
    	</div>
    );
  }
}

Login.propTypes = {
  // Injected by React RouterConfirmDialog
  children: PropTypes.node,
  onSetFriends: PropTypes.func,
  onSetTasks: PropTypes.func,
  onSetLists: PropTypes.func,
  onSetGroups: PropTypes.func,
  onSwitchUser: PropTypes.func,
  signInWithGithub: PropTypes.func,
  signInWithTwitter: PropTypes.func,
  signInWithGoogle: PropTypes.func,
  authWithUserPass: PropTypes.func
};
