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

export function avatarLetter(name){
	return <Avatar className="avatarLetter">{name.slice(0,1)}</Avatar>;
}