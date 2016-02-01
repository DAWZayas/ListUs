import React, { Component, PropTypes } from 'react';
import { addFriend } from '../actions';
import { Avatar, Dialog } from 'material-ui';
import Spinner from './Spinner';


export default class Friends extends Component {

	constructor(props){
		super(props);
		this.state = {
	    letter: '',
			findUserLetter: '',
			open: false,
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
    this.setState({
			open: true
		});
  }

  hideDialog(){
		this.setState({
			open: false,
			findUserLetter: ''
		});
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

	findUsers(){
		const letterToFindUsers = this.refs.findUser.value;
		this.setState({
			findUserLetter: letterToFindUsers
		});
	}



  render() {

		let { friends, users } = this.props;
		let usersToShow;

		if(friends === undefined) friends = [];
		if(users === undefined) users = [];

		const { findUserLetter, open } = this.state;

		usersToShow = users.filter( user => user.name.toLowerCase().indexOf(findUserLetter.toLowerCase()) !== -1 );

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
          rowFriends = rowFriends.concat(<div key={i} className="col-xs-2 friendPhotoContainer">
            <span id={name} onClick={(id) => this.onRemoveFriend(id)}>{this.setImg(listaFriends[i])}</span><br/>
            <span className="friendName">{listaFriends[i].name}</span>
          </div>);
        }
        i++;
      }
      friendsGeneral = friendsGeneral.concat(<div key="id" className="row friendRow"> {rowFriends}
      </div>);
    }


    return (
      <article className="article">

        <div className="centerFriends">
          <Dialog open={open} ref="addFriendDialog" title="Add friend" actions={addFriend} >
						<div style={{'textAlign': 'center'}}>
							<input type="text" ref="findUser" onChange={this.findUsers.bind(this)} /><br/><br/>
							{
								usersToShow.map( user => <button key={user.name} style={{'marginLeft': '10px' }} className="btn btn-default" onClick={e => this.addFriend(e)}>{user.name}</button>)
							}
						</div>
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
    unregisterListeners: PropTypes.func.isRequired
};
