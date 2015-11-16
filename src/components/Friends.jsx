import React, { Component, PropTypes } from 'react';

import { addFriend, removeFriend } from '../actions';

import { Avatar, FloatingActionButton, Dialog, TextField } from 'material-ui';

export default class Friends extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			constList: this.props.friends,
			newList: this.props.friends
		};
	}

  setImg(friend){
    return friend.img !== '' ? <Avatar className="avatarFriend" src={friend.img}/> : <Avatar className='avatarFriend avatarLetter'>{friend.name.substring(0,1).toUpperCase()}</Avatar>;
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
  	let newArray = this.state.constList.filter( (item) => item.name.toLowerCase().indexOf(letterToFind) !== -1);

  	this.setState({
  		newList: newArray
		});   	
  }

  render() {

    const addFriend = [
  		{ text: 'Cancel', onClick: this.hideDialog.bind(this) },
 		  { text: 'Submit', onClick: this.addFriend.bind(this), ref: 'submit' }
		];


    return (



      <article className="article">

        <Dialog ref='addFriendDialog' title='Add friend' actions={addFriend} >
   				<TextField ref='addFriendInput' floatingLabelText="New friend" /> 
				</Dialog>
           
       	<h3>Friends management</h3>

       	<input type="text" onChange={this.findFriend.bind(this)} className="inputFindFriends form-control floating-label" ref="findFriendInput" placeholder="Find friends" />
    		
        <div className='row friendRow'>
          {
            this.state.newList.map((friend, index) => <div className='col-xs-1 friendPhotoContainer'><span>{this.setImg(friend)}</span><br/><span className='friendName'>{friend.name}</span></div>)
          }
       	</div>

       	<div className='row centered'>
	       	<FloatingActionButton onClick={this.showDialog.bind(this)}>
	            <span className='glyphicon glyphicon-plus'></span>
	        </FloatingActionButton>
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


