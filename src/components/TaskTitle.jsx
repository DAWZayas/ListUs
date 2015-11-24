import React, { Component, PropTypes } from 'react';
//import ItemList from './ItemList';
import { Link } from 'react-router';
import { Popover, TextField, Toggle } from 'material-ui';

export default class TaskTitle extends Component {

  constructor(props){
    super(props);
    this.state = {
      isModifyList: false,
      activePopover: '',
      anchorEl: {},
      targetOrigin: {'horizontal':'left', 'vertical':'center'},
      anchorOrigin: {'horizontal':'right', 'vertical':'center'},
      ListOfFriendsAndGroups: [],
      newParticipant: {}
    };
  }

  handleOnClickEdit(e){
    e.stopPropagation();
    this.setState({ isModifyList: true});
  }

  handleOkClick(e){
    e.stopPropagation();
    const newTitle = this.refs.title.value;
    const { onEditList, list } = this.props;
    onEditList(list.id, newTitle);
    this.setState({ isModifyList: false});
  }

  handleCancelClick(e){
    e.stopPropagation();
    this.setState({ isModifyList: false});
  }

  handleOnClickRemove(e){
    e.stopPropagation();
    const { list, onRemoveList } = this.props;
    onRemoveList(list.id);
  }

  isInTheArray(idParticipants, list){

    const leng = list.participants.filter(participant => participant.id!==idParticipants).length;
    return list.participants.length!==leng;
  }


  handleOnChangeTextField(e){
    e.stopPropagation();
    const { list, friends, groups } = this.props;
    const textToSearch = this.refs.textField.getValue().toLowerCase();
    if(textToSearch!==''){
      const friendToggle = this.refs.friend;
      const groupToggle = this.refs.group;
      const arrayFriends = friends.filter( friend => !this.isInTheArray(friend.id, list ) );
      const arrayGroups = groups.filter( group => !this.isInTheArray(group.id, list ) );
      let newListOfFriendsAndGroups = [];
      newListOfFriendsAndGroups = friendToggle.isToggled() ? newListOfFriendsAndGroups.concat(arrayFriends) : newListOfFriendsAndGroups;
      newListOfFriendsAndGroups = groupToggle.isToggled() ? newListOfFriendsAndGroups.concat(arrayGroups) : newListOfFriendsAndGroups;
      newListOfFriendsAndGroups = newListOfFriendsAndGroups.length!==0 ? newListOfFriendsAndGroups.filter( item=> item.name.toLowerCase().search(textToSearch) !== -1) : [];
      this.setState({
        ListOfFriendsAndGroups: newListOfFriendsAndGroups
      });
    }else{
      this.setState({
        ListOfFriendsAndGroups: []
      });
    }
  }

  handleOnClickListParticipant(e, participant){
    e.stopPropagation();
    const participantName = participant.name;
    this.refs.textField.setValue(participantName);
    this.setState({
      newParticipant: participant
    });
  }


  handleOnClickAddFriendGroupToList(e){
    e.stopPropagation();
    const { list, onAddFriendGroupToList } = this.props;
    Object.keys(this.state.newParticipant).length===0 || this.isInTheArray(this.state.newParticipant.id, list) ? null : onAddFriendGroupToList(list.id, this.state.newParticipant) ;
    this.setState({
      newParticipant: {},
      ListOfFriendsAndGroups: []
    });
    this.refs.textField.setValue('');
    this.closePopover();
  }

  show(key, e) {
    e.stopPropagation();
    this.setState({
      activePopover:key,
      anchorEl:e.currentTarget,
    });
  }

  closePopover() {
    this.setState({
      activePopover:'none',
      newParticipant: {},
      ListOfFriendsAndGroups: []
    });
  }

  render() {
    const { list } = this.props;
    return(
    <div>
      <Popover open={this.state.activePopover==='pop'}
        anchorEl={this.state.anchorEl}
        targetOrigin={this.state.targetOrigin}
        anchorOrigin={this.state.anchorOrigin}
        onRequestClose={() => this.closePopover()}>
        <div style={{padding: '20px'}}>
          <h4>Add Participants</h4>

          <Toggle
            style={{width:100}}
            name="Friends"
            value="Friends"
            label="Friends"
            ref="friend"
            onToggle={(e) => this.handleOnChangeTextField(e)}
            defaultToggled />

          <Toggle
            style={{width:100}}
            name="Groups"
            value="Groups"
            label="Groups"
            ref="group"
            onToggle={(e) => this.handleOnChangeTextField(e)}
            defaultToggled />
            <TextField ref="textField" hintText="Title List" onChange={ e => this.handleOnChangeTextField(e)}  />
              <ul>
            {

              this.state.ListOfFriendsAndGroups.map( (item, index) => index<=5 && item.length!==0 ? <li style={{cursor: 'pointer'}} key={index} onClick={(e) => this.handleOnClickListParticipant(e, item)}>{item.name}</li> : null)
            }
            </ul>
            <button onClick={ e => this.handleOnClickAddFriendGroupToList(e)}> Add </button>
        </div>
      </Popover>
      <div className={`${this.state.isModifyList ? 'hidden' : 'row list listNotCompleted'}`}>
        <div className="col-xs-1"></div>
        <div className="col-xs-3">
          <Link to={`/list/${list.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>{ list.title }</Link>
        </div>

        <div className="col-xs-8" >

          <span className="btn btn-danger glyphicon glyphicon-remove-sign pull-right" onClick={(e) => this.handleOnClickRemove(e)} />
          <span className="btn btn-warning glyphicon glyphicon-wrench pull-right"  onClick={(e) => this.handleOnClickEdit(e)} />
          <span className="btn btn-default glyphicon glyphicon-sunglasses pull-right" ref="buttonPopover" onClick={this.show.bind(this, 'pop')}></span>

        </div>

      </div>

      <div className={`input-group ${this.state.isModifyList ? 'col-md-12' : 'hidden'}`}>
        <input className="form-control inputText" ref="title"/>
        <span className="input-group-btn">
          <button className="btn btn-danger glyphicon glyphicon-remove" type="button" onClick={e => this.handleCancelClick(e)}></button>
          <button className="btn btn-success glyphicon glyphicon-ok" type="button" onClick={e => this.handleOkClick(e)}></button>
        </span>
      </div>
    </div>
    );

  }

}


TaskTitle.propTypes = {
  list: PropTypes.object,
  friends: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired,
  onAddFriendGroupToList: PropTypes.func.isRequired

};

TaskTitle.defaultProps = {
  list: {}
};
