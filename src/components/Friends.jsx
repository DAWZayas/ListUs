import React, { Component, PropTypes } from 'react';
import { addFriend } from '../actions';
import { Avatar, Dialog, FlatButton } from 'material-ui';
import Spinner from './Spinner';
import alertify from 'alertifyjs/build/alertify.min.js';

export default class Friends extends Component {

  constructor(props){
    super(props);
    this.state = {
      letter: '',
      findUserLetter: '',
      open: false,
      openDelete: false,
      friendName: '',
      loading: true
     };
  }

  componentWillMount() {
    this.props.registerListeners();
  }

  componentWillReceiveProps(){
    this.setState({loading: false});
  }

  componentWillUnmount() {
    this.props.cleanAlert();
    this.props.unregisterListeners();
  }


  setImg(friend){
    return friend.img !== '' ?
    <Avatar id={friend.name} className="avatarFriend" src={friend.img}/> :
    <Avatar id={friend.name} className="avatarFriend avatarLetter">{friend.name.substring(0, 1).toUpperCase()}</Avatar>;
  }

  addFriend(e){
    const { addFriend } = this.props;
    addFriend(e.target.innerHTML);
    this.hideDialog();
  }

  showDialog(){
    this.props.cleanAlert();
    this.setState({
      open: true
    });
  }

  hideDialog(){
    this.props.cleanAlert();
    this.setState({
      open: false,
      findUserLetter: ''
    });
  }

  findFriend(){

    let letterToFind = this.refs.findFriendInput.value.toLowerCase();

    this.setState({
      letter: letterToFind
    });
  }

  findUsers(){
    const letterToFindUsers = this.refs.findUser.value;
    this.setState({
      findUserLetter: letterToFindUsers
    });
  }

  onRemoveFriend(){
    const { removeFriend } = this.props;
    removeFriend(this.state.friendName);
    this.setState({friendName: '', openDelete: false});
  }

  handleCancelRemoveFriend(){
    this.setState({friendName: '', openDelete: false});
  }


  handleRemoveDialog(id){
    this.props.cleanAlert();
    this.setState({friendName: id.target.children[0].id, openDelete: true});
  }

  myAlert(alert){
    if (alert.msgType==='add'){
      alertify.success(alert.msg);
    }
    if (alert.msgType==='remove'){
      alertify.error(alert.msg);
    }
    if(alert.msgType==='edit'){
      alertify.message(alert.msg);
    }
  }

  render() {

    let { friends, users, alert } = this.props;
    let usersToShow;

    if(friends === undefined) friends = [];
    if(users === undefined) users = [];

    const { findUserLetter, open } = this.state;

    usersToShow = users.filter( user => user.name.toLowerCase().indexOf(findUserLetter.toLowerCase()) !== -1 );

    const addFriend = [
      <FlatButton
        label="Cancel"
        secondary
        onClick={() => this.hideDialog()} />
    ];

    let friendsGeneral = [];


    const listaFriends = friends.filter( friend =>  friend.name.toLowerCase().indexOf(this.state.letter.toLowerCase()) !== -1   );
    for(let j = 0; j < listaFriends.length; j = j+6){
      let rowFriends = [];
      let i = j;
      let top = i+6;
      while(i < top){
        if(i < listaFriends.length){
          rowFriends = rowFriends.concat(<div key={i} className="col-xs-3 friendPhotoContainer">
            <span className="displayX" id={name} style={{cursor: 'pointer'}} onClick={(id) => this.handleRemoveDialog(id)}>{this.setImg(listaFriends[i])}</span><br/>
            <span className="friendName">{listaFriends[i].name}</span>
          </div>);
        }
        i++;
      }
      friendsGeneral = friendsGeneral.concat(<div key="id" className="row friendRow"> {rowFriends}
      </div>);
    }

    const deleteButtons = [
      <FlatButton label="Cancel" secondary onClick={ () => this.handleCancelRemoveFriend()} />,
      <FlatButton label="Remove" primary onClick={() => this.onRemoveFriend()} />
    ];

    return (
      <article className="article">
        {alert.msg.length
          ? this.myAlert(alert)
          : ''
        }
        <div className="centerFriends">
          <Dialog open={open} ref="addFriendDialog" title="Add friend" actions={addFriend} >
            <div style={{'textAlign': 'center'}}>
              <input className="form-control text-center" placeholder="Search friends" type="text" ref="findUser" onChange={this.findUsers.bind(this)} /><br/><br/>
              {
                usersToShow.length === 0
                ? <h4>No friends found</h4>
                : findUserLetter.length < 3
                  ? <h4>Three letters at least</h4>
                  : usersToShow.map( user => <button key={user.name} style={{'marginLeft': '10px' }} className="btn btn-default" onClick={e => this.addFriend(e)}>{user.name}</button>)
              }
            </div>
          </Dialog>

          <Dialog open={this.state.openDelete} ref="dialogRemoveFriend" title="Remove Friend" actions={deleteButtons}>
            <p>Are you sure you want to remove {this.state.friendName} as your friend?</p>
          </Dialog>

          <div className="friendsHeader">
            <h3>Your friends</h3>
            <input type="text" onChange={this.findFriend.bind(this)} className="inputFindFriends form-control friendFinder" ref="findFriendInput" placeholder="Find friends" />
          </div>

          <div>
            {
              (this.state.loading)?<Spinner />:friendsGeneral
            }
          </div>
          <div className="row centered">
             <a onClick={this.showDialog.bind(this)} style={{cursor: 'pointer'}} >
              <img src={'http://waxpoetics.com/wp-content/themes/records-waxpoetics/images/newicons4/plus.png'} width="30" height="30"/>
             </a>
          </div>

        </div>
      </article>
    );
  }
}

Friends.propTypes= {
    friends: PropTypes.array,
    users: PropTypes.array,
    addFriend: PropTypes.func,
    removeFriend: PropTypes.func,
    registerListeners: PropTypes.func.isRequired,
    unregisterListeners: PropTypes.func.isRequired,
    alert: PropTypes.object,
    cleanAlert: PropTypes.func
};
