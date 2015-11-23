import React, { Component, PropTypes } from 'react';
import ItemTaskDetails from './ItemTaskDetails';
import TaskTitle from './TaskTitle';
import { Dialog, TextField, FlatButton } from 'material-ui';

export default class ListDetails extends Component {

constructor(props){
  super(props);
  this.state = {
    page: 1,
    lastTask: 6,
    initTask: 0,
    initNumPage: 1,
    lastNumPage: 3
  };
}


validationTitle(title){
  const { tasks } = this.props;
  return title!=='' && Object.values(tasks).filter( list => list.title===title).length===0;
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
  this.calculateArrayPagination(this.state.page);
}

onClickClose(){
  this.refs.dialog.dismiss();
}

onClickPagination(e){
  let numPage = parseInt(e.target.text);
  this.calculateArrayPagination(numPage);
}

onClickPrevious(){
  if(1!==this.state.page){
    const newPage = this.state.page-1;
    this.calculateArrayPagination(newPage);
  }
}

numberOfPages(){
  const { tasks } = this.props;
  return Math.ceil(Object.values(tasks).length/6);
}

onClickNext(e){
  e.preventDefault();
  if(this.numberOfPages()!==this.state.page){
    const newPage = this.state.page+1;
    this.calculateArrayPagination(newPage);
  }
}

calculateArrayPagination(newPage){
  const { lastNumPage, initNumPage } = this.state;
  const newLastNumPage = newPage+2<=this.numberOfPages() ? newPage+2 : newPage+1<=this.numberOfPages() ? newPage+1 : lastNumPage;
  const newInitNumPage = newPage-2>0 ? newPage-2 : newPage-1>0 ? newPage-1 : initNumPage;
  this.setState({ page: newPage, lastTask: newPage*6, initTask: newPage*6-6, lastNumPage: newLastNumPage, initNumPage: newInitNumPage});
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
            Object.values(tasks).map( (task, index) => index>=this.state.initTask && index<this.state.lastTask ? <ItemTaskDetails key={index} task={task} onRemoveTask={onRemoveTask} onEditTask={onEditTask} /> : null)
          }
        </ul>
      </div>
      <div className="col-md-12 center">
        <button className="btn btn-round btn-danger" onClick={() => this.openDialog()} > <span className="glyphicon glyphicon-plus" /> </button>
      </div>
      <div className="col-md-12 center pagination-tasks">
        <ul className="pagination">
          <li>
            <a href="#" className="btn-default" aria-label="Previous" onClick={(e) => this.onClickPrevious(e)}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {
            Array(this.numberOfPages()).fill('').map( (a, index) => index+1>=this.state.initNumPage && index+1<=this.state.lastNumPage ? <li key={index} ><a className={ `${index+1!==this.state.page ? ' btn-default' : ' btn-info'}`} href="#" onClick={(e) => this.onClickPagination(e)}>{index+1}</a></li> : '' )
          }
            <li>
            <a href="#" className="btn-default" aria-label="Next" onClick={(e) => this.onClickNext(e)}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}


}


ListDetails.propTypes = {
  list: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
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
