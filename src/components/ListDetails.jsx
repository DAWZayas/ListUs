import React, { Component, PropTypes } from 'react';
import ItemTaskDetails from './ItemTaskDetails';
import List from './List';

export default class ListDetails extends Component {

constructor(props){
  super(props);
}

render() {
  const { list, onRemoveList, onEditList, tasks, onRemoveTask, onEditTask } = this.props;
  return(
    <div className="row section">
      <div className="col-md-1">
      </div>
      <div className="col-md-10">
        <ul className="list-group">
          <List list={list} onRemoveList={onRemoveList} onEditList={onEditList}/>
        </ul>
      </div>

      <div className="article col-md-12">
        <ul className="nav nav-pills nav-stacked navMarginTop">
          {
            tasks.map( (task, index) => <ItemTaskDetails key={index} task={task} onRemoveTask={onRemoveTask} onEditTask={onEditTask} />)
          }
        </ul>
      </div>
    </div>
  );
}


}


ListDetails.propTypes = {
  list: PropTypes.object.isRequired,
  tasks: PropTypes.array,
  onAddTask: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired
};
