import { Avatar } from 'material-ui';
import React from 'react';

export function arrayPositionByObjectKey(key, value, array){
	for(let i=0; i<array.length ; i++){
		if(array[i][key] === value) return i;
	}
	return -1;
}


export function cloneObject(obj){
	let newObj={};
	for(var key in obj){
		newObj[key] = obj[key].slice();
	}
	return newObj;
}

export function lastStringOfUrl(){
	const url = window.location+'';
	return url.split('/')[url.split('/').length-1];
}

export function getIdByOtherKey(key, value, array){
	return array[arrayPositionByObjectKey(key, value, array)]['id'];
}

export function avatarLetter(name, id){
	return <Avatar 
		key={id}
		className="avatarLetter">{name.slice(0, 1)}</Avatar>;
}

export function objIsEmpty(obj){
	for(let key in obj){
		return false;
	}
	return true;
}

/************************* GET USER INFO ***************************************/

export function getFriends(idFriends, serverUsers){
	let friends = [];
	idFriends.map(function(idFriend){
			const pos = arrayPositionByObjectKey('id', idFriend, serverUsers);
			if(pos !== -1){
				friends.push(
						{
							id: serverUsers[pos].id,
							name: serverUsers[pos].name,
							friends: (serverUsers[pos].visibility)?serverUsers[pos].friends:[],
							groups: (serverUsers[pos].visibility)?serverUsers[pos].groups:[],
							img: serverUsers[pos].img
						}
					);
			}
		}.bind(this)
	);
	return friends;
}

export function getGroups(idGroups, serverGroups){
	let groups = [];
	idGroups.map(function(idGroup){
			const pos = arrayPositionByObjectKey('idGroup', idGroup, serverGroups);
			if(pos !== -1) groups.push(serverGroups[pos]);					
		}.bind(this)
	);
	return groups;
}