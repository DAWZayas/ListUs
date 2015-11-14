import { getId } from './index';

export const lists = [
  {
    id: getId(),
    title: 'Real Madrid'
  },
  {
    id: getId(),
    title: 'Barsa'
  }
];

export const comments = {
  1: [ { idList:1, user:'pepe', date:'12/7/2015', msg:'eeeeee'}, { idList:1, user:'juan', date:'12/7/2015', msg:'wwww'}],
  2: [ { idList:2, user:'pepe', date:'13/7/2015', msg:'goewjpe'}, { idList:2, user:'juan', date:'13/7/2015', msg:'trtrt'}]
};

export const friends = [
  {
    id: 1,
    name: 'Pepe',
    groups: ['123456']
  },
  {
    id: 2,
    name: 'Pepa',
    groups: ['123456']
  },
  {
    id: 3,
    name: 'Juan',
    groups: ['654321', '123456']
  }

];

export const tasks = {
	0: {
    id: '0',
		idList: lists[1].id,
		title: 'Messi'
	},
  1: {
    id: '1',
    idlists: lists[1].id,
    title: 'Neymar'
  },
  2: {
    id: '2',
    idList: lists[1].id,
    title: 'Iniesta'
  },
  3: {
    id: '3',
    idList: lists[1].id,
    title: 'Suarez'
  },
  7: {
    id: '7',
    idList: lists[0].id,
    title: 'James'
  },
  8: {
    id: '8',
    idList: lists[0].id,
    title: 'Benzema'
  },
  9: {
    id: '9',
    idList: lists[0].id,
    title: 'Cristiano'
  },
  10: {
    id: '10',
    idList: lists[0].id,
    title: 'Modric'
  }
};


export const calendar = {display: true};

export const initialState =  { lists, tasks, comments, friends };
