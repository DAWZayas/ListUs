import { expect } from 'chai';
import groupsReducer from '../../src/reducers/groups';
import { addGroup, editGroup, removeGroup, showGroupFriends, addFriendGroup } from '../../src/actions';
import { groups } from '../../src/utils/examples';

describe('GROUP_TEST', () => {
	it('ADD_GROUP', () => {
		const initialState = [];
		const newState = groupsReducer(initialState, addGroup('ListUs', '5'));

		expect(newState.length).to.eql([{
			    idGroup: '0',
			    name: 'ListUs', 
			    friends: ['0', '1'],// pick up the friends id.
			    showFriends: false,
			    administrator: '2'
			  }].length);
	});

});