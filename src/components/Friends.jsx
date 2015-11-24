import React, { Component, PropTypes } from 'react';
import { addFriend } from '../actions';
import { Avatar, Dialog, TextField } from 'material-ui';


export default class Friends extends Component {

	constructor(props){
		super(props);
		this.state = {
      //newList: this.props.friends
      letter: ''
      //shouldUpdate: true
    };
	}

  /*componentDidUpdate(){
    this.setState({
      constList: this.props.friends,
      newList: this.props.friends,
      shouldUpdate: !this.state.shouldUpdate
    });
  }

  shouldComponentUpdate(){
    debugger;
    return this.state.shouldUpdate;
  }*/



  setImg(friend){
    return friend.img !== '' ? <Avatar className="avatarFriend" src={friend.img}/> : <Avatar className="avatarFriend avatarLetter">{friend.name.substring(0, 1).toUpperCase()}</Avatar>;
  }

  addFriend(){

    const nodeInput = this.refs.addFriendInput;
    const { onAddFriend } = this.props;
    onAddFriend(nodeInput.getValue());
    nodeInput.setValue('');
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



  render() {
    const addFriend = [
  		{ text: 'Cancel', onClick: this.hideDialog.bind(this) },
 		  { text: 'Submit', onClick: this.addFriend.bind(this), ref: 'submit' }
		];

    let friendsGeneral = [];

    const listaFriends = this.props.friends.filter( friend =>  friend.name.toLowerCase().indexOf(this.state.letter.toLowerCase()) !== -1   );

    for(let j = 0; j < listaFriends.length; j = j+6){
      let rowFriends = [];
      let i = j;
      let top = i+6;
      while(i < top){
        if(i < listaFriends.length){
          rowFriends = rowFriends.concat(<div className="col-xs-2 friendPhotoContainer">
            <span>{this.setImg(listaFriends[i])}</span><br/>
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
     				<TextField ref="addFriendInput" floatingLabelText="New friend" /> 
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
  	       	{/*<FloatingActionButton onClick={this.showDialog.bind(this)}>
  	            <span className="glyphicon glyphicon-plus"></span>
  	        </FloatingActionButton>*/}
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
    friends: PropTypes.array.isRequired,
    onAddFriend: PropTypes.func.isRequired,
    onRemoveFriend: PropTypes.func.isRequired
};


