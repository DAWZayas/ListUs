import React, { Component, PropTypes } from 'react';

import { Checkbox } from 'material-ui';


export default class ItemTaskDetails extends Component {

  constructor(props){
    super(props);
  }

  handleOnClickRemove(e){
    this.props.cleanAlert();
    e.stopPropagation();
    const { task, onRemoveTask } = this.props;
    onRemoveTask(task.id);
  }

  markAsDone(id){
    this.props.cleanAlert();
    this.props.markAsDone(id);
  }

  render() {

    const { task } = this.props;
    const taskId = task.id;
    return(
    <div>

      <span className="col-xs-2 alignCheckbox">
        <Checkbox className="checkbox" defaultChecked={task.done} onCheck={() => this.markAsDone(taskId)} style={{'width': '30px'}} name="doneTask" value="doneOrUndo" />
      </span>
      <li role="presentation">
        <div className={task.done ? 'col-xs-10 li-a generalTask taskDone' : 'col-xs-10 li-a generalTask'}>
           <span className="alignContent" style={{color: 'inherit', textDecoration: 'inherit'}}>
              { task.title===undefined ? '' : task.title }
           </span>
           <span disabled={task.done ? 'disabled' : ''} style={{'color': '#D9534F'}} className="alignTaskButton btn btn-default glyphicon glyphicon-remove-sign pull-right" onClick={(e) => this.handleOnClickRemove(e)} />
        </div>
     </li>
   </div>
    );
  }

}


ItemTaskDetails.propTypes = {
  task: PropTypes.object,
  onRemoveTask: PropTypes.func.isRequired,
  renderForce: PropTypes.func,
  markAsDone: PropTypes.func,
  cleanAlert: PropTypes.func
};

ItemTaskDetails.defaultProps = {
  task: {}
};
