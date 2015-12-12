import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { FlatButton, Dialog, TextField, ListItem, List, Avatar } from 'material-ui';
import { arrayPositionByObjectKey, getIdByOtherKey, avatarLetter, sortArray, menuItems } from '../utils/functions';
import SectionHeader from './SectionHeader';
import GroupSections from './GroupSections';


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
			listToShow: 0,
			groupId: ''
		};
	}

	/* Dialog functions */

	handleClickDismissDialog(e, ref){
		e.preventDefault();
		this.setState({id: '', search: [], error: ''});
		(ref === 'dialogAddGroup')?this.refs.dialogAddGroup.dismiss():this.refs.dialogAddFriend.dismiss();
	}

	handleClickShowDialog(ref, id){
		this.refs.dialogEdit.dismiss();
		if(arguments.length === 3) this.setState({admin: true});
		this.setState({id, search: []});
		(ref === 'dialogAddGroup')?this.refs.dialogAddGroup.show():this.refs.dialogAddFriend.show();
	}

	handleClickShowGroupFriends(e, id){
		e.preventDefault();
		this.props.onshowGroupFriends(id);
	}

	/* Add group or friend */
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
		if(pos !== -1) this.setState({error: 'Group\'s name already exists.'});
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
	handleClickRemoveGroup(id){
		this.refs.dialogEdit.dismiss();
		this.props.onRemoveGroup(id);
	}

	/* Remove friend */
	handeRemoveGroupFriend(idFriend, idGroup){
		this.props.onRemoveGroupFriend(idFriend, idGroup);
		//this.handleHideRemove();
	}

	/* Editing groups*/
	handleClickSetRefToEdit(id){
		this.refs.dialogEdit.dismiss();
		setTimeout(() => this.setState({refToEdit: id}), 2);
	}

	handleClickEditGroup(ref, value){
		const fixedValue = value.trim();
		if(arrayPositionByObjectKey('name', fixedValue, this.props.groups) === -1 && fixedValue !== ''){
			this.props.onEditGroup(ref, fixedValue);
			this.handleHideEdit();
		}
		else this.setState({error: 'Group\'s name already exists.'});
		
	}

	editDialogActions(ref){
		return [
			<FlatButton label="Cancel" secondary onClick={() => this.handleHideEdit()}/>,
			<FlatButton label="Edit" primary onClick={() => this.handleClickEditGroup(ref, this.refs.groupEdit.getValue())}/>
		];
	}

	editGroup(ref){
		const pos = arrayPositionByObjectKey('id', ref, this.props.groups);
		return (<Dialog ref="dialogEditName" title="Edit Name" defaultOpen actions={this.editDialogActions(ref)}>
					<TextField
						ref = "groupEdit"
						hintText={this.props.groups[pos]['name']}
						underlineStyle={{borderColor:'blue'}}
						/>
					{(this.state.error === '')?'' :<p style={{color: 'red'}}>{this.state.error}</p>}
				</Dialog>);
	}

	handleHideEdit(){
		if(this.state.error !== '') this.setState({error: ''});
		this.setState({refToEdit: ''});
	}

	/* Admin tranfer */
	handleChangeGroupAdmin(id){
		this.onChangeGroupAdmin(this.refs.changeAdmin.value, id);
	}


	/* Dialog matches*/
	searchingMatch(e){
		e.preventDefault();
		const words = (this.refs.groupNameInput)?this.refs.groupNameInput.getValue():this.refs.friendNameInput.getValue();
		const array = (this.refs.groupNameInput)?this.props.groups :this.props.friends;
		const search = array.filter(function(object){
				return object.name.toLowerCase().search(words.toLowerCase()) !== -1;
			}.bind(this));

		this.setState({search});
	}

	handleChangeInputValue(ref, value){
		(ref === 'friendNameInput')?this.refs.friendNameInput.setValue(value) :this.refs.changeAdmin.setValue(value);
	}


	handleSorted(e, selectedIndex, menuItem){
		e.preventDefault();
		this.setState({sorted: menuItem.text});
	}

	handleShowEdit(groupId){
		this.setState({groupId});
		this.refs.dialogEdit.show();
	}


	render(){
		const { sorted, groupId } = this.state;
		const key = (sorted.split(' ')[0] === 'Name')?'name':'date';
		const groups = (sorted === 'Sort By')
			?this.props.groups
			:sortArray(this.props.groups, key, sorted.split(' ')[1]);
		return (
			<section>
       			<SectionHeader title="GROUPS" openDialog={() => this.handleClickShowDialog('dialogAddGroup')} menuItems={menuItems} func={(e, selectedIndex, menuItem)=>this.handleSorted(e, selectedIndex, menuItem)}/>
       			<GroupSections groups={groups} friends={this.props.friends} user={this.props.user} that={this} />

				{(this.state.refToEdit !== '')?this.editGroup(this.state.refToEdit):''}

		    	<Dialog ref="dialogEdit" title="Edit Options">
					<List>
					  <ListItem primaryText="Edit Name" onClick={() => this.handleClickSetRefToEdit(groupId)} rightIcon={<span style={{color: '#6B6C72', paddingRight: '3em'}} className="glyphicon glyphicon-pencil"></span>}/>
					  <ListItem primaryText="Remove Group" onClick={() => this.handleClickRemoveGroup(groupId)}  rightIcon={<span style={{color: '#6B6C72', paddingRight: '3em'}} className="glyphicon glyphicon-remove"></span>}/>
					  <ListItem primaryText="Switch Admin" onClick={() => this.handleClickShowDialog('dialogAddFriend', groupId, true)}  rightIcon={<span style={{color: '#6B6C72', paddingRight: '3em'}} className="
	glyphicon glyphicon-refresh"></span>}/>
					</List>
				</Dialog>

		    	


				<Dialog className="addFriends"
						ref="dialogAddFriend"
						title={(this.state.admin === false)?'Add group friend':'Administration Transfering'}
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
														onTouchTap={() => this.handleChangeInputValue('friendNameInput', friend.name)} />
												);
											}.bind(this))}
										</List>}
							</div>
						</div>
						<p className="error" style={{color: 'red'}}>{this.state.error}</p>
					</div>
				</Dialog>

				<Dialog ref="dialogAddGroup" title="Add Group" actions={this.applyParamsToArray('dialogAddGroup')}>
					<p>Group's name: </p>
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
	user: PropTypes.object,
	groups: PropTypes.array,
	friends: PropTypes.array,
	onChangeGroupAdmin: PropTypes.func,
	onshowGroupFriends: PropTypes.func,
	onRemoveGroup: PropTypes.func,
	onEditGroup: PropTypes.func,
	onAddGroup: PropTypes.func,
	onAddGroupFriend: PropTypes.func
};
