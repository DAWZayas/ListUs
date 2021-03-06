import { expect } from 'chai';
import groupsReducer from '../../src/reducers/groups';

import { addGroup, editGroup, removeGroup, showGroupFriends, addGroupFriend,  changeGroupAdmin } from '../../src/actions';
import { groups } from '../../src/utils/examples';

describe('GROUP_TEST', () => {
	it('ADD_GROUP', () => {
		const initialState = [];
		const newState = groupsReducer(initialState, addGroup('ListUs', '5'));

		expect(newState.length).to.eql([{
			    id: '0',
			    name: 'ListUs',
			    friends: ['0', '1'],// pick up the friends id.
			    showFriends: false,
			    administrator: '2'
			  }].length);
	});


	it('REMOVE_GROUP', () => {
		const initialState = groups;
		const newState = groupsReducer(initialState, removeGroup('0'));
		expect(newState).to.eql([
			{
			    id: '1',
			    name: 'Empresas',
			    friends: [],
			    showFriends: false,
			    administrator: '1'
			  },

			  {
			    id: '2',
			    name: 'Servidor',
			    friends: ['22'],
			    showFriends: false,
			    administrator: '5'
			  }
		]);
	});

	it('EDIT_GROUP', () => {
		const initialState = groups;
		const newState = groupsReducer(initialState, editGroup('1', 'Empresas2'));
		expect(newState).to.eql([
			  {
			    id: '0',
			    name: 'ListUs',
			    friends: ['00', '11'],// pick up the friends id.
			    showFriends: false,
			    administrator: '2'
			  },

			  {
			    id: '1',
			    name: 'Empresas2',
			    friends: [],
			    showFriends: false,
			    administrator: '1'
			  },

			  {
			    id: '2',
			    name: 'Servidor',
			    friends: ['22'],
			    showFriends: false,
			    administrator: '5'
			  }

		]);
	});


	it('SHOW_GROUP_FRIENDS', () => {
		const initialState = [{
		    id: '2',
		    name: 'Servidor',
		    friends: ['22'],
		    showFriends: false,
		    administrator: '5'
		  }];
		const newState = groupsReducer(initialState, showGroupFriends('2'));
		expect(newState).to.eql([{
		    id: '2',
		    name: 'Servidor',
		    friends: ['22'],
		    showFriends: true,
		    administrator: '5'
		  }]
		);
	});


	it('ADD_FRIEND_GROUP', () => {
		const initialStates = groups;
		const newStates = groupsReducer(initialStates, addGroupFriend('33', '1'));
		expect(newStates).to.eql([
		  {
		    id: '0',
		    name: 'ListUs',
		    friends: ['00', '11'],// pick up the friends id.
		    showFriends: false,
		    administrator: '2'
		  },

		  {
		    id: '1',
		    name: 'Empresas',
		    friends: ['33'],
		    showFriends: false,
		    administrator: '1'
		  },

		  {
		    id: '2',
		    name: 'Servidor',
		    friends: ['22'],
		    showFriends: false,
		    administrator: '5'
		  }

		]);
	});

	it('CHANGE_GROUP_ADMIN', () => {
		const initialState = [{
		    id: '2',
		    name: 'Servidor',
		    friends: ['22'],
		    showFriends: false,
		    administrator: '5'
		  }];
		const newState = groupsReducer(initialState, changeGroupAdmin('1', '2'));
		expect(newState).to.eql([{
		    id: '2',
		    name: 'Servidor',
		    friends: ['22'],
		    showFriends: false,
		    administrator: '1'
		  }]);
	});

});
