import { getId } from './index';

export const lists = [
  {
    id: getId(),
    title: 'Real Madrid'
  },
  {
    id: getId(),
    title: 'Barsa'
  },
  {
    id: getId(),
    title: 'Patetic'
  },
  {
    id: getId(),
    title: 'Valencia'
  },
  {
    id: getId(),
    title: 'Celta'
  },
  {
    id: getId(),
    title: 'Betis'
  }
];

export const comments = {
  1: [ { idList:1, user:'pepe', date:'12/7/2015', msg:'eeeeee'}, { idList:1, user:'juan', date:'12/7/2015', msg:'wwww'}],
  2: [ { idList:2, user:'pepe', date:'13/7/2015', msg:'goewjpe'}, { idList:2, user:'juan', date:'13/7/2015', msg:'trtrt'}]
};

export const friends = [
  {
    id: '0',
    name: 'Loli',
    groups: ['0', '1'], 
    img: 'http://www.planwallpaper.com/static/images/3d_Creative_guitar_desktop_wallpaper_TUZQIme.jpg'
  },
  {
    id: '1',
    name: 'Pepe',
    groups: ['0'],
    img: 'http://www.planwallpaper.com/static/images/3d-animal-backgrounds-17306-17862-hd-wallpapers_MkXEx9v.jpg'
  },
  {
    id: '2',
    name: 'Pepa',
    groups: ['0', '1'],
    img: 'http://www.planwallpaper.com/static/images/3d-games-wallpapers-3d-picture-3d-wallpaper_oWEbyQ7.jpg'
  },
  {
    id: '3',
    name: 'Juan',
    groups: [],
    img: 'http://pngimg.com/upload/motorcycle_PNG5346.png'
  },
  {
    id: '4',
    name: 'Raúl',
    groups: [],
    img: ''
  },
  {
    id: '5',
    name: 'Adrián',
    groups: [],
    img: ''
  },
  {
    id: '6',
    name: 'Alba',
    groups: [],
    img: ''
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

export const groups = [
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

];

export const user = {
  idUser: '5',
  name: 'Troya',
  password: 'troya',
  img: 'http://www.planwallpaper.com/static/images/Conflict-HD-Wallpaper_Sf0xtpv.jpg'
};

export const calendar = {display: true};

export const initialState =  { lists, tasks, comments, friends, groups, user };
