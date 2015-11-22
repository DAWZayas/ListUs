import { Avatar } from 'material-ui';
import React from 'react';
import { serverUsers, serverGroups, serverLists, serverTasks } from './dataBase';

export function arrayPositionByObjectKey(key, value, array){
	for(let i=0; i<array.length ; i++){
		if(array[i][key] === value) return i;
	}
	return -1;
}

export function objsAllValuesMatch(key, arrayValues, obj){
	let objOneId= {};
	arrayValues.filter(function(value){
		for(let num in obj){
			if(obj[num][key] === value) objOneId[num] = obj[num];
		}
	}.bind(this));

	return objOneId;
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
	return (<Avatar 
		key={id}
		className="avatarLetter">{name.slice(0, 1)}</Avatar>);
}

export function objIsEmpty(obj){
	for(let key in obj){
		obj[key];
		return false;
	}
	return true;
}


/*********************** GROUP FUNCTIONS *************************************/

export function groupFriends(idFriends, idGroup, friends, idUser){
		const refer =  'fr'+idGroup;
		const idFriendsPure = idFriends.filter(idFriend => idFriend !== idUser);
		return (
			<div ref={refer} className="group-friends" >
				<img src={'https://upload.wikimedia.org/wikipedia/commons/3/38/UtR_arrow.svg'} width="30" />
				{idFriendsPure.map(function(idFriend){
					const pos = arrayPositionByObjectKey('id', idFriend, friends);
					const friend = (pos !== -1)?friends[pos] :{};
					return (friend['img'] !== '')
						?<img
							className="avatar"
							key={friend['id']}
							src={friend['img']}
							alt={friend['name']}
							width="50"/>
						:avatarLetter(friend['name'], friend['id']);
					}.bind(this))}
			</div>
		);
	}

/************************* GET USER INFO ***************************************/

export function getFriends(idFriends){
	let friends = [];
	idFriends.map(function(idFriend){
			const pos = arrayPositionByObjectKey('id', idFriend, serverUsers);
			if(pos !== -1){
				friends.push(
						{
							id: serverUsers[pos].id,
							name: serverUsers[pos].name,
							friends: (serverUsers[pos].visibility === true)?serverUsers[pos].friends:[],
							groups: (serverUsers[pos].visibility)?serverUsers[pos].groups:[],
							img: serverUsers[pos].img
						}
					);
			}
		}.bind(this)
	);
	return friends;
}

export function getGroups(idGroups){
	let groups = [];
	idGroups.map(function(idGroup){
			const pos = arrayPositionByObjectKey('id', idGroup, serverGroups);
			if(pos !== -1) groups.push(serverGroups[pos]);					
		}.bind(this)
	);
	return groups;
}

export function getLists(user){
	const idUser = serverUsers[arrayPositionByObjectKey('name', user, serverUsers)].id;
	let lists = [];
	serverLists.map(function(serverList){
			if(serverList.participants.indexOf(idUser) !== -1){
				lists.push(serverList.id);
			}
		}.bind(this)
	);
	return lists.map(function(idList){
		return serverLists[arrayPositionByObjectKey('id', idList, serverLists)];
	}.bind(this));
}

export function getTasks(userLists){
	const arrayValues = userLists.map(function(list){
		return list.id;
	}.bind(this));
	var s=objsAllValuesMatch('idList', arrayValues, serverTasks);
	return s;
}



/********************** SORTED ARRAY ******************************/

export function sortArray(array, key, direction){
	var titles = array.map(function(obj){
			return obj[key];
		}.bind(this)
	).sort(function (a, b) {
    	return a.toLowerCase().localeCompare(b.toLowerCase());
	});
	if(direction === 'Descendant') titles.reverse();
	return titles.map(function(title){
		return array[arrayPositionByObjectKey(key, title, array)];
	}.bind(this));
}



/***************************/

export const menuItemsDate = [
		   { payload: '0', text: 'Sort By' },
		   { payload: '1', text: 'Name Ascendant' },
		   { payload: '2', text: 'Name Descendant' },
		   { payload: '3', text: 'Date Ascendant' },
		   { payload: '4', text: 'Date Aescendant' }		   
		];
export const menuItems = [
		   { payload: '0', text: 'Sort By' },
		   { payload: '1', text: 'Name Ascendant' },
		   { payload: '2', text: 'Name Descendant' }	   
		];