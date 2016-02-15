import React, { Component, PropTypes } from 'react';
//import ItemList from './ItemList';
import { Link } from 'react-router';
import ListsEdit from './ListsEdit';
import { Dialog, TextField, FlatButton } from 'material-ui';
export default class TaskTitle extends Component {

  constructor(props){
    super(props);
    this.state = {
      showDialog: false
    };
  }

  _handleCloseDialog(){
		this.setState({showDialog: false});
	}

  validationTitle(title){
    const { tasks } = this.props;
    return title!=='' && Object.values(tasks).filter( list => list.title===title).length===0;
  }

  openDialog(){
    this.props.cleanAlert();
    this.setState({showDialog: true});
  }

  closeDialog(){
    this.setState({showDialog: false});
  }

  handleClickAdd(){
    const { onAddTask, list } = this.props;
    const title = this.refs.taskText.getValue();
    if(this.validationTitle(title)) onAddTask(list.id, title);
    this._handleCloseDialog();
  }

  render() {

    let {   onEditList, onRemoveList, onAddFriendGroupToList, lists, groups, friends, onRemoveFriendGroupToList } = this.props;

    if(friends === undefined) friends = [];

    let customActions = [
      <FlatButton
        label="Cancel"
        secondary
        onClick={() => this._handleCloseDialog()} />,
      <FlatButton
        label="Add"
        primary
        onClick={() => this.handleClickAdd()} />
    ];
    return(
    <div>
        <Dialog
  				ref="dialog"
  				title="Add Task"
  				actions={customActions}
  				open={this.state.showDialog}
    			onRequestClose={this._handleCloseDialog} >
            <span style={{'fontSize': '14px', 'marginRight': '10px'}}>Name of the new task:</span>
            <TextField className="dialogFriendAndGroup" ref="taskText" autoFocus />
  			</Dialog>

        <div className="row list listNotCompleted">

          <div className="col-xs-4">
            { Object.keys(this.props.list).length!==0 ?
              <Link to={`/list/${this.props.list.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>{this.props.list.title}</Link>
              : ''
            }
          </div>
          <div className="col-xs-8" >
            { Object.keys(this.props.list).length!==0 ?
              <ListsEdit
                list={this.props.list}
                lists={lists}
                friends={friends}
                groups={groups}
                onEditList={onEditList}
                removeList={onRemoveList}
                onRemoveFriendGroupToList={onRemoveFriendGroupToList}
                onAddFriendGroupToList={onAddFriendGroupToList}
                user={this.props.user}
                cleanAlert={this.props.cleanAlert} />
              : '' }
              <span className="btn pull-right btn-default" onClick={() => this.openDialog()} >Add</span>
              <span className="dateBtn pull-right btn btn-default">{this.props.list.date}</span>
          </div>

        </div>
    </div>
    );

  }

}


TaskTitle.propTypes = {
  list: PropTypes.object,
  lists: PropTypes.array,
  tasks: PropTypes.object,
  friends: PropTypes.array,
  groups: PropTypes.array,
  onAddTask: PropTypes.func,
  onRemoveList: PropTypes.func,
  onEditList: PropTypes.func,
  onAddFriendGroupToList: PropTypes.func,
  onRemoveFriendGroupToList: PropTypes.func,
  user: PropTypes.object,
  cleanAlert: PropTypes.func
};

TaskTitle.defaultProps = {

};
