import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { AppBar, FlatButton, Dialog, TextField, ListItem, List, Avatar, DropDownMenu } from 'material-ui';
import { arrayPositionByObjectKey, getIdByOtherKey, avatarLetter, groupFriends, sortArray, menuItems } from '../utils/functions';
import SectionHeader from './SectionHeader';


export default class Groups extends Component {
	constructor(props){
		super(props);
		this.state = {
			sorted: 'Sort By',
			refToEdit: '',
			error: '',
			id: '',
			admin: false,
			search: [],
			listToShow: 0
		};
	}

	/* Dialog functions */

	handleClickDismissDialog(e, ref){
		e.preventDefault();
		this.setState({id: '', search: []});
		(ref === 'dialogAddGroup')?this.refs.dialogAddGroup.dismiss():this.refs.dialogAddFriend.dismiss();
	}

	handleClickShowDialog(e, ref, id){
		e.preventDefault();
		if(arguments[3]) this.setState({admin: true});
		this.setState({id, search: []});
		(ref === 'dialogAddGroup')?this.refs.dialogAddGroup.show():this.refs.dialogAddFriend.show();

	}


	handleClickShowGroupFriends(e, id){
		e.preventDefault();
		this.props.onshowGroupFriends(id);
	}

	/* Add group or friend*/
	applyParamsToArray(ref){
		return [
			<FlatButton label="Cancel" secondary onClick={e=>this.handleClickDismissDialog(e, ref)} />,
			<FlatButton label="Submit" primary onClick={e=>this.handleClickAdd(e, ref)} />
		];
	}

	handleClickAdd(e, ref){
		e.preventDefault();
		var pos, name;
		if(ref === 'dialogAddGroup'){
			name = this.refs.groupNameInput.getValue();
			pos = arrayPositionByObjectKey('name', name, this.props.groups);
			this.addGroupNonExistent(e, pos, name);
		}
		else{
			name = this.refs.friendNameInput.getValue();
			pos = arrayPositionByObjectKey('name', name, this.props.friends);
			this.addFriendNonExistent(e, pos, name);
		}
	}

	addGroupNonExistent(e, pos, name){
		if(pos !== -1) this.setState({error: 'El nombre del grupo ya existe'});
		else{
			this.props.onAddGroup(name, this.props.user.id);
			this.setState({error: '', search: []});
			this.handleClickDismissDialog(e, 'dialogAddGroup');
		}
	}

	addFriendNonExistent(e, pos, name){
		if(pos === -1) this.setState({error: 'None of your friends matches whith that name'});
		else{
			const idFriend = this.props.friends[pos]['id'];
			if(this.state.admin === false) this.props.onAddGroupFriend(getIdByOtherKey('name', name, this.props.friends), this.state.id);
			else this.props.onChangeGroupAdmin(idFriend, this.state.id);
			this.setState({error: ''});
			this.handleClickDismissDialog(e, 'dialogAddFriend');
		}
	}

	/* Remove group */
	handleClickRemoveGroup(e, id){
		e.preventDefault();
		this.props.onRemoveGroup(id);
	}

	/* Editting groups*/
	handleClickSetRefToEdit(e, id){
		e.preventDefault();
		this.setState({refToEdit: id});
	}

	handleClickEditGroup(e, ref, value){
		e.preventDefault();
		this.props.onEditGroup(ref, value);
		this.handleHideEdit(e);
	}

	editGroup(ref){
		const pos = arrayPositionByObjectKey('id', ref, this.props.groups);
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

	/* Admin tranfer */
	handleChangeGroupAdmin(e, id){
		e.preventDefault();
		this.onChangeGroupAdmin(this.refs.changeAdmin.value, id);
	}


	/* Dialog matches*/
	/*****/
	searchingMatch(e){//param ref deleted
		e.preventDefault();
		const words = (this.refs.groupNameInput)?this.refs.groupNameInput.getValue():this.refs.friendNameInput.getValue();
		const array = (this.refs.groupNameInput)?this.props.groups :this.props.friends;
		const search = array.filter(function(object){
				return object.name.toLowerCase().search(words.toLowerCase()) !== -1;
			}.bind(this));

		this.setState({search});
	}

	handleChangeInputValue(e, ref, value){
		e.preventDefault();
		(ref === 'friendNameInput')?this.refs.friendNameInput.setValue(value) :this.refs.changeAdmin.setValue(value);
	}

	clearSearchState(e){
		e.preventDefault();
		this.setState({search : []});
	}

	handleSorted(e, selectedIndex, menuItem){
		e.preventDefault();
		this.setState({sorted: menuItem.text});
	}

	render(){
		const { sorted } = this.state;
		const key = (sorted.split(' ')[0] === 'Name')?'name':'date';
		const groups = (sorted === 'Sort By')
				?this.props.groups 
				:sortArray(this.props.groups, key, sorted.split(' ')[1]);
		
		return (
			<section>
       			<SectionHeader title="GROUPS" menuItems={menuItems} func={(e, selectedIndex, menuItem)=>this.handleSorted(e, selectedIndex, menuItem)}/>
				{(groups)?groups.map(function(group){
						return (
							<div key={group['id']}>
								<AppBar
										title={group['name']}
										className="listGroups"
										iconElementRight={<div className="deleteEdit">
											<a className="glyphicon glyphicon-remove-circle" onClick={e => this.handleClickRemoveGroup(e, group['id'])} />
											<a className="glyphicon glyphicon-edit" onClick={e => this.handleClickSetRefToEdit(e, group['id'])}/><br/>
											<a className="glyphicon glyphicon-transfer" onClick={e => this.handleClickShowDialog(e, 'dialogAddFriend', group['id'], true)}/>
										</div>
										}
										onLeftIconButtonTouchTap={e => this.handleClickShowGroupFriends(e, group['id'])}

								/>
		 						{(group['showFriends']===true)?<div>
		 															{groupFriends(group['friends'], group['id'], this.props.friends, this.props.user.id)}
		 															<FlatButton label=" +Friend" primary onClick={e => this.handleClickShowDialog(e, 'dialogAddFriend', group['id'])}/>
		 														</div>
		 													  :''}
	 						</div>
	 					);
					}.bind(this))
					: <p>No groups created.</p>}

				{(this.state.refToEdit !== '')?this.editGroup(this.state.refToEdit):''}
				<br/>
				<div className="addGroup"><FlatButton label="Create Group" primary onClick={e => this.handleClickShowDialog(e, 'dialogAddGroup')}/></div>

				{(this.state.listToShow !== 0)
					 ?<div className="col-md-12 center">
			          <a onClick={() => this.openDialog()} style={{cursor: 'pointer'}} >
			            <img src={'http://waxpoetics.com/wp-content/themes/records-waxpoetics/images/newicons4/plus.png'} width='30' height='30'/>
			          </a>
			        </div>
			        : ''
		    	}

				<Dialog className="addFriends"
						ref="dialogAddFriend"
						title={(!this.state.admin)?'Add group friend':'Administration Transfering'}
						actions={this.applyParamsToArray('dialogAddFriend')}
					>

					<div ref="subMenuCont" className="subMenuCont" >
						<p>Friend's name: </p>
						<div className="inputDiv">
							<TextField
								ref = "friendNameInput"
								hintText="Friend name"
								underlineStyle={{borderColor:'blue'}}
								autoFocus
								onKeyUp={e => this.searchingMatch(e, 'friendNameInput')}
								/>

							<div ref="subMenuRef">
							{(this.state.search.length === 0)?''
										:<List  style={{maxHeight: '100px', overflow: 'auto', paddingTop: '0', border: 'solid 1px lightblue', borderTop: 'hidden'}}>
											{this.state.search.map(function(friend){
												return (
													<ListItem
														key={friend.id}
														leftAvatar={(friend.img !== '')?<Avatar src={friend.img}/>: avatarLetter(friend.name)}
														primaryText={friend.name}
														style={{height: '49px', borderTop: 'solid 1px lightblue'}}
														onTouchTap={e => this.handleChangeInputValue(e, 'friendNameInput', friend.name)} />
												);
											}.bind(this))}
										</List>}

							</div>
						</div>
						<p className="error" style={{color: 'red'}}>{this.state.error}</p>
					</div>
				</Dialog>

				<Dialog ref="dialogAddGroup" title="Add Group" actions={this.applyParamsToArray('dialogAddGroup')}>
					<p>Group's name: {/*<input ref="groupNameInput" autoFocus />*/}</p>
					<TextField
						ref = "groupNameInput"
						hintText="Group name"
						underlineStyle={{borderColor:'blue'}}
						autoFocus
						/>
					<p className="error" style={{color: 'red'}}>{this.state.error}</p>
				</Dialog>
			</section>
		);
	}
}



Groups.propTypes= {
	groups: PropTypes.array,
	friends: PropTypes.array
};
