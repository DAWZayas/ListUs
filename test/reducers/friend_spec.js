import { expect } from 'chai';
import friendReduce from '../../src/reducers/friends';
import { addFriend, removeFriend, addFriendGroup } from '../../src/actions';
import { friends } from '../../src/utils/examples';

describe('FRIEND_TEST', () => {

  it('ADD_FRIEND', () => {

    const initialState = [];
    const newState = friendReduce(initialState, addFriend('pepe'));

    expect(newState.length).to.eql([{id:'1', name:'pepe', groups:[], img:''}].length);
  });

  it('REMOVE_FRIENDS', () => {

    const initialState = friends;
    const newState = friendReduce(initialState, removeFriend('1'));

    expect(newState).to.eql(
      [
        {
          id: '0',
          name: 'Loli',
          groups: ['0', '1'],
          img: 'http://www.planwallpaper.com/static/images/3d_Creative_guitar_desktop_wallpaper_TUZQIme.jpg'
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
      ]
    );
  });

  it('ADD_FRIEND_TO_GROUP', () => {

    const initialState = friends;
    const newState = friendReduce(initialState, addFriendGroup('2', '2'));

    expect(newState).to.eql( [
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
        groups: ['0', '1', '2'],
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
    ]);
  });
});
