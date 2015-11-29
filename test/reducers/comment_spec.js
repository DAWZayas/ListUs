import { expect } from 'chai';
import commentReduce from '../../src/reducers/comments';
import {addComment, removeComments } from '../../src/actions';
import { comments } from '../../src/utils/examples';

describe('COMENT_TEST', () => {

  it('ADD_COMMENT EMPTY', () => {

    const initialState = {};
    const newState = commentReduce(initialState, addComment(1, 'pepe', '12/7/2016', 'fwoiehgfew'));

    expect(newState).to.eql( { 1:[{ user: 'pepe', date: '12/7/2016', msg: 'fwoiehgfew'} ] } );
  });

  it('ADD_COMMENT WITH OTHER IDLIST', () => {

    const initialState = comments;
    const newState = commentReduce(initialState, addComment(3, 'pepe', '12/7/2016', 'fwoiehgfew'));

    expect(newState).to.eql(
      {
        1: [ {  user:'pepe', date:'12/7/2015', msg:'eeeeee'}, {  user:'juan', date:'12/7/2015', msg:'wwww'}],
        2: [ {  user:'pepe', date:'13/7/2015', msg:'goewjpe'}, {  user:'juan', date:'13/7/2015', msg:'trtrt'}],
        3: [ { user: 'pepe', date: '12/7/2016', msg: 'fwoiehgfew'} ]
      }
    );
  });

  it('ADD_COMMENT WITH THE SAME IDLIST', () => {

    const initialState = comments;
    const newState = commentReduce(initialState, addComment(1, 'pepe', '12/7/2016', 'fwoiehgfew'));
    expect(newState).to.eql(
      {
        1: [ {  user:'pepe', date:'12/7/2015', msg:'eeeeee'}, {  user:'juan', date:'12/7/2015', msg:'wwww'}, { user: 'pepe', date: '12/7/2016', msg: 'fwoiehgfew'}],
        2: [ {  user:'pepe', date:'13/7/2015', msg:'goewjpe'}, {  user:'juan', date:'13/7/2015', msg:'trtrt'}]
      }
    );
  });

  it('REMOVE_COMMENTS', () => {

    const initialState = comments;
    const newState = commentReduce(initialState, removeComments(2));
    expect(newState).to.eql(
      {
        1: [ {  user:'pepe', date:'12/7/2015', msg:'eeeeee'}, {  user:'juan', date:'12/7/2015', msg:'wwww'}]
      }
    );
  });
});
