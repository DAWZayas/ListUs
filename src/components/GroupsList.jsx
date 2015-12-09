import React, { Component } from 'react';
import { AppBar, FlatButton } from 'material-ui';
import { groupFriends } from '../utils/functions';

export default class GroupsList extends Component{
	constructor(props){
		super(props);
	}

	render(){
		const { groups, friends, user, that } = this.props;
		return (<div style={{zIndex: 0}}>
			{(groups.length !== 0)?groups.map(function(group){
						return (
							<div key={group['id']}>
								<AppBar 
										title={group['name']}
										className="listGroups"
										iconElementRight={<div className="deleteEdit">
											<button type="button" className="btn btn-default" onClick={e=>that.handleShowEdit(e, group['id'])}> <span className="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
										</div>
										}
										onLeftIconButtonTouchTap={e => that.handleClickShowGroupFriends(e, group['id'])}

								/>
		 						{(group['showFriends']===true)?<div>
		 															{groupFriends(group['friends'], group['id'], friends, user.id)}
		 															<FlatButton label=" +Friend" primary onClick={() => that.handleClickShowDialog('dialogAddFriend', group['id'])}/>
		 														</div>
		 													  :''}
	 						</div>
	 					);
					}.bind(that))
					: 'No groups created.'}
				</div>);
	}


}