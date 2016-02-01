import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, AppBar, FlatButton } from 'material-ui';
import GroupFriends from './GroupFriends';
import Spinner from './Spinner';



export default class GroupSections extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			count: 0
		};
	}

	componentWillReceiveProps(){
		let count = this.state.count+1;
		this.setState({ count });
		( this.state.count === 3) ?this.setState({ loading: false, count: 0 }) :'';
	}


	handleClickShowGroupFriends(id){
		this.props.showGroupFriends(id);
	}



	groupsList(groups, friends, user, Group, GroupSection){
		return (<div>
			{(groups.length !== 0)
				? groups.map(function(group){
						return (
							<div key={group['id']}>
								<AppBar 
										title={group['name']}
										className="listGroups"
										iconElementRight={<div className="deleteEdit">
											<button type="button" className="btn btn-default" onClick={() =>Group.handleShowEdit(group['id'])} style={{height: '35px'}}> 
												<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
											</button>
										</div>
										}
										onLeftIconButtonTouchTap={() => GroupSection.handleClickShowGroupFriends(group['id'])}
										style={{backgroundColor: '#7394D5', paddingLeft: '50px', paddingRight: '40px'}}

								/>
		 						{(group['showFriends']===true)?<div>
												<GroupFriends friendsName={group['friends'] || []} idGroup={group['id']} friends={friends || []} userName= {user.name} Group={Group} />
												<div style={{display: 'flex', justifyContent: 'flex-end'}}>
													<FlatButton label=" +Friend" primary style={{color: 'red', borderRadius: '10'}} onClick={() => Group.handleClickShowDialog('dialogAddFriend', group['id'])}/>
												</div>
											</div>
										  :''}
	 						</div>
	 					);
					}.bind(Group))
					: ( this.state.loading ) ?<Spinner /> :<h3 style={{paddingLeft: '2em', fontStyle: 'italic'}}>No groups</h3>}
				</div>);
	}

	groupsOwnAdmin(groups, userName){
		return groups.filter(group => group.administrator === userName);
	}

	groupsNoAdmin(groups, userName){
		return groups.filter(group => group.administrator !== userName);
	}

	
	render(){
		const { groups, friends, user, Group } = this.props;
		return (
			<Tabs inkBarStyle={{backgroundColor: '#333399', height: '2px'}}>
			  <Tab ref="total" label="Total Groups" value="totalGroups" style={{backgroundColor: 'white', color: 'grey', borderColor: 'green'}}
			  	>
			    {this.groupsList(groups, friends, user, Group, this)}
			  </Tab>
			  <Tab label="Administrated Groups" value="adminGroups" style={{backgroundColor: 'white', color: 'grey'}}>
			  	{this.groupsList(this.groupsOwnAdmin(groups, user.name), friends, user, Group, this)}
			  </Tab>
			  <Tab label="Non-Administrated Groups" value="noAdminGroups" style={{backgroundColor: 'white', color: 'grey'}}>
			  	{this.groupsList(this.groupsNoAdmin(groups, user.name), friends, user, Group, this)}
			  </Tab>
			</Tabs>
		);

	}

}

GroupSections.propTypes = {
	groups: PropTypes.array,
	friends: PropTypes.array,
	user: PropTypes.object,
	Group: PropTypes.object,
	showGroupFriends: PropTypes.func
};