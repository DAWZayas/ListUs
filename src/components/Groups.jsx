import React, { Component, PropTypes } from 'react';
import mui from 'material-ui';
import { AppBar, IconButton, FlatButton, Dialog, TextField } from 'material-ui';
import { arrayPositionByObjectKey } from '../utils/functions';


export default class Groups extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			refToEdit: ''
		};
	}

	groupFriends(friends, idGroup){
		const refer =  'fr'+idGroup;
		return (
			<div ref={refer} className="group-friends" >
				<img src={'https://upload.wikimedia.org/wikipedia/commons/3/38/UtR_arrow.svg'} width='30' />
				{friends.map(function(friend){
					return (
					<img 
						className="avatar" 
						key={this.props.friends[arrayPositionByObjectKey('id', friend, this.props.friends)]['id']} 
						src={this.props.friends[arrayPositionByObjectKey('id', friend, this.props.friends)]['img']} 
						alt={this.props.friends[arrayPositionByObjectKey('id', friend, this.props.friends)]['name']}
						width='50'/>
				)}.bind(this))}
				<FlatButton label=" +Amigo" primary onClick={e => this.handleClickShowDialog(e, 'dialogAddFriend')}/>
			</div>
		);
	}

	/**/

	handleClickShowDialog(e, ref){
		e.preventDefault();
		(ref === 'dialogAddGroup')?this.refs.dialogAddGroup.show():this.refs.dialogAddFriend.show();
	}

	handleClickDismissDialog(e, ref){
		e.preventDefault();
		(ref === 'dialogAddGroup')?this.refs.dialogAddGroup.dismiss():this.refs.dialogAddFriend.dismiss();
	}

	handleClickShowGroupFriends(e, idGroup){
		e.preventDefault();
		this.props.onshowGroupFriends(idGroup);
	}

	handleClickRemoveGroup(e, idGroup){
		e.preventDefault();
		this.props.onRemoveGroup(idGroup);
	}

	handleClickAdd(e, ref){
		e.preventDefault();
		const name = (ref === 'dialogAddGroup')?this.refs.groupNameInput.value
								  :this.refs.friendNameInput.value;
		(ref === 'dialogAddGroup')?this.props.onAddGroup(name)
								  :'';

				//this.handleClickAddFriend(name)
		this.handleClickDismissDialog(e, 'dialogAddGroup');
	}
/*******/
	handleClickAddFriend(e, name, ref){
		e.preventDefault();
		const { friends } = this.props;
		const idFriend = friends[arrayPositionByObjectKey('name', name, friends)]['id'];
		this.props.onAddFriendGroup(idFriend, ref);
	}

	handleClickSetRefToEdit(e, idGroup){
		e.preventDefault();
		this.setState({refToEdit: idGroup});
	}

	handleClickEditGroup(e, ref, value){
		e.preventDefault();
		this.props.onEditGroup(ref, value);
		this.handleHideEdit(e);
	}

	applyParamsToArray(ref){
		return [
			<FlatButton label="Cancel" secondary onClick={e=>this.handleClickDismissDialog(e, ref)} />,
			<FlatButton label="Submit" primary onClick={e=>this.handleClickAdd(e, ref)} />
		];
	}

	editGroup(ref){
		const pos = arrayPositionByObjectKey('idGroup', ref, this.props.groups);
		return (<div>
					<TextField
						ref = "groupEdit"
						hintText={this.props.groups[pos]['name']}
						underlineStyle={{borderColor:'blue'}}
						/>
					<FlatButton label="Cancelar" onClick={e => this.handleHideEdit(e)}/>
					<FlatButton label="Editar" onClick={e => this.handleClickEditGroup(e, ref, this.refs.groupEdit.getValue())}/>
				</div>);
	}

	handleHideEdit(e){
		e.preventDefault();
		this.setState({refToEdit: ''});
	}

	render(){
		var injectTapEventPlugin = require("react-tap-event-plugin");
		injectTapEventPlugin();
		const AppBar = require('material-ui/lib/app-bar');

		return (
			<div>
				
 				<h3>GRUPOS</h3>
				{(this.props.groups)?this.props.groups.map(function(group){ 
						return (
							<div>
								<AppBar title={group['name']} 
									iconElementRight={<div className="deleteEdit">
											<a className="glyphicon glyphicon-remove-circle" onClick={e => this.handleClickRemoveGroup(e, group['idGroup'])} />
											<a className="glyphicon glyphicon-edit" onClick={e => this.handleClickSetRefToEdit(e, group['idGroup'])}/>
										</div>
										}
									onLeftIconButtonTouchTap={e => this.handleClickShowGroupFriends(e, group['idGroup'])}
									
								/> 
		 						{(group['showFriends']===true)?this.groupFriends(group['friends'], group['idGroup']):''}
	 						</div>
	 					);
					}.bind(this)
				): <p>No hay grupos creados.</p>}

				{(this.state.refToEdit !== '')?this.editGroup(this.state.refToEdit):''}
				<br/>
				<div className="addGroup"><FlatButton label="Añadir Grupo" primary onClick={e => this.handleClickShowDialog(e, 'dialogAddGroup')}/></div>

				<Dialog ref="dialogAddFriend" title="Añadir amigos al grupo" actions={this.applyParamsToArray('dialogAddFriend')}>
					<p>Nombre del amigo: <input ref="friendNameInput" /></p>
				</Dialog>

				<Dialog ref="dialogAddGroup" title="Añadir grupo" actions={this.applyParamsToArray('dialogAddGroup')}>
					<p>Nombre del grupo: <input ref="groupNameInput" /></p>
				</Dialog>

				
			</div>
		);
	}
}



Groups.propTypes= {
	groups: PropTypes.array,
	friends: PropTypes.array
};

				/**/


		/*<p className="" onClick={e => this.handleClickRemoveGroup(e, group['idGroup'])}>X</p>*/


	/*
	render() {
		debugger;
		return (
			<article className='article'>
 				<h3>Groups management</h3>
 				<p>{(this.props.groups)?this.props.groups[0]['name']:'no hay grupos'}</p>
      </article>
		);
	}
}*/