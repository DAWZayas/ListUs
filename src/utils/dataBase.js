import { getId } from './index';


export const serverUsers = [
  {
    id: '0',
    name: 'Loli',
    password: '1',
    friends: ['1', '10'],
    groups: ['0', '1'],
    img: 'http://www.planwallpaper.com/static/images/3d_Creative_guitar_desktop_wallpaper_TUZQIme.jpg',
    visibility: false
  },
  {
    id: '1',
    name: 'Pepe',
    password: '1',
    friends: ['0', '10', '1'],
    groups: ['0'],
    img: 'http://www.planwallpaper.com/static/images/3d-animal-backgrounds-17306-17862-hd-wallpapers_MkXEx9v.jpg',
    visibility: false
  },
  {
    id: '2',
    name: 'Pepa',
    password: '1',
    friends: ['10'],
    groups: ['0', '1'],
    img: 'http://www.planwallpaper.com/static/images/3d-games-wallpapers-3d-picture-3d-wallpaper_oWEbyQ7.jpg',
    visibility: false
  },
  {
    id: '3',
    name: 'Juan',
    password: '1',
    friends: ['10'],
    groups: [],
    img: 'http://pngimg.com/upload/motorcycle_PNG5346.png',
    visibility: false
  },
  {
    id: '4',
    name: 'Raúl',
    password: 'a',
    friends: ['5'],
    groups: [],
    img: '',
    visibility: false
  },
  {
    id: '5',
    name: 'Adrián',
    password: '1',
    friends: ['10', '4', '1'],
    groups: ['2'],
    img: '',
    visibility: false
  },
  {
  	id: '10',
 	name: 'Troya',
  	password: 'troya',
  	friends: ['0', '1', '2', '3', '5'],
  	groups: ['0', '1', '2'],
  	img: 'http://www.planwallpaper.com/static/images/Conflict-HD-Wallpaper_Sf0xtpv.jpg',
  	visibility: true
  }
];

export const serverLists = [
  {
    id: getId(),
    title: 'Real Madrid',
    participants: []//id group or id friend
  },
  {
    id: getId(),
    title: 'Barsa',
    participants: []
  },
  {
    id: getId(),
    title: 'Patetic',
    participants: []
  },
  {
    id: getId(),
    title: 'Valencia',
    participants: []
  },
  {
    id: getId(),
    title: 'Celta',
    participants: []
  },
  {
    id: getId(),
    title: 'Betis',
    participants: []
  }
];

export const serverComments = {
  1: [ { idList:'1', user:'pepe', date:'12/7/2015', msg:'eeeeee'}, { idList:'1', user:'juan', date:'12/7/2015', msg:'wwww'}],
  2: [ { idList:'2', user:'pepe', date:'13/7/2015', msg:'goewjpe'}, { idList:'2', user:'juan', date:'13/7/2015', msg:'trtrt'}]
};


export const serverTasks = {
	0: {
    id: '0',
		idList: serverLists[1].id,
		title: 'Messi',
    participants: []
	},
  1: {
    id: '1',
    idLists: serverLists[1].id,
    title: 'Neymar',
    participants: []
  },
  2: {
    id: '2',
    idList: serverLists[1].id,
    title: 'Iniesta',
    participants: []
  },
  3: {
    id: '3',
    idList: serverLists[1].id,
    title: 'Suarez',
    participants: []
  },
  7: {
    id: '7',
    idList: serverLists[0].id,
    title: 'James',
    participants: []
  },
  8: {
    id: '8',
    idList: serverLists[0].id,
    title: 'Benzema',
    participants: []
  },
  9: {
    id: '9',
    idList: serverLists[0].id,
    title: 'Cristiano',
    participants: []
  },
  10: {
    id: '10',
    idList: serverLists[0].id,
    title: 'Modric',
    participants: []
  }
};

export const serverGroups = [
  {
    idGroup: '0',
    name: 'ListUs',
    friends: ['0', '1', '2', '10'],// pick up the friends id.
    showFriends: false,
    administrator: '2'
  },

  {
    idGroup: '1',
    name: 'Empresas',
    friends: ['0', '2', '10'],
    showFriends: false,
    administrator: '1'
  },

  {
    idGroup: '2',
    name: 'Servidor',
    friends: ['5', '10'],
    showFriends: false,
    administrator: '5'
  }

];
