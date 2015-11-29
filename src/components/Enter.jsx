import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { switchUser, setFriends, setGroups, setList, setTask } from '../actions';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { TextField, RaisedButton } from 'material-ui';
import Logo from '../components/Logo';
import { arrayPositionByObjectKey, getFriends, getGroups, getLists, getTasks } from '../utils/functions';
import { serverUsers } from '../utils/dataBase';


export default class Enter extends Component {

  constructor(props) {
    super(props);
    this.state= {
      error: ''
    };
  }


/************/
  handleClickLogIn(){
      const pos = arrayPositionByObjectKey('name', this.refs.userLogIn.getValue(), serverUsers);
      if( pos !== -1 ){
        if(serverUsers[pos].password === this.refs.passwordLogIn.getValue()){
          this.props.onSwitchUser(serverUsers[pos]);
          this.props.onSetFriends(getFriends(serverUsers[pos].friends));
          this.props.onSetGroups(getGroups(serverUsers[pos].groups));
          const userLists = getLists(this.refs.userLogIn.getValue());
          this.props.onSetLists(userLists);
          this.props.onSetTasks(getTasks(userLists));
      }
      else this.setState({error: 'User or password incorrect'});
    }
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
    				<RaisedButton label="LOG IN" secondary  onTouchTap={()=>this.handleClickLogIn()} style={{}}/>
    			</div><br/>
    			<div><a style={{cursor: 'pointer'}}>Register</a></div>
        </div>
        <div className="enterHeader enterFooter" height="80px"></div>
    	</div>
    );
  }
}

Enter.propTypes = {
  // Injected by React RouterConfirmDialog
  children: PropTypes.node,
  onSetFriends: PropTypes.func,
  onSetTasks: PropTypes.func,
  onSetLists: PropTypes.func,
  onSetGroups: PropTypes.func,
  onSwitchUser: PropTypes.func
};


function mapStateToProps(state) {
  return {
    state
    //dataBase: state.dataBase
  };
}

function mapActionsToProps(dispatch) {
  return {
    onSwitchUser: user => dispatch(switchUser(user)),
    onSetFriends: friends => dispatch(setFriends(friends)),
    onSetGroups: groups => dispatch(setGroups(groups)),
    onSetLists: lists => dispatch(setList(lists)),
    onSetTasks: tasks => dispatch(setTask(tasks))
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Enter);