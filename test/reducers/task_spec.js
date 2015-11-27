import { expect } from 'chai';

import taskReducer from '../../src/reducers/tasks.js';
import { addTask, removeTask, editTask, addFriendGroupToTask } from '../../src/actions';
import { getId } from '../../src/utils';

describe('reducer', () => {

  it('ADD_TASK ', () => {

    const id = getId();
    const idList = 0;
    const nextState = taskReducer({}, addTask(idList, 'Real Madrid'));

    expect(Object.keys(nextState).length).to.eql(Object.keys({
      [id]:{
        id,
        idList,
        'title': 'Real Madrid'
      }
    }).length);
  });

    it('REMOVE_TASK', () => {
      const id = getId();
      const idList = 0;
      const initialState = {
            [id]:{
              id,
              idList,
              title: 'Real Madrid'
            },
            2:{
                id:2,
                idList,
                title: 'ATM'
              }
        };
      const nextState = taskReducer(initialState, removeTask(id));

      expect(nextState).to.eql({
        2:{
            id:2,
            idList,
            title: 'ATM'
          }
      });

    });

    it('EDIT_TASK', () => {
      const id = getId();
      const idList = 0;
      const initialState = {
          [id]:{
              id,
              idList,
              title: 'Real Madrid'
            }
        };
      const nextState = taskReducer(initialState, editTask(id, 'x'));

      expect(nextState).to.eql({
          [id]:{
              id,
              idList,
              title: 'x'
            }
        });
    });

    it('ADD_FRIEND_OR_GROUP_TO_TASK', () => {

      const initialState = {
        0: {
        id: '0',
        idList: 2,
        title: 'Messi',
        participants: []
      },
      1: {
        id: '1',
        idList: 2,
        title: 'Neymar',
        participants: []
      }};
      const nextState = taskReducer( initialState, addFriendGroupToTask('1', '5'));

      expect(nextState).to.eql({
      	0: {
          id: '0',
      		idList: 2,
      		title: 'Messi',
          participants: []
      	},
        1: {
          id: '1',
          idList: 2,
          title: 'Neymar',
          participants: ['5']
        }
      });
    });

});
