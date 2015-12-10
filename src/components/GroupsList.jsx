import React, { Component, PropTypes } from 'react';
import { AppBar, FlatButton } from 'material-ui';
import { groupFriends } from '../utils/functions';

export default class GroupsList extends Component{
	constructor(props){
		super(props);
	}

	render(){
		const { groups, friends, user, that } = this.props;
		return (<div>
			{(groups.length !== 0)?groups.map(function(group){
						return (
							<div key={group['id']}>
								<AppBar 
										title={group['name']}
										className="listGroups"
										iconElementRight={<div className="deleteEdit">
											<button type="button" className="btn btn-default" onClick={() =>that.handleShowEdit(group['id'])} style={{height: '35px'}}> 
												<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
											</button>
										</div>
										}
										onLeftIconButtonTouchTap={e => that.handleClickShowGroupFriends(e, group['id'])}
										style={{backgroundColor: '#AAADBD'}}

								/>
		 						{(group['showFriends']===true)?<div>
												{groupFriends(group['friends'], group['id'], friends, user.id)}
												<div style={{display: 'flex', justifyContent: 'flex-end'}}>
													<FlatButton label=" +Friend" primary onClick={() => that.handleClickShowDialog('dialogAddFriend', group['id'])}/>
												</div>
											</div>
										  :''}
	 						</div>
	 					);
					}.bind(that))
					: 'No groups created.'}
				</div>);
	}


}

GroupsList.propTypes = {
	groups: PropTypes.array,
	friends: PropTypes.array,
	user: PropTypes.object,
	that: PropTypes.object
};