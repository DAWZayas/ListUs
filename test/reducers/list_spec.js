import { expect } from 'chai';
import { getId } from '../../src/utils';
import {  addList, removeList, editList, addFriendGroupToList} from '../../src/actions';
import listReducer from '../../src/reducers/lists.js';

describe('LIST_TEXT', () => {

  it('ADD_LIST', () => {

    const initialState = [];
    const nextState = listReducer( initialState, addList('James'));
    expect((nextState).length).to.eql( [{
      id:'1',
      title: 'James',
      participants:[]
    }].length);
  });

  it('REMOVE_LIST', () => {
    const id = getId();
    const initialState = [ { id:'1', title: 'James', participants:[] }, { id, title: 'Benzema', participants:[] }];
    const nextState = listReducer( initialState, removeList(id));

    expect(nextState).to.eql([ { id:'1', title: 'James', participants:[] } ]);
  });

  it('EDIT_LIST', () => {
    const id = getId();
    const initialState = [ { id:'1', title: 'James', participants:[] }, { id, title: 'Benzema', participants:[] }];
    const nextState = listReducer( initialState, editList(id, 'Keylor'));

    expect(nextState).to.eql([ { id:'1', title: 'James', participants:[] }, { id, title: 'Keylor', participants:[] }]);
  });
  it('ADD_FRIEND_OR_GROUP_TO_LIST', () => {
    const id = getId();
    const initialState = [ { id:'1', title: 'James', participants:[] }, { id, title: 'Benzema', participants:[] }];
    const nextState = listReducer(initialState, addFriendGroupToList('1', '3'));

    expect(nextState).to.eql([ { id:'1', title: 'James', participants:['3'] }, { id, title: 'Benzema', participants:[] }]);
  });
});
