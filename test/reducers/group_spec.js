import { expect } from 'chai';
import groupsReducer from '../../src/reducers/groups';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { addGroup, editGroup, removeGroup, showGroupFriends, addGroupFriend,  changeGroupAdmin } from '../../src/actions';
=======
import { addGroup, editGroup, removeGroup, showGroupFriends, addFriendGroup } from '../../src/actions';
<<<<<<< HEAD
>>>>>>> b04006782596b263eda7ce443d342ae88b1acf87
=======
>>>>>>> b04006782596b263eda7ce443d342ae88b1acf87
=======
import { addGroup, editGroup, removeGroup, showGroupFriends, addGroupFriend,  changeGroupAdmin } from '../../src/actions';
>>>>>>> Alba2
=======
import { addGroup, editGroup, removeGroup, showGroupFriends, addGroupFriend,  changeGroupAdmin } from '../../src/actions';
>>>>>>> Alba2
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Alba2
=======
>>>>>>> Alba2
	it('REMOVE_GROUP', () => {
		const initialState = groups;
		const newState = groupsReducer(initialState, removeGroup('0'));
		expect(newState).to.eql([
			{
			    idGroup: '1', 
			    name: 'Empresas', 
			    friends: [],
			    showFriends: false,
			    administrator: '1'
			  },

			  {
			    idGroup: '2', 
			    name: 'Servidor', 
			    friends: ['2'],
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
			    idGroup: '0',
			    name: 'ListUs', 
			    friends: ['0', '1'],// pick up the friends id.
			    showFriends: false,
			    administrator: '2'
			  },

			  {
			    idGroup: '1', 
			    name: 'Empresas2', 
			    friends: [],
			    showFriends: false,
			    administrator: '1'
			  },

			  {
			    idGroup: '2', 
			    name: 'Servidor', 
			    friends: ['2'],
			    showFriends: false,
			    administrator: '5'
			  }

		]);
	});


	it('SHOW_GROUP_FRIENDS', () => {
		const initialState = [{
		    idGroup: '2', 
		    name: 'Servidor', 
		    friends: ['2'],
		    showFriends: false,
		    administrator: '5'
		  }];
		const newState = groupsReducer(initialState, showGroupFriends('2'));
		expect(newState).to.eql([{
		    idGroup: '2', 
		    name: 'Servidor', 
		    friends: ['2'],
		    showFriends: true,
		    administrator: '5'
		  }]
		);
	});


	it('ADD_FRIEND_GROUP', () => {
		const initialStates = groups;
		const newStates = groupsReducer(initialStates, addGroupFriend('3', '1'));
		expect(newStates).to.eql([
		  {
		    idGroup: '0',
		    name: 'ListUs', 
		    friends: ['0', '1'],// pick up the friends id.
		    showFriends: false,
		    administrator: '2'
		  },

		  {
		    idGroup: '1', 
		    name: 'Empresas', 
		    friends: ['3'],
		    showFriends: false,
		    administrator: '1'
		  },

		  {
		    idGroup: '2', 
		    name: 'Servidor', 
		    friends: ['2'],
		    showFriends: false,
		    administrator: '5'
		  }

		])
	});

	it('CHANGE_GROUP_ADMIN', () => {
		const initialState = [{
		    idGroup: '2', 
		    name: 'Servidor', 
		    friends: ['2'],
		    showFriends: false,
		    administrator: '5'
		  }];
		const newState = groupsReducer(initialState, changeGroupAdmin('1', '2'));
		expect(newState).to.eql([{
		    idGroup: '2', 
		    name: 'Servidor', 
		    friends: ['2'],
		    showFriends: false,
		    administrator: '1'
		  }]);
	});

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b04006782596b263eda7ce443d342ae88b1acf87
=======
>>>>>>> b04006782596b263eda7ce443d342ae88b1acf87
=======
>>>>>>> Alba2
=======
>>>>>>> Alba2
});