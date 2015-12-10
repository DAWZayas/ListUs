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

  _handleCloseDialogList(){
		this.setState({showDialog: false});
	}

  validationTitle(title){
    const { tasks } = this.props;
    return title!=='' && Object.values(tasks).filter( list => list.title===title).length===0;
  }

  openDialog(){
    this.setState({showDialog: true});
  }

  handleClickAdd(){
    const { onAddTask, list } = this.props;
    const title = this.refs.taskText.getValue();
    const idList = list.id;
    this.validationTitle(title) ? onAddTask(idList, title) : this.refs.dialog.dismiss();
    this.refs.dialog.dismiss();
  }

  render() {

    const { list,  onEditList, onRemoveList, onAddFriendGroupToList, lists, groups, friends, onRemoveFriendGroupToList } = this.props;
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
        Name of the new task:
        <TextField ref="taskText" autoFocus />
			</Dialog>

      <div className="row list listNotCompleted">

        <div className="col-xs-4">
          <Link to={`/list/${list.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>{ list.title }</Link>
        </div>
        <div className="col-xs-8" >

            <ListsEdit
              list={list}
              lists={lists}
              friends={friends}
              groups={groups}
              onEditList={onEditList}
              onRemoveList={onRemoveList}
              onRemoveFriendGroupToList={onRemoveFriendGroupToList}
              onAddFriendGroupToList={onAddFriendGroupToList} />
            <span className="btn pull-right btn-default" onClick={() => this.openDialog()} >Add</span>
            <span className="dateBtn pull-right btn btn-default">{list.date}</span>
        </div>

      </div>

    </div>
    );

  }

}


TaskTitle.propTypes = {
  list: PropTypes.object.isRequired,
  lists: PropTypes.array,
  friends: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired,
  onAddFriendGroupToList: PropTypes.func.isRequired,
  onRemoveFriendGroupToList: PropTypes.func.isRequired
};

TaskTitle.defaultProps = {
  list: {}
};
