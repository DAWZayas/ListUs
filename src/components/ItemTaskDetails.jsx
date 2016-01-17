import React, { Component, PropTypes } from 'react';

import { Checkbox } from 'material-ui';


export default class ItemTaskDetails extends Component {

  constructor(props){
    super(props);
  }

  handleOnClickRemove(e){
    e.stopPropagation();
    const { task, onRemoveTask } = this.props;
    onRemoveTask(task.id);
  }

  markAsDone(){
    const { task, renderForce } = this.props;
    let undoOrDo = task.done;
    task.done = !undoOrDo;
    this.forceUpdate();
    setTimeout(() => renderForce(), 100);
  }

  render() {
    const { task } = this.props;
    return(
    <div>

      <span className="col-xs-2 alignCheckbox">
        <Checkbox className="checkbox" defaultChecked={task.done} onCheck={this.markAsDone.bind(this)} style={{'width': '30px'}} name="doneTask" value="doneOrUndo" />
      </span>
      <li role="presentation">
        <div className={`${task.done ? 'col-xs-10 li-a generalTask taskDone' : 'col-xs-10 li-a generalTask'}`}>
           <span className="alignContent" style={{color: 'inherit', textDecoration: 'inherit'}}>
              { task.title===undefined ? '' : task.title }
           </span>
           <span disabled={`${task.done ? 'disabled' : ''}`} style={{'color': '#D9534F'}} className="alignTaskButton btn btn-default glyphicon glyphicon-remove-sign pull-right" onClick={(e) => this.handleOnClickRemove(e)} />
        </div>
     </li>
   </div>
    );
  }

}


ItemTaskDetails.propTypes = {
  task: PropTypes.object,
  onRemoveTask: PropTypes.func.isRequired,
  renderForce: PropTypes.func
};

ItemTaskDetails.defaultProps = {
  task: {}
};
