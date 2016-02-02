import React, { Component, PropTypes } from 'react';
import { Dialog, Avatar, List, ListItem, TextField, Toggle, FlatButton, Slider } from 'material-ui';
import DatePicker from 'react-datepicker';
let moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');

export default class ListsEdit extends Component{
	constructor(props){
		super(props);
		this.state={
			showDialogList: false,
			showDialogEdit: false,
			showDialogRemove: false,
			showDialogAddFriendsAndGroups: false,
			showDialogAddFriendsAndGroupsList: false,
			startDate: moment(),
			newParticipant: {},
      toggleFriend: true,
      toggleGroup: true,
      textToSearch: ''
		};
	}



	componentWillMount() {
		this.setState({
			startDate: moment(this.props.list.date, 'DD/MM/YYYY')
		});
  }

	/* EDIT LIST */

	changeImportance(){
    const value = this.refs.slider.getValue();
    this.refs.importance.setValue(Math.ceil(value/0.2));
  }

	onClickEdit(){
    const { list, onEditList } = this.props;
    const id = list.id;
    const title = this.refs.titleDialog.getValue();
    const date = this.state.startDate.format('DD/MM/YYYY');
    const importance = Math.ceil(this.refs.slider.getValue()/0.2);
    if(this.validationTitle(title)) onEditList(id, title, list.date, date, importance);
		this._handleCloseDialog();
  }

	handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  validationTitle(title){
    const { lists, list } = this.props;
    return title!=='' && lists.filter( list => list.title===title).length===0 || title===list.title;
  }

	/* dialogs */


	handleOpenListDialog(){
		this.setState({showDialogList: true});
	}

	handleOpenEditDialog(){
		this.setState({showDialogList: false, showDialogEdit: true});
	}

	handleOpenRemoveDialog(){
		this.setState({showDialogList: false, showDialogRemove: true});
	}

	handleOpenFriendsAndGroupsDialog(){
		this.setState({showDialogList: false, showDialogAddFriendsAndGroups: true});
	}

	handleOpenFriendsAndGroupsListDialog(){
		this.setState({showDialogList: false, showDialogAddFriendsAndGroupsList: true});
	}

	_handleCloseDialogList(){
		this.setState({showDialogList: false});
	}

	_handleCloseDialog(){
		this.setState({showDialogEdit: false,
		showDialogRemove: false,
		showDialogAddFriendsAndGroups: false,
		showDialogAddFriendsAndGroupsList: false,
		newParticipant: {},
		textToSearch: ''});
	}

	/* FRIENDS AND GROUPS */

	clearTextField(){
    this.refs.textField.setValue('');
		this.setState({
			newParticipant: {},
			textToSearch: ''
		});
  }

  handleOnToggleFriend(){
    this.setState({ toggleFriend: !this.state.toggleFriend});
  }

  handleOnToggleGroup(){
    this.setState({toggleGroup: !this.state.toggleGroup});
  }

	isInTheArrayFriend(nameParticipants, list){
		if(list.participantsFriends[0]===undefined ){
			return false;
		}
    return this.props.list.participantsFriends[0].indexOf(nameParticipants.name)!==-1;
  }

	isInTheArrayGroup(nameParticipants, list){
		if( list.participantsGroups[0]===undefined ){
			return false;
		}
		return this.props.list.participantsGroups[0].indexOf(nameParticipants.name)!==-1;
	}

  handleOnChangeTextField(){
    const textToSearch = this.refs.textField.getValue().toLowerCase();
    this.setState({textToSearch: textToSearch});
  }


  handleOnClickListParticipant(e, participant){
    e.stopPropagation();
    this.refs.textField.setValue(participant.name);
    this.setState({
      newParticipant: participant,
      textToSearch: participant.name
    });
  }

  handleOnClickAddFriendGroupToList(e){
    e.stopPropagation();
    const { list, onAddFriendGroupToList } = this.props;
    Object.keys(this.state.newParticipant).length===0 || this.isInTheArrayFriend(this.state.newParticipant.name, list) || this.isInTheArrayGroup(this.state.newParticipant.name, list) ? '' : onAddFriendGroupToList(list, this.state.newParticipant);
		this.clearTextField();
		this._handleCloseDialog();
	}

	setImg(participant){
    return participant.img !== '' ? <Avatar className="avatarFriendAndGroups" src={participant.img}/> : <Avatar className="avatarFriendAndGroups ">{participant.name.substring(0, 1).toUpperCase()}</Avatar>;
  }

/* REMOVE LIST */
	onClickRemove(){
		const { list, removeList} = this.props;
		removeList(list);
		this._handleCloseDialog();
	}
/* REMOVE PARTICIPANT FROM LIST */
	handleOnRemoveFriendGroupToList(newParticipant){
		const { onRemoveFriendGroupToList, list } = this.props;
		onRemoveFriendGroupToList(list.id, newParticipant);
	}
/**/
	removeUndefinedFromArrays(arr){
			return arr.filter(item => item!==undefined);
	}

	render(){

		let { list, friends, groups } = this.props;


		let listOfFriendsAndGroups = [];

		let listOfParticipants =[];

		if(list!==undefined && friends!==undefined && groups!==undefined){
			if(this.state.textToSearch!=='' && friends!==undefined && groups!==undefined){
				const listFriends = this.state.toggleFriend ? friends.filter( friend => !this.isInTheArrayFriend(friend, list) ) : [];
				const listGroups = this.state.toggleGroup ? groups.filter( group => !this.isInTheArrayFriend(group, list) ) : [];
				listOfFriendsAndGroups = this.removeUndefinedFromArrays(listFriends).concat( this.removeUndefinedFromArrays(listGroups)).filter( item=> item.name.toLowerCase().search(this.state.textToSearch) !== -1);
			}
			if(list.participantsGroups[0]!==undefined){//si esta vacia los participants list.participants[0]===undefined
				let listOfGroupsInParticipants = list.participantsGroups[0].map( nameParticipant => groups.filter( function(group){
					if(nameParticipant===group.name){
						return group;
					}
				})[0]);

				listOfGroupsInParticipants = this.removeUndefinedFromArrays(listOfGroupsInParticipants);
				listOfParticipants = listOfParticipants.concat(listOfGroupsInParticipants);
			}

			if(list.participantsFriends[0]!==undefined){
				let listOfFriendsInParticipants = list.participantsFriends[0].map( nameParticipant => friends.filter( function(friend){
					if(nameParticipant===friend.name){
						return friend;
					}
				})[0]);
				listOfFriendsInParticipants = this.removeUndefinedFromArrays(listOfFriendsInParticipants);
				listOfParticipants = listOfParticipants.concat(listOfFriendsInParticipants);
			}
				//add user if isn't admin for remove list from his lists
				listOfParticipants = list.admin.indexOf(this.props.user.name)===-1 ? listOfParticipants.concat(this.props.user) : listOfParticipants;

			}


		let customActions = [
		  <FlatButton
		    label="Exit"
		    secondary
		    onTouchTap={() => this._handleCloseDialogList()} />
		];
		let customActionsManage = [
		  <FlatButton
		    label="Exit"
		    secondary
		    onTouchTap={() => this._handleCloseDialog()} />
		];
		let customActionsEdit = [

	      <FlatButton
	        label="Cancel"
	        secondary
	        onClick={() => this._handleCloseDialog()} />,
	      <FlatButton
	        label="Edit"
	        primary
	        onClick={() => this.onClickEdit()} />
	    ];
		let customActionsRemove = [
			<FlatButton
	        label="Cancel"
	        secondary
	        onClick={() => this._handleCloseDialog()} />,
	      <FlatButton
	        label="Remove"
	        primary
	        onClick={() => this.onClickRemove()} />
			];
			let customActionsAddFriendsAndGroups = [
				<FlatButton
	        label="Cancel"
	        secondary
	        onClick={() => this._handleCloseDialog()} />,
	      <FlatButton
	        label="Add"
	        primary
	        onClick={e => this.handleOnClickAddFriendGroupToList(e)} />
			];


		return (
			<div>
				<button type="button" className="glyphicon glyphicon-edit btn btn-default pull-right" onClick={()=>this.handleOpenListDialog()}> </button>
			<Dialog
				ref="dialogEditList"
				title="Edit Options"
				actions={customActions}
				open={this.state.showDialogList}
  			onRequestClose={this._handleCloseDialogList} >
				<List>
				  <ListItem primaryText="Edit List" onClick={() => this.handleOpenEditDialog()} />
				  {this.props.list.admin.indexOf(this.props.user.name)!==-1 ?
						<ListItem primaryText="Remove List" onClick={() => this.handleOpenRemoveDialog()} />
						: ''}
					<ListItem primaryText="Add Friends or Groups" onClick={() => this.handleOpenFriendsAndGroupsDialog()} />
					<ListItem primaryText="See the List of Friends and Groups" onClick={() => this.handleOpenFriendsAndGroupsListDialog()} />
				</List>
			</Dialog>

			<Dialog title="Edit List" open={this.state.showDialogEdit} actions={customActionsEdit} ref="dialogEdit" onRequestClose={this._handleCloseDialog}>
				<div style={{'display': 'flex', 'flexFlow': 'column'}}>
				<TextField ref="titleDialog" defaultValue={list.title} autoFocus />
				<div style={{'display': 'flex', 'justifyContent': 'flex-start'}}>
			<DatePicker
					dateFormat="DD/MM/YYYY"
					selected={this.state.startDate}
					onChange={this.handleChange.bind(this)}
					popoverAttachment="bottom center"
					popoverTargetAttachment="top center"
					popoverTargetOffset="0px 0px"
					 />
				 </div>
				<br/><h5 style={{width:'100px'}}>Importance</h5>
				<Slider name="slider" style={{width: '200px'}} ref="slider" max={0.8} step={0.20} onChange={this.changeImportance.bind(this)} />
				<TextField disabled style={{top: '-30px', width:'100px'}} ref="importance" defaultValue="0"/>
				</div>
			</Dialog>

			<Dialog title="Remove List" open={this.state.showDialogRemove} actions={customActionsRemove} ref="dialogRemove" onRequestClose={this._handleCloseDialog}>
				Are you sure to remove {list.title}?
			</Dialog>


	      <Dialog title="Add Friends and Groups to your list" open={this.state.showDialogAddFriendsAndGroups} actions={customActionsAddFriendsAndGroups} ref="dialogAddFriendsAndGroups" onRequestClose={this._handleCloseDialog}>

	        <div className="dialogFriendAndGroup" style={{padding: '20px'}}>

	          <Toggle
	            style={{width:100}}
	            name="Friends"
	            value="Friends"
	            label="Friends"
	            ref="friend"
	            onToggle={() => this.handleOnToggleFriend()}
	            defaultToggled />

	          <Toggle
	            style={{width:100}}
	            name="Groups"
	            value="Groups"
	            label="Groups"
	            ref="group"
	            onToggle={() => this.handleOnToggleGroup()}
	            defaultToggled />
						<ul>
							{
							listOfFriendsAndGroups.map( (item, index) => index<=8 && item.length!==0 ? <li style={{cursor: 'pointer'}} key={index} onClick={(e) => this.handleOnClickListParticipant(e, item)}><span>{this.setImg(item)}</span>{item.name}</li> : null)
							}
						</ul>
						<TextField ref="textField" hintText="Participant" onChange={ () => this.handleOnChangeTextField()}  />

	        </div>
				</Dialog>
				<Dialog title="" open={this.state.showDialogAddFriendsAndGroupsList} actions={customActionsManage} ref="dialogManage" onRequestClose={this._handleCloseDialog}>
					<div className="dialogFriendAndGroupManage" style={{padding: '20px'}}>
						<h4>Friends and Groups manage {list.title}</h4><br/>
						<ul >
							{
								listOfParticipants.length===0 ? '' :
									listOfParticipants.map( (item, index) => item!=='' && item!==undefined ?
										<li key={index}><span className={this.props.list.admin.indexOf(this.props.user.name)!==-1 || item.name===this.props.user.name ? 'deleteButtonFriendGroup glyphicon glyphicon-remove' : 'hiddenRemoveParticipant' } onClick={() =>
												 this.handleOnRemoveFriendGroupToList(item)}></span>{item.name} </li> : '')
							}
						</ul>
					</div>
				</Dialog>
			</div>
		);
	}


}

ListsEdit.propTypes = {
	lists: PropTypes.array,
	list: PropTypes.object,
	removeList: PropTypes.func,
	onEditList: PropTypes.func,
	friends: PropTypes.array,
  groups: PropTypes.array,
	onAddFriendGroupToList: PropTypes.func,
	onRemoveFriendGroupToList: PropTypes.func,
	user: PropTypes.object

};
