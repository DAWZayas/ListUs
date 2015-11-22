export const serverUsers = [
  {
    id: '00',
    name: 'Loli',
    password: '1',
    friends: ['11', '10'],
    groups: ['0', '1'],
    img: 'http://www.planwallpaper.com/static/images/3d_Creative_guitar_desktop_wallpaper_TUZQIme.jpg',
    visibility: false
  },
  {
    id: '11',
    name: 'Pepe',
    password: '1',
    friends: ['00', '10', '55'],
    groups: ['0'],
    img: 'http://www.planwallpaper.com/static/images/3d-animal-backgrounds-17306-17862-hd-wallpapers_MkXEx9v.jpg',
    visibility: false
  },
  {
    id: '22',
    name: 'Pepa',
    password: '1',
    friends: ['10'],
    groups: ['0', '1'],
    img: 'http://www.planwallpaper.com/static/images/3d-games-wallpapers-3d-picture-3d-wallpaper_oWEbyQ7.jpg',
    visibility: false
  },
  {
    id: '33',
    name: 'Juan',
    password: '1',
    friends: ['10'],
    groups: [],
    img: 'http://pngimg.com/upload/motorcycle_PNG5346.png',
    visibility: false
  },
  {
    id: '44',
    name: 'Raúl',
    password: 'a',
    friends: ['55'],
    groups: [],
    img: '',
    visibility: false
  },
  {
    id: '55',
    name: 'Adrián',
    password: '1',
    friends: ['10', '44', '11'],
    groups: ['2'],
    img: '',
    visibility: false
  },
  {
  	id: '10',
  	name: 'Troya',
  	password: 'troya',
  	friends: ['00', '11', '22', '33', '55'],
  	groups: ['0', '1', '2'],
  	img: 'http://www.planwallpaper.com/static/images/Conflict-HD-Wallpaper_Sf0xtpv.jpg',
  	visibility: true
  }
];

export const serverLists = [
  {
    id: 'aa',
    title: 'Real Madrid',
    participants: []//id group or id friend
  },
  {
    id: 'bb',
    title: 'Barsa',
    participants: []
  },
  {
    id: 'cc',
    title: 'Patetic',
    participants: ['10']
  },
  {
    id: 'dd',
    title: 'Valencia',
    participants: []
  },
  {
    id: 'ee',
    title: 'Celta',
    participants: ['10']
  },
  {
    id: 'ff',
    title: 'Betis',
    participants: ['10']
  }
];

export const serverComments = {
  1: [ { idList:'1', user:'pepe', date:'12/7/2015', msg:'eeeeee'}, { idList:'1', user:'juan', date:'12/7/2015', msg:'wwww'}],
  2: [ { idList:'2', user:'pepe', date:'13/7/2015', msg:'goewjpe'}, { idList:'2', user:'juan', date:'13/7/2015', msg:'trtrt'}]
};


export const serverTasks = {
	0: {
    id: '0',
		idList: 'cc',
		title: 'Gabi',
    participants: ['10']
	},
  1: {
    id: '1',
    idList: 'cc',
    title: 'Koke',
    participants: ['10']
  },
  2: {
    id: '2',
    idList: 'bb',
    title: 'Iniesta',
    participants: []
  },
  3: {
    id: '3',
    idList: 'bb',
    title: 'Suarez',
    participants: []
  },
  7: {
    id: '7',
    idList: 'aa',
    title: 'James',
    participants: []
  },
  8: {
    id: '8',
    idList: 'aa',
    title: 'Benzema',
    participants: []
  },
  9: {
    id: '9',
    idList: 'aa',
    title: 'Cristiano',
    participants: []
  },
  10: {
    id: '10',
    idList: 'aa',
    title: 'Modric',
    participants: []
  }
};

export const serverGroups = [
  {
    id: '0',
    name: 'ListUs',
    friends: ['00', '11', '22', '10'],// pick up the friends id.
    showFriends: false,
    administrator: '2'
  },

  {
    id: '1',
    name: 'Empresas',
    friends: ['00', '22', '10'],
    showFriends: false,
    administrator: '1'
  },

  {
    id: '2',
    name: 'Servidor',
    friends: ['55', '10'],
    showFriends: false,
    administrator: '5'
  }

];


