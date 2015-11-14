import { expect } from 'chai';
import friendReduce from '../../src/reducers/friend';
import { addFriend, removeFriend, addFriendGroup } from '../../src/actions';
import { friends } from '../../src/utils/examples';

describe('FRIEND_TEST', () => {

  it('ADD_FRIEND', () => {

    const initialState = [];
    const newState = friendReduce(initialState, addFriend('pepe'));

    expect(newState.length).to.eql([{id:1, name:'pepe', groups:[]}].length);
  });

  it('REMOVE_FRIENDS', () => {

    const initialState = friends;
    const newState = friendReduce(initialState, removeFriend(1));

    expect(newState).to.eql(
      [{
        id: 2,
        name: 'Pepa',
        groups: ['123456']
      },
      {
        id: 3,
        name: 'Juan',
        groups: ['654321', '123456']
      }]
    );
  });

  it('ADD_FRIEND_TO_GROUP', () => {

    const initialState = friends;
    const newState = friendReduce(initialState, addFriendGroup('012345', 2));

    expect(newState).to.eql( [
      {
        id: 1,
        name: 'Pepe',
        groups: ['123456']
      },
      {
        id: 2,
        name: 'Pepa',
        groups: ['123456', '012345']
      },
      {
        id: 3,
        name: 'Juan',
        groups: ['654321', '123456']
      }

    ]);
  });
});
