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


componentWillMount() {
  this.props.registerListeners();
}

componentWillUnmount() {
  this.props.unregisterListeners();
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

numberOfPages(tasksToShow){
  return Math.ceil(Object.values(tasksToShow).length/6);
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


  const { list, lists, removeList, editList, tasks, addTask, removeTask, editTask, friends, groups, addFriendGroupToList, removeFriendGroupToList, markAsDone } = this.props;

  let tasksToShow;
  let showTasks = this.state.tasksShown;
  if (showTasks === 'All') {
    tasksToShow = tasks;
  }

  if (showTasks === 'To do') {
    tasksToShow = Object.values(tasks).reduce ( (tasks, task) => !task.done ? Object.assign({}, tasks, {[task.id]:task}) : tasks, {});
  }

  if (showTasks === 'Done') {
    tasksToShow = Object.values(tasks).reduce ( (tasks, task) => task.done ? Object.assign({}, tasks, {[task.id]:task}) : tasks, {});
  }

  const numberOfPages = this.numberOfPages(tasksToShow)===0 ? 1 : this.numberOfPages(tasksToShow);
  if(this.state.page>this.numberOfPages(tasksToShow) && this.state.page !== 1) this.setState({page: this.numberOfPages(tasksToShow)});
  const lastNumPage = this.state.page+2<=numberOfPages ? this.state.page+2 : this.state.page+1<=numberOfPages ? this.state.page+1 : this.state.page;
  const initNumPage = this.state.page-2>0 ? this.state.page-2 : this.state.page-1>0 ? this.state.page-1 : this.state.page;
  const initTask = this.state.page*6-6;
  const lastTask = this.state.page*6;

  return(

    <div className="section">
      <div className="col-md-12 heigthTitle">
        <ul className="list-group listTitle">
          <TaskTitle
            list={list}
            lists={lists}
            tasks={tasks}
            friends={friends}
            groups={groups}
            onAddTask={addTask}
            onEditList={editList}
            onRemoveList={removeList}
            onRemoveFriendGroupToList={removeFriendGroupToList}
            onAddFriendGroupToList={addFriendGroupToList} />

        </ul>
      </div>

      <div className="col-xs-12">
        <ul className="nav nav-tabs" style={{'display': 'flex', 'justifyContent': 'space-around'}}>

          <li role="presentation" className={`biggerTasks ${this.state.tasksShown === 'All' ? 'active' : ''}`}><a onClick={(e) => this.changeView(e)} href="#">All</a></li>
          <li role="presentation" className={`biggerTasks ${this.state.tasksShown === 'Done' ? 'active' : ''}`}><a onClick={(e) => this.changeView(e)} href="#">Done</a></li>
          <li role="presentation" className={`biggerTasks ${this.state.tasksShown === 'To do' ? 'active' : ''}`}><a onClick={(e) => this.changeView(e)} href="#">To do</a></li>
        </ul>
      </div>
      <div className="article col-md-12">
        <ul className="nav nav-pills nav-stacked navMarginTop list-group">
          {
            Object.values(tasksToShow).map( (task, index) => index>=initTask && index<lastTask ? <ItemTaskDetails markAsDone={markAsDone} renderForce={this.renderForce.bind(this)} key={index} task={task} onRemoveTask={removeTask} onEditTask={editTask} /> : null)
          }
        </ul>
        <div className={`${Object.values(tasksToShow).length === 0 ? 'col-xs-12' : 'hidden'}`}>
          <h3 style={{paddingLeft: '2em', fontStyle: 'italic'}}>No tasks to show</h3>
        </div>
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
  addTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
  addFriendGroupToList: PropTypes.func.isRequired,
  removeFriendGroupToList: PropTypes.func.isRequired,
  markAsDone: PropTypes.func.isRequired,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired
};
