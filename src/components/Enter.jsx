import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { switchUser } from '../actions';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { TextField, RaisedButton } from 'material-ui';
import Logo from '../components/Logo';
import { arrayPositionByObjectKey } from '../utils/functions';


export default class Enter extends Component {

  constructor(props) {
    super(props);
    this.state= {
      error: ''
    };
  }

  handleClickLogIn(){
    const pos = arrayPositionByObjectKey('name', this.refs.userLogIn.getValue(), this.props.allUsers);
    if( pos !== -1 ){
      if(this.props.allUsers[pos].password === this.refs.passwordLogIn.getValue()){
        this.props.onSwitchUser(this.props.allUsers[pos]);
      }
      else this.setState({error: 'User or password incorrect'});
    }
  }

  render() {
    return (
    	<div className="enter">
    		<div className="enterHeader" width="100%" height="60" style={{}}></div>
    		<Logo />
    		<div className="login">
	    		<TextField 
	    			ref = "userLogIn"
					hintText="User"
					underlineStyle={{borderColor:'blue'}}/>
				<TextField 
	    			ref = "passwordLogIn"
					hintText="Password"
					underlineStyle={{borderColor:'blue'}}/>
				<RaisedButton label="LOG IN" secondary  onTouchTap={()=>this.handleClickLogIn()}/>
			</div><br/>
			<div><a style={{cursor: 'pointer'}}>Register</a></div>

    	</div>
    );
  }
}

Enter.propTypes = {
  // Injected by React RouterConfirmDialog
  children: PropTypes.node
};


function mapStateToProps(state) {
  return {
     allUsers: state.allUsers
  };
}

function mapActionsToProps(dispatch) {
  return {
    onSwitchUser: user => dispatch(switchUser(user))
     
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Enter);