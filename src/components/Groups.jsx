import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { FlatButton, Dialog, TextField, ListItem, List, Avatar } from 'material-ui';
import { arrayPositionByObjectKey, getIdByOtherKey, avatarLetter, sortArray, menuItems } from '../utils/functions';
import SectionHeader from './SectionHeader';
import GroupEditList from './GroupEditList';
import GroupsList from './GroupsList';


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
			openEdit: false
		};
	}

	/* Dialog functions */

	handleClickDismissDialog(e, ref){
		e.preventDefault();
		this.setState({id: '', search: []});
		(ref === 'dialogAddGroup')?this.refs.dialogAddGroup.dismiss():this.refs.dialogAddFriend.dismiss();
	}

	handleClickShowDialog(ref, id){
		this.setState({openEdit: false});
		if(arguments[3]) this.setState({admin: true});
		this.setState({id, search: []});
		(ref === 'dialogAddGroup')?this.refs.dialogAddGroup.show():this.refs.dialogAddFriend.show();
		(ref === 'dialogAddGroup')?this.refs.dialogAddGroup.addEventListener('focusin', function(e){
					this.setKeywords(e);
				})
				:document.addEventListener('focus', function(e){
					this.setKeywords(e);
				});

	}

	setKeywords(e){
		if(e.keyCode === 13){
			this.handleClickAdd(e, ref);
		}
		if(e.keyCode === 27){
			this.handleClickDismissDialog(e, ref);
		}
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
	handleClickRemoveGroup(id){
		this.setState({openEdit: false});
		this.props.onRemoveGroup(id);
	}

	/* Editting groups*/
	handleClickSetRefToEdit(id){
		this.setState({openEdit: false});
		this.setState({refToEdit: id});
	}

	handleClickEditGroup(ref, value){
		this.props.onEditGroup(ref, value);
		this.handleHideEdit();
	}

	editGroup(ref){
		const pos = arrayPositionByObjectKey('id', ref, this.props.groups);
		return (<Dialog ref="dialogEditName" title="Edit Name" defaultOpen>
					<TextField
						ref = "groupEdit"
						hintText={this.props.groups[pos]['name']}
						underlineStyle={{borderColor:'blue'}}
						/>
					<FlatButton label="Cancelar" onClick={() => this.handleHideEdit()}/>
					<FlatButton label="Editar" onClick={() => this.handleClickEditGroup(ref, this.refs.groupEdit.getValue())}/>
				</Dialog>);
	}

	handleHideEdit(){
		this.setState({refToEdit: ''});
	}

	/* Admin tranfer */
	handleChangeGroupAdmin(id){
		this.setState({openEdit: false});
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

	handleShowEdit(e, groupId){
		e.preventDefault();
		this.setState({groupId, openEdit: true});
	}

	render(){
		const { sorted, groupId, openEdit } = this.state;
		const key = (sorted.split(' ')[0] === 'Name')?'name':'date';
		/*const groups = (sorted === 'Sort By')
				?this.props.groups 
				:sortArray(this.props.groups, key, sorted.split(' ')[1]);*/
		return (
			<section>
       			<SectionHeader title="GROUPS" menuItems={menuItems} func={(e, selectedIndex, menuItem)=>this.handleSorted(e, selectedIndex, menuItem)}/>
				<GroupsList groups={this.props.groups} friends={this.props.friends} user={this.props.user}
							that={this}/>

				{(this.state.refToEdit !== '')?this.editGroup(this.state.refToEdit):''}
				<br/>
				<div className="addGroup"><FlatButton label="Create Group" primary onClick={() => this.handleClickShowDialog('dialogAddGroup')}/></div>

				{(this.state.listToShow !== 0)
					 ?<div className="col-md-12 center">
			          <a onClick={() => this.openDialog()} style={{cursor: 'pointer'}} >
			            <img src={'http://waxpoetics.com/wp-content/themes/records-waxpoetics/images/newicons4/plus.png'} width="30" height="30"/>
			          </a>
			        </div>
			        : ''
		    	}
										 
		    	{(!openEdit)?'' :<GroupEditList 
		    		   editName={() => this.handleClickSetRefToEdit(groupId)} 
					   removeGroup={() => this.handleClickRemoveGroup(groupId)} 
					   switchAdmin={() => this.handleClickShowDialog('dialogAddFriend', groupId, true)}
					   open={openEdit} />}



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
