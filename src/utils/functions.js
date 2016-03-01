import { Avatar } from 'material-ui';
import React from 'react';

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

export function avatarLetter(name){
	return (<Avatar
		key={name}
		className="avatarLetter"
		style={{position: 'absolute'}}>
			{name.slice(0, 1)}
		</Avatar>);
}

export function objIsEmpty(obj){
	for(let key in obj){
		obj[key];
		return false;
	}
	return true;
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
		   { payload: '1', text: 'Date Ascendant' },
		   { payload: '2', text: 'Date Descendant' }
		];
export const menuItems = [
		   { payload: '0', text: 'Sort By' },
		   { payload: '1', text: 'Name Ascendant' },
		   { payload: '2', text: 'Name Descendant' }
		];



/*** GET DAY ***/

export function getActualDate(){
  const today = new Date();
  const yyyy = today.getFullYear();
  const dd = today.getDate()<10 ? '0' + today.getDate() : today.getDate();
  const mm = today.getMonth()+1<10 ? '0' + today.getMonth()+1 : today.getMonth()+1;
  const minutes = today.getMinutes();
  const hour = today.getHours();
  return hour + ':' + minutes + ' ~ ' + dd + '/' + mm + '/' + yyyy;
}


export const countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas'
		, 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands'
		, 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica'
		, 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea'
		, 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana'
		, 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India'
		, 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia'
		, 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania'
		, 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia'
		, 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal'
		, 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles'
		, 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan'
		, 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor L"Este', 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia'
		, 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)'
		, 'Yemen', 'Zambia', 'Zimbabwe'];