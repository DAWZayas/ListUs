import React from 'react';
import { avatarLetter, arrayPositionByObjectKey } from '../utils/functions';

export default class GroupFriends extends React.Component {

	constructor(props) {
    	super(props);
 	}

 	handleRemoveGroupFriend(idFriend, idGroup, Group){
		Group.props.removeGroupFriend(idFriend, idGroup);
	}

 	
	render() {
		const { idFriends, idGroup, friends, idUser, Group } = this.props;
		const refer =  'fr'+idGroup;
		const idFriendsPure = idFriends.filter(idFriend => idFriend !== idUser);
		return (
			<div ref={refer} className="group-friends" >
				<img src={'https://upload.wikimedia.org/wikipedia/commons/3/38/UtR_arrow.svg'} width="30" />
				{(idFriendsPure.length !== 0)?idFriendsPure.map(function(idFriend){
					const pos = arrayPositionByObjectKey('id', idFriend, friends);
					const friend = (pos !== -1)?friends[pos] :{};
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
									{(Group.props.groups[arrayPositionByObjectKey('id', idGroup, Group.props.groups)].administrator === '0') ?<img style={{width: '13', height: '13', background: 'coral', borderRadius: '10'}} src="http://wiki.guildwars.com/images/1/1d/Cross_grey_200.png" onClick={() => this.handleRemoveGroupFriend(idFriend, idGroup, Group)} /> :''}
								</div>
							</div>
						</a>
						:<a style={{cursor: 'pointer', position: 'relative', width: '50', height: '31'}} >
							{avatarLetter(friend['name'], friend['id'])}
							<div className="avatar" style={{position: 'absolute'}}>
								<div style={{display: 'flex', justifyContent: 'flex-end'}}>
									{(Group.props.groups[arrayPositionByObjectKey('id', idGroup, Group.props.groups)].administrator === '0') ?<img style={{width: '13', height: '13', background: 'coral', borderRadius: '10'}} src="http://wiki.guildwars.com/images/1/1d/Cross_grey_200.png" onClick={() => this.handleRemoveGroupFriend(idFriend, idGroup, Group)}/> :''}
								</div>
							</div>
						</a>;
					}.bind(this))
				: <h3 style={{fontStyle: 'italic'}}>No friends</h3>}
			</div>
		);
	}
}


GroupFriends.contextTypes = {
  idFriends: React.PropTypes.string,
  idGroup: React.PropTypes.string,
  friends: React.PropTypes.object,
  idUser: React.PropTypes.object,
  that: React.PropTypes.object,
};
