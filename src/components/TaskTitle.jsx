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
      newParticipant: {},
      toggleFriend: true,
      toggleGroup: true,
      textToSearch: ''
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
    onRemoveList(list.id, list.title, list.date);
  }

  isInTheArray(idParticipants, list){
    const leng = list.participants.filter(participant => participant.id!==idParticipants).length;
    return list.participants.length!==leng;
  }

  handleOnChangeTextField(){
    const textToSearch = this.refs.textField.getValue().toLowerCase();
    this.setState({textToSearch: textToSearch});
  }


  handleOnClickListParticipant(e, participant){
    e.stopPropagation();
    this.refs.textField.setValue(participant.name);
    this.setState({
      newParticipant: participant,
      textToSearch: participant.name
    });
  }

  handleOnClickAddFriendGroupToList(e){
    e.stopPropagation();
    const { list, onAddFriendGroupToList } = this.props;
    Object.keys(this.state.newParticipant).length===0 || this.isInTheArray(this.state.newParticipant.id, list) ? '' : onAddFriendGroupToList(list.id, this.state.newParticipant) ;
    this.closePopover();
  }

  show(key, e) {
    e.stopPropagation();
    this.setState({
      activePopover:key,
      anchorEl:e.currentTarget
    });
  }

  closePopover() {
    this.clearTextField();
    this.setState({
      activePopover:'none',
      newParticipant: {},
      textToSearch: ''
    });
  }

  clearTextField(){
    this.refs.textField.setValue('');
  }

  handleOnToggleFriend(){
    this.setState({ toggleFriend: !this.state.toggleFriend});
  }

  handleOnToggleGroup(){
    this.setState({toggleGroup: !this.state.toggleGroup});
  }

  componentWillUnmount(){
    debugger;
    this.refs.popover.open =false;

  }

  render() {

    const { list, friends, groups } = this.props;
    let listOfFriendsAndGroups = [];
    if(this.state.textToSearch!==''){
      const listFriends = this.state.toggleFriend ? [].concat(friends.filter( friend => !this.isInTheArray(friend.id, list ))) : [];
      const listGroups = this.state.toggleGroup ? [].concat(groups.filter( group => !this.isInTheArray(group.id, list ))) : [];
      listOfFriendsAndGroups = listFriends.concat(listGroups).filter( item=> item.name.toLowerCase().search(this.state.textToSearch) !== -1);
    }
    return(
    <div>
      <Popover open={this.state.activePopover==='pop'}
        anchorEl={this.state.anchorEl}
        targetOrigin={this.state.targetOrigin}
        anchorOrigin={this.state.anchorOrigin}
        ref="popover"
        onRequestClose={() => this.closePopover()}>
        <div style={{padding: '20px'}}>
          <h4>Add Participants</h4>

          <Toggle
            style={{width:100}}
            name="Friends"
            value="Friends"
            label="Friends"
            ref="friend"
            onToggle={() => this.handleOnToggleFriend()}
            defaultToggled />

          <Toggle
            style={{width:100}}
            name="Groups"
            value="Groups"
            label="Groups"
            ref="group"
            onToggle={() => this.handleOnToggleGroup()}
            defaultToggled />
          <TextField ref="textField" hintText="Title List" onChange={ () => this.handleOnChangeTextField()}  />
              <ul>
            {
              listOfFriendsAndGroups.map( (item, index) => index<=5 && item.length!==0 ? <li style={{cursor: 'pointer'}} key={index} onClick={(e) => this.handleOnClickListParticipant(e, item)}>{item.name}</li> : null)
            }
            </ul>
            <button onClick={ e => this.handleOnClickAddFriendGroupToList(e)}> Add </button>
        </div>
      </Popover>
      <div className={`${this.state.isModifyList ? 'hidden' : 'row list listNotCompleted'}`}>

        <div className="col-xs-4">
          <Link to={`/list/${list.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>{ list.title }</Link>
        </div>
        <div className="col-xs-8" >
          <span className="btn btn-danger glyphicon glyphicon-remove-sign pull-right" onClick={(e) => this.handleOnClickRemove(e)} />
          <span className="btn btn-warning glyphicon glyphicon-wrench pull-right"  onClick={(e) => this.handleOnClickEdit(e)} />
          <span className="btn btn-default glyphicon glyphicon-sunglasses pull-right" ref="buttonPopover" onClick={this.show.bind(this, 'pop')}></span>
          <span className="dateBtn pull-right btn btn-default">{list.date}</span>

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
