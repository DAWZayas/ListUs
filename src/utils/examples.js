import { getId } from './index';
//import { serverUsers, serverGroups, serverLists, serverTasks, serverComments } from './dataBase';


export const lists = [
  {
    id: getId(),
    title: 'ListUs project',
    participants: [], //id group or id friend
    date: '11/12/2015',
    importance: 3
  },
  {
    id: getId(),
    title: 'Final project',
    participants: [],
    date: '20/12/2015',
    importance: 1
  },
  {
    id: getId(),
    title: 'John\'s birthday',
    participants: [],
    date: '31/12/2015',
    importance: 2
  },
  {
    id: getId(),
    title: 'Family meeting',
    participants: [],
    date: '24/12/2015',
    importance: 0
  },
  {
    id: getId(),
    title: 'Party all night',
    participants: [],
    date: '31/12/2015',
    importance: 0
  },
  {
    id: getId(),
    title: 'Sleepover',
    participants: [],
    date: '1/1/2016',
    importance: 2
  }
];

export const tasks = {
  0: {
    id: '0',
    idList: lists[0].id,
    title: 'Improve the style',
    participants: [],
    done: false
  },
  1: {
    id: '1',
    idLists: lists[0].id,
    title: 'Fix the calendar',
    participants: [],
    done: false
  },
  2: {
    id: '2',
    idList: lists[0].id,
    title: 'Implement DB',
    participants: [],
    done: false
  },
  3: {
    id: '3',
    idList: lists[0].id,
    title: 'Check errors',
    participants: [],
    done: false
  },
  7: {
    id: '7',
    idList: lists[1].id,
    title: 'Read docs',
    participants: [],
    done: false
  },
  8: {
    id: '8',
    idList: lists[1].id,
    title: 'Requirements',
    participants: [],
    done: false
  },
  9: {
    id: '9',
    idList: lists[1].id,
    title: 'Code',
    participants: [],
    done: false
  },
  10: {
    id: '10',
    idList: lists[1].id,
    title: 'Presentation',
    participants: [],
    done: false
  }
};

export const comments = {
  [lists[0].id]: [ {  user:'pepe', date:'12/7/2015', hour:'11:22', msg:'eeeeee'}, { user:'juan', date:'12/7/2015', hour:'11:22', msg:'wwww'}],
  [lists[1].id]: [ {  user:'pepe', date:'13/7/2015', hour:'11:22', msg:'goewjpe'}, { user:'juan', date:'13/7/2015', hour:'11:22', msg:'trtrt'}],
  [lists[2].id]: [ ],
  [lists[3].id]: [ ],
  [lists[4].id]: [ ],
  [lists[5].id]: [ ]
};

export const friends = [
  {
    id: '00',
    name: 'Loli',
    groups: ['0', '1'],
    img: 'http://www.planwallpaper.com/static/images/3d_Creative_guitar_desktop_wallpaper_TUZQIme.jpg'
  },
  {
    id: '11',
    name: 'Pepe',
    groups: ['0'],
    img: 'http://www.planwallpaper.com/static/images/3d-animal-backgrounds-17306-17862-hd-wallpapers_MkXEx9v.jpg'
  },
  {
    id: '22',
    name: 'Pepa',
    groups: ['0', '1'],
    img: 'http://www.planwallpaper.com/static/images/3d-games-wallpapers-3d-picture-3d-wallpaper_oWEbyQ7.jpg'
  },
  {
    id: '33',
    name: 'Juan',
    groups: [],
    img: 'http://pngimg.com/upload/motorcycle_PNG5346.png'
  },
  {
    id: '44',
    name: 'Raúl',
    groups: [],
    img: ''
  },
  {
    id: '55',
    name: 'Adrián',
    groups: [],
    img: ''
  },

];

export const groups = [
  {
    id: '0',
    name: 'ListUs',
    friends: ['00', '11'], // pick up the friends id.
    showFriends: false,
    administrator: '10'
  },

  {
    id: '1',
    name: 'Empresas',
    friends: [],
    showFriends: false,
    administrator: '22'
  },

  {
    id: '2',
    name: 'Servidor',
    friends: ['22'],
    showFriends: false,
    administrator: '10'
  }

];

export const user = {
  id: '10',
  name: 'Troya',
  password: 'troya',
  img: 'http://www.planwallpaper.com/static/images/Conflict-HD-Wallpaper_Sf0xtpv.jpg',
  visibility: true
};


//export const user = {};



/*
export const lists = [];
export const comments = {};
export const tasks = {};
export const friends = [];
export const groups = [];
export const user = {};

export const dataBase = {
  serverUsers: serverUsers,
  serverGroups: serverGroups,
  serverLists: serverLists,
  serverTasks: serverTasks,
  serverComments: serverComments

};



//export const initialState = { lists, tasks, comments, friends, groups, user, dataBase };*/


export const calendar = {
  2015: {
    'Diciembre': {
      11: [{ title: 'ListUs project', importance: 3, id: lists[0].id }],
      20: [{ title: 'Final DAW project', importance: 1, id: lists[1].id }],
      24: [{ title: 'Family meeting', importance: 0, id: lists[3].id }],
      31: [{ title: 'John\'s birthday', importance: 0, id: lists[2].id },
           { title: 'Party all night', importance: 3, id: lists[4].id }]
    }
  },
  2016: {
    'Enero': {
      1: [{ title: 'Sleepover', importance: 2, id: lists[5].id }]
    }
  }
};

export const initialState =  { lists, tasks, comments, friends, groups, user, calendar };
