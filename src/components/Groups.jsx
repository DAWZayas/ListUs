import React, { Component, PropTypes } from 'react';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import { FlatButton, Dialog, TextField, ListItem, List, Avatar } from 'material-ui';
import { arrayPositionByObjectKey, avatarLetter, sortArray } from '../utils/functions';
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
			groupId: '',
			loading: true,
			count: 0,
			dialog: {
				dialogAddGroup: false,
				dialogAddFriend: false,
				dialogEdit: false,
				dialogEditName: true
			}
		};
	}

	componentWillMount() {
	    this.props.registerListeners();
	}

	componentWillReceiveProps(){
		let count = this.state.count+1;
		this.setState({ count });
		( this.state.count === 2) ? this.setState({ loading: false, count: 0 }) :'';
	}

	componentWillUnmount() {
	    this.props.unregisterListeners();
	}

	/* Dialog functions */

	handleClickDismissDialog(ref){
		this.setState({id: '', search: [], error: ''});
		(ref === 'dialogAddGroup')? this.setState({dialog: Object.assign(this.state.dialog, {dialogAddGroup: false})}) 
				:this.setState({dialog: Object.assign(this.state.dialog, {dialogAddFriend: false})});
	}

	handleClickShowDialog(ref, id){
		this.setState({dialog: Object.assign(this.state.dialog, {dialogEdit: false})});
		if(arguments.length === 3) this.setState({admin: true});
		this.setState({id, search: []});
		(ref === 'dialogAddGroup')?this.setState({dialog: Object.assign(this.state.dialog, {dialogAddGroup: true})})
				:this.setState({dialog: Object.assign(this.state.dialog, {dialogAddFriend: true})});
	}


	/* Add group or friend */
	applyParamsToArray(ref){
		return [
			<FlatButton label="Cancel" secondary onClick={() =>this.handleClickDismissDialog(ref)} />,
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
			pos = arrayPositionByObjectKey('name', name, this.props.friends.friends);
			this.addFriendNonExistent(e, pos, name);
		}
	}

	addGroupNonExistent(e, pos, name){
		if(pos !== -1) this.setState({error: 'Group\'s name already exists.'});
		else{
			//this.props.onAddGroup(name, this.props.user.id);
			this.props.addGroup(name);
			this.setState({error: '', search: []});
			this.handleClickDismissDialog('dialogAddGroup');
		}
	}

	addFriendNonExistent(e, pos){
		const friends = this.props.friends.friends;
		if(pos === -1) this.setState({error: 'None of your friends matches with that name'});
		else{
			const friendName = friends[pos]['name'];
			if(this.state.admin === false){
				this.props.addGroupFriend(friendName, this.state.id);
			}
			else this.props.changeGroupAdmin(friendName, this.state.id, this.props.user.name);
			this.setState({error: ''});
			this.handleClickDismissDialog('dialogAddFriend');
		}
	}

	/* Remove group */
	handleClickRemoveGroup(id){
		this.setState({dialog: Object.assign(this.state.dialog, {dialogEdit: false})});
		this.props.removeGroup(id);
	}

	/* Editing groups*/
	handleClickSetRefToEdit(id){
		this.setState({dialog: Object.assign(this.state.dialog, {dialogEdit: false})});
		setTimeout(() => this.setState({refToEdit: id}), 2);
	}

	handleClickEditGroup(ref, value){
		const fixedValue = value.trim();
		if(arrayPositionByObjectKey('name', fixedValue, this.props.groups) === -1 && fixedValue !== ''){
			this.props.editGroup(ref, fixedValue);
			this.handleHideEditName();
		}
		else this.setState({error: 'Group\'s name already exists.'});
	}

	editDialogActions(ref){
		return [
			<FlatButton label="Cancel" secondary onClick={() => this.handleHideEditName()}/>,
			<FlatButton label="Edit" primary onClick={() => this.handleClickEditGroup(ref, this.refs.groupEdit.getValue())}/>
		];
	}

	editGroup(ref){
		const pos = arrayPositionByObjectKey('id', ref, this.props.groups);
		return (<Dialog ref="dialogEditName" open={this.state.dialog.dialogEditName} title="Edit Name" defaultOpen actions={this.editDialogActions(ref)} onRequestClose={() => this.handleHideEditName()}>
					<TextField
						ref = "groupEdit"
						hintText={this.props.groups[pos]['name']}
						underlineStyle={{borderColor:'blue'}}
						/>
					{(this.state.error === '')?'' :<p style={{color: 'red'}}>{this.state.error}</p>}
				</Dialog>);
	}

	handleHideEditName(){
		if(this.state.error !== '') this.setState({error: ''});
		this.setState({refToEdit: ''});
	}

	/* Admin tranfer */
	handleChangeGroupAdmin(id){
		this.changeGroupAdmin(this.refs.changeAdmin.value, id);
	}


	/* Dialog matches*/
	searchingMatch(e){
		e.preventDefault();
		const words = (this.refs.groupNameInput)?this.refs.groupNameInput.getValue():this.refs.friendNameInput.getValue();
		const array = (this.refs.groupNameInput)?this.props.groups :this.props.friends.friends;
		const search = array.filter(function(object){
				return object.name.toLowerCase().search(words.toLowerCase()) !== -1;
			}.bind(this));

		this.setState({search});
	}

	handleChangeInputValue(ref, value){
		(ref === 'friendNameInput')?this.refs.friendNameInput.setValue(value) :this.refs.changeAdmin.setValue(value);
	}


	handleSorted(e, index, value){
		e.preventDefault();
		this.setState({sorted: value});
	}

	handleShowEdit(groupId){
		this.setState({groupId});
		this.setState({dialog: Object.assign(this.state.dialog, {dialogEdit: true})});
	}

	handleHideEdit(){
		this.setState({dialog: Object.assign(this.state.dialog, {dialogEdit: false})});
	}



	render(){
		const { sorted, groupId } = this.state;
		const key = (sorted.split(' ')[0] === 'Name')?'name':'date';
		const groups = (sorted === 'Sort By')
			?this.props.groups
			:sortArray(this.props.groups, key, sorted.split(' ')[1]);
		const posGroup = arrayPositionByObjectKey('id', groupId, this.props.groups);

		return (
			<section>
       			<SectionHeader title="GROUPS" openDialog={() => this.handleClickShowDialog('dialogAddGroup')} func={(e, index, value)=>this.handleSorted(e, index, value)}/>
       			<GroupSections groups={groups} friends={this.props.friends.friends} user={this.props.user} Group={this} showGroupFriends={this.props.showGroupFriends}/>

				{(this.state.refToEdit !== '')?this.editGroup(this.state.refToEdit):''}

		    	<Dialog ref="dialogEdit" open={this.state.dialog.dialogEdit} title="Edit Options" onRequestClose={() => this.handleHideEdit()}>
					<List>
					  <ListItem primaryText="Edit Name" onClick={() => this.handleClickSetRefToEdit(groupId)} rightIcon={<span style={{color: '#6B6C72', paddingRight: '3em'}} className="glyphicon glyphicon-pencil"></span>}/>
					  {(posGroup !== -1)
					  	?(this.props.groups[posGroup].administrator.indexOf(this.props.user.name) !== -1)
					  			?<ListItem primaryText="Remove Group" onClick={() => this.handleClickRemoveGroup(groupId)}  rightIcon={<span style={{color: '#6B6C72', paddingRight: '3em'}} className="glyphicon glyphicon-remove"></span>}/>
					  			:''
					  	:''}
					  {(posGroup !== -1)
					  	?(this.props.groups[posGroup].administrator.indexOf(this.props.user.name) !== -1)
					  			?<ListItem primaryText="Switch Admin" onClick={() => this.handleClickShowDialog('dialogAddFriend', groupId, true)}  rightIcon={<span style={{color: '#6B6C72', paddingRight: '3em'}} className="
	glyphicon glyphicon-refresh"></span>}/>
								:''
						:''}
					</List>
				</Dialog>


				<Dialog className="addFriends"
						open={this.state.dialog.dialogAddFriend}
						ref="dialogAddFriend"
						title={(this.state.admin === false)?'Add group friend':'Administration Transfering'}
						actions={this.applyParamsToArray('dialogAddFriend')}
						onRequestClose={() => this.handleClickDismissDialog('dialogAddFriend')}
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
														onClick={() => this.handleChangeInputValue('friendNameInput', friend.name)} />
												);
											}.bind(this))}
										</List>}
							</div>
						</div>
						<p className="error" style={{color: 'red'}}>{this.state.error}</p>
					</div>
				</Dialog>

				<Dialog ref="dialogAddGroup" open={this.state.dialog.dialogAddGroup} title="Add Group" actions={this.applyParamsToArray('dialogAddGroup')} onRequestClose={() => this.handleClickDismissDialog('dialogAddGroup')}>
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
	friends: PropTypes.object,
	editGroup: PropTypes.func,
	onRemoveGroupFriend: PropTypes.func,
	removeGroup: PropTypes.func,
	changeGroupAdmin: PropTypes.func,
	addGroupFriend: PropTypes.func,
	showGroupFriends: PropTypes.func,
	addGroup: PropTypes.func,
	registerListeners: PropTypes.func,
	unregisterListeners: PropTypes.func

};
