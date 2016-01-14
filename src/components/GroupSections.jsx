import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, AppBar, FlatButton } from 'material-ui';
import { groupFriends } from '../utils/functions';



export default class GroupSections extends Component{
	constructor(props){
		super(props);
	}

	groupsList(groups, friends, user, that){
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
										style={{backgroundColor: '#7394D5', paddingLeft: '50px', paddingRight: '40px'}}

								/>
		 						{(group['showFriends']===true)?<div>
												{groupFriends(group['friends'], group['id'], friends, user.id, that)}
												<div style={{display: 'flex', justifyContent: 'flex-end'}}>
													<FlatButton label=" +Friend" primary style={{color: 'red', borderRadius: '10'}} onClick={() => that.handleClickShowDialog('dialogAddFriend', group['id'])}/>
												</div>
											</div>
										  :''}
	 						</div>
	 					);
					}.bind(that))
					: <h3 style={{paddingLeft: '2em', fontStyle: 'italic'}}>No groups</h3>}
				</div>);
	}

	groupsOwnAdmin(groups){
		return groups.filter(group => group.administrator === this.props.user.id);
	}

	groupsNoAdmin(groups){
		return groups.filter(group => group.administrator !== this.props.user.id);
	}

	render(){
		const { groups, friends, user, that } = this.props;

		return (
			<Tabs inkBarStyle={{backgroundColor: '#333399', height: '2px'}}>
			  <Tab ref="total" label="Total Groups" value="totalGroups" style={{backgroundColor: 'white', color: 'grey', borderColor: 'green'}}
			  	>
			    {this.groupsList(groups, friends, user, that)}
			  </Tab>
			  <Tab label="Administrated Groups" value="adminGroups" style={{backgroundColor: 'white', color: 'grey'}}>
			  	{this.groupsList(this.groupsOwnAdmin(groups), friends, user, that)}
			  </Tab>
			  <Tab label="Non-Administrated Groups" value="noAdminGroups" style={{backgroundColor: 'white', color: 'grey'}}>
			  	{this.groupsList(this.groupsNoAdmin(groups), friends, user, that)}
			  </Tab>
			</Tabs>
		);

	}

}

GroupSections.propTypes = {
	groups: PropTypes.array,
	friends: PropTypes.array,
	user: PropTypes.object,
	that: PropTypes.object
};