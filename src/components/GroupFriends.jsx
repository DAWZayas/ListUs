import React from 'react';
import { avatarLetter, arrayPositionByObjectKey } from '../utils/functions';

export default class GroupFriends extends React.Component {

	constructor(props) {
    	super(props);
 	}

 	handleRemoveGroupFriend(friendName, idGroup, Group){
		Group.props.removeGroupFriend(friendName, idGroup);
	}

 	
	render() {
		const { friendsName, idGroup, friends, userName, Group } = this.props;
		const refer =  'fr'+idGroup;
		const friendsNamePure = friendsName.filter(friendName => friendName !== userName);
		return (
			<div ref={refer} className="group-friends" >
				<img src={'https://upload.wikimedia.org/wikipedia/commons/3/38/UtR_arrow.svg'} width="30" />
				{(friendsNamePure.length !== 0)?friendsNamePure.map(function(friendName){
					const pos = arrayPositionByObjectKey('name', friendName, friends);
					const friend = (pos !== -1) ?friends[pos] :{}; 
					return (friend['img'] !== '')
						?<a title={friend['name']} style={{cursor: 'pointer', position: 'relative', width: '50', height: '31'}} >
							<img
								style={{position: 'absolute'}}
								className="avatar"
								key={friend['id']}
								src={friend['img']}
								alt={friend['name']}
								/>
							<div className="avatar" style={{position: 'absolute'}}>
								<div style={{display: 'flex', justifyContent: 'flex-end'}}>
									{(Group.props.groups[arrayPositionByObjectKey('id', idGroup, Group.props.groups)].administrator === userName) 
										?<img style={{width: '13', height: '13', background: 'coral', borderRadius: '10'}} 
											src="http://wiki.guildwars.com/images/1/1d/Cross_grey_200.png" 
											onClick={() => this.handleRemoveGroupFriend(friendName, idGroup, Group)} /> 
										:''
									}
								</div>
							</div>
						</a>
						:<a style={{cursor: 'pointer', position: 'relative', width: '50', height: '31'}} >
							{avatarLetter(friend['name'])}
							<div className="avatar" style={{position: 'absolute'}}>
								<div style={{display: 'flex', justifyContent: 'flex-end'}}>
									{(Group.props.groups[arrayPositionByObjectKey('id', idGroup, Group.props.groups)].administrator === userName) 
										?<img style={{width: '13', height: '13', background: 'coral', borderRadius: '10'}} 
											src="http://wiki.guildwars.com/images/1/1d/Cross_grey_200.png" 
											onClick={() => this.handleRemoveGroupFriend(friendName, idGroup, Group)}/> 
										:''
									}
								</div>
							</div>
						</a>;
					}.bind(this))
				: <h3 style={{fontStyle: 'italic'}}>No friends</h3>}
			</div>
		);
	}
}


GroupFriends.propTypes = {
  friendsName: React.PropTypes.array,
  idGroup: React.PropTypes.string,
  friends: React.PropTypes.object,
  userName: React.PropTypes.object,
  Group: React.PropTypes.object,
};
