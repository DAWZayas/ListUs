import React, { Component, PropTypes } from 'react';
import ItemTaskDetails from './ItemTaskDetails';
import TaskTitle from './TaskTitle';
import { Dialog, TextField, FlatButton } from 'material-ui';

export default class ListDetails extends Component {

constructor(props){
  super(props);
}

validationTitle(title){
  const { tasks } = this.props;
  return title!=='' && tasks.filter( list => list.title===title).length===0;
}

openDialog(){
  this.refs.dialog.show();
}

onClickAdd(){
  const { onAddTask, list } = this.props;
  const title = this.refs.titleDialog.getValue();
  const idList = list.id;
  this.validationTitle(title) ? onAddTask(idList, title) : this.refs.dialog.dismiss();
  this.refs.dialog.dismiss();
  this.render();
}

onClickClose(){
  this.refs.dialog.dismiss();
}

render() {

  let customActions = [
    <FlatButton
      label="Cancel"
      secondary
      onClick={() => this.onClickClose()} />,
    <FlatButton
      label="Add"
      primary
      onClick={() => this.onClickAdd()} />
  ];
  const { list, onRemoveList, onEditList, tasks, onRemoveTask, onEditTask, friends, groups, onAddFriendGroupToList } = this.props;

  return(
    <div className="row section">
      <Dialog title="Dialog With Standard Actions" actions={customActions} ref="dialog">
        <TextField ref="titleDialog" hintText="Title List" />
      </Dialog>
      <div className="col-md-1">
      </div>
      <div className="col-md-10">
        <ul className="list-group listTitle">
          <TaskTitle list={list} onRemoveList={onRemoveList} onEditList={onEditList} friends={friends} groups={groups} onAddFriendGroupToList={onAddFriendGroupToList} />
        </ul>
      </div>
      <div className="article col-md-12">
        <ul className="nav nav-pills nav-stacked navMarginTop list-group">
          {
            tasks.map( (task, index) => index<6 ? <ItemTaskDetails key={index} task={task} onRemoveTask={onRemoveTask} onEditTask={onEditTask} /> : null)
          }
        </ul>
      </div>
      <div className="col-md-12 center">
        <button className="btn btn-round btn-danger" onClick={() => this.openDialog()} > <span className="glyphicon glyphicon-plus" /> </button>
      </div>
    </div>
  );
}


}


ListDetails.propTypes = {
  list: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  friends: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired,
  onAddFriendGroupToTask: PropTypes.func.isRequired,
  onAddFriendGroupToList: PropTypes.func.isRequired
};
