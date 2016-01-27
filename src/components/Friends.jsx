import React, { Component, PropTypes } from 'react';
import { addFriend } from '../actions';
import { Avatar, Dialog, TextField, FlatButton } from 'material-ui';


export default class Friends extends Component {

	constructor(props){
		super(props);
		this.state = {
	    letter: ''
	   };
	}

  componentWillMount() {
    this.props.registerListeners();
  }

  componentWillUnmount() {
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
    const nodeDialog = this.refs.addFriendDialog;
    nodeDialog.show();
  }

  hideDialog(){
    const nodeDialog = this.refs.addFriendDialog;
    nodeDialog.dismiss();
  }

  findFriend(){

  	let letterToFind = this.refs.findFriendInput.value.toLowerCase();
  	//let newArray = friends.filter( (item) => item.name.toLowerCase().indexOf(letterToFind) !== -1);

  	this.setState({
  		letter: letterToFind
		});
  }

  onRemoveFriend(id){
    const { removeFriend } = this.props;
    removeFriend(id.target.id);
  }



  render() {

		let { friends, users } = this.props;

		if(friends === undefined) friends = [];
		if(users === undefined) users = [];

    const addFriend = [
  		{ text: 'Cancel', onClick: this.hideDialog.bind(this) },
		];

    let friendsGeneral = [];


    const listaFriends = friends.filter( friend =>  friend.name.toLowerCase().indexOf(this.state.letter.toLowerCase()) !== -1   );
    for(let j = 0; j < listaFriends.length; j = j+6){
      let rowFriends = [];
      let i = j;
      let top = i+6;
      while(i < top){
        if(i < listaFriends.length){
          let id = listaFriends[i].id;

          rowFriends = rowFriends.concat(<div className="col-xs-2 friendPhotoContainer">
            <span id={name} onClick={(id) => this.onRemoveFriend(id)}>{this.setImg(listaFriends[i])}</span><br/>
            <span className="friendName">{listaFriends[i].name}</span>
          </div>);
        }
        i++;
      }
      friendsGeneral = friendsGeneral.concat(<div className="row friendRow"> {rowFriends}
      </div>);
    }


    return (
      <article className="article">

        <div className="centerFriends">
          <Dialog ref="addFriendDialog" title="Add friend" actions={addFriend} >
						{
							users.map( user => <button style={{"marginLeft": "10px" }} className="btn btn-default" onClick={e => this.addFriend(e)}>{user.name}</button>)
						}
  				</Dialog>

          <div className="friendsHeader">
         	  <h3>Your friends</h3>
         	  <input type="text" onChange={this.findFriend.bind(this)} className="inputFindFriends form-control friendFinder" ref="findFriendInput" placeholder="Find friends" />
      		</div>

          <div>
            {
              friendsGeneral
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
    unregisterListeners: PropTypes.func.isRequired
};
