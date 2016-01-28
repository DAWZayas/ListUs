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


  handleLoginGithub(){
    this.props.signInWithGithub();
  }

  handleLoginTwitter(){
    this.props.signInWithTwitter();

  }

  render() {
    return (
    	<div className="enter">
        <div className="enterPrincipal">
      		<div className="enterHeader"></div>
          <br/>
      		<Logo />
      		<div className="login">
  	    		<TextField 
  	    			ref = "userLogIn"
    					hintText="User"
    					underlineStyle={{borderColor:'blue',  width: '236'}}
              style={{backgroundColor: 'lightgrey', marginBottom: '10px', borderRadius: '10', paddingLeft: '10'}}
              />
    				<TextField 
    	    		ref = "passwordLogIn"
    					hintText="Password"
    					underlineStyle={{borderColor:'blue', width: '236'}}
              type="password"
              style={{backgroundColor: 'lightblue', marginBottom: '10px', borderRadius: '10', paddingLeft: '10'}}/>
              {(this.state.error !== '')? <p style={{color: 'red'}}>{this.state.error}</p>:''}
    				<RaisedButton label="LOG IN" secondary  onTouchTap={()=>this.handleClickLogIn()} style={{}}/>
            <br/>
            <div>
              <span className="btn" onClick={()=>this.handleLoginGithub()} style={{}} title="Github">
                <img src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" style={{width: '50', height: '50'}} />
              </span>

              <span className="btn" onClick={()=>this.handleLoginGithub()} style={{}} title="Twitter">
                <img src="https://pbs.twimg.com/profile_images/666407537084796928/YBGgi9BO_400x400.png" style={{width: '50', height: '50'}} />
              </span>

              <span className="btn" onClick={()=>this.handleLoginTwitter()} style={{}} title="Facebook">
                <img src="http://www.freelargeimages.com/wp-content/uploads/2015/05/Facebook_Vector_Logo_Hd_02.png" style={{width: '35', height: '35'}} />
              </span>
            </div>

    			</div><br/>
    			{/*<div><a style={{cursor: 'pointer'}}>Register</a></div>*/}
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
  signInWithTwitter: PropTypes.func
};
