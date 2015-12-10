import React, { Component, PropTypes } from 'react';
import ItemTaskDetails from './ItemTaskDetails';
import TaskTitle from './TaskTitle';

import CommentsContainer from '../containers/CommentsContainer';


export default class ListDetails extends Component {

constructor(props){
  super(props);
  this.state = {
    page: 1,
    tasksShown: 'All'
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
}

onClickClose(){
  this.refs.dialog.dismiss();
}

onClickPagination(e){
  let newPage = parseInt(e.target.text);
  this.setState({page: newPage});
}

onClickPrevious(){
  if(1!==this.state.page){
    this.setState({page: this.state.page-1});
  }
}

numberOfPages(){
  const { tasks } = this.props;
  return Math.ceil(Object.values(tasks).length/6);
}

onClickNext(e){
  e.preventDefault();
  if(this.numberOfPages()!==this.state.page){
    this.setState({page: this.state.page+1});
  }
}

handleOnKeyDown(event){
  const ENTER_KEY = 13;
  if (event.keyCode === ENTER_KEY) {
    this.onClickAdd();
  }
}

changeView(e){
  const option = e.target.innerHTML;
  this.setState({
    tasksShown: option
  });
}

renderForce(){
  this.forceUpdate();
}

render() {

  const numberOfPages = this.numberOfPages()===0 ? 1 : this.numberOfPages();
  if(this.state.page>this.numberOfPages()) this.setState({page: this.numberOfPages()});
  const lastNumPage = this.state.page+2<=numberOfPages ? this.state.page+2 : this.state.page+1<=numberOfPages ? this.state.page+1 : this.state.page;
  const initNumPage = this.state.page-2>0 ? this.state.page-2 : this.state.page-1>0 ? this.state.page-1 : this.state.page;
  const initTask = this.state.page*6-6;
  const lastTask = this.state.page*6;

  const { list, lists, onRemoveList, onEditList, tasks, onAddTask, onRemoveTask, onEditTask, friends, groups, onAddFriendGroupToList, onRemoveFriendGroupToList } = this.props;

  let tasksToShow;
  let showTasks = this.state.tasksShown;

  if (showTasks === 'All') {
    tasksToShow = tasks;
  }

  if (showTasks === 'Undo') {
    tasksToShow = Object.values(tasks).reduce ( (tasks, task) => !task.done ? Object.assign({}, tasks, {[task.id]:task}) : tasks, {});
  }

  if (showTasks === 'Done') {
    tasksToShow = Object.values(tasks).reduce ( (tasks, task) => task.done ? Object.assign({}, tasks, {[task.id]:task}) : tasks, {});
  }

  return(

    <div className="row section">
      <div className="col-md-12 heigthTitle">
        <ul className="list-group listTitle">
          <TaskTitle
            list={list}
            lists={lists}
            friends={friends}
            groups={groups}
            onAddTask={onAddTask}
            onEditList={onEditList}
            onRemoveList={onRemoveList}
            onRemoveFriendGroupToList={onRemoveFriendGroupToList}
            onAddFriendGroupToList={onAddFriendGroupToList} />

        </ul>
      </div>
      <div className="col-xs-12"  style={{'display': 'flex', 'justify-content': 'space-around'}}>
        <ul className="nav nav-tabs">
          <li role="presentation" className={`biggerTasks ${this.state.tasksShown === 'All' ? 'active' : ''}`}><a onClick={(e) => this.changeView(e)} href="#">All</a></li>
          <li role="presentation" className={`biggerTasks ${this.state.tasksShown === 'Done' ? 'active' : ''}`}><a onClick={(e) => this.changeView(e)} href="#">Done</a></li>
          <li role="presentation" className={`biggerTasks ${this.state.tasksShown === 'Undo' ? 'active' : ''}`}><a onClick={(e) => this.changeView(e)} href="#">Undo</a></li>
        </ul>
      </div>
      <div className="article col-md-12">
        <ul className="nav nav-pills nav-stacked navMarginTop list-group">
          {
            Object.values(tasksToShow).map( (task, index) => index>=initTask && index<lastTask ? <ItemTaskDetails renderForce={this.renderForce.bind(this)} key={index} task={task} onRemoveTask={onRemoveTask} onEditTask={onEditTask} /> : null)
          }
        </ul>
        <div className={`${Object.values(tasksToShow).length === 0 ? 'col-xs-12' : 'hidden'}`}>
          <h3>No tasks to show</h3>
        </div>
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
            Array(numberOfPages).fill('').map( (a, index) => index+1>=initNumPage && index+1<=lastNumPage ? <li key={index} ><a className={ `${index+1!==this.state.page ? ' btn-default' : 'active btn-info'}`} href="#" onClick={(e) => this.onClickPagination(e)}>{index+1}</a></li> : '' )
          }
            <li>
            <a href="#" className="btn-default" aria-label="Next" onClick={(e) => this.onClickNext(e)}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="col-md-12 center">
      <CommentsContainer />
      </div>
    </div>
  );
}


}

ListDetails.propTypes = {
  list: PropTypes.object.isRequired,
  lists: PropTypes.array,
  tasks: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired,
  onAddFriendGroupToList: PropTypes.func.isRequired,
  onRemoveFriendGroupToList: PropTypes.func.isRequired
};
