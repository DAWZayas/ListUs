import React, { Component, PropTypes } from 'react';

import { Checkbox } from 'material-ui';


export default class ItemTaskDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      isModifyTask: false
    };
  }

  handleOnClickEdit(e){
    e.stopPropagation();
    const { task } = this.props;
    this.setState({ isModifyTask: true});
    this.refs.title.value = task.title;
  }

  handleOkClick(e){
    e.stopPropagation();
    const newTitle = this.refs.title.value;
    const { onEditTask, task } = this.props;
    onEditTask(task.id, newTitle);
    this.setState({ isModifyTask: false});
  }

  handleCancelClick(e){
    e.stopPropagation();
    this.setState({ isModifyTask: false});
  }

  handleOnClickRemove(e){
    e.stopPropagation();
    const { task, onRemoveTask } = this.props;
    onRemoveTask(task.id);
  }

  markAsDone(){
    const { task } = this.props;
    let undoOrDo = task.done;
    task.done = !undoOrDo;
    this.forceUpdate();
  }

  render() {
    const { task } = this.props;
    return(
    <div style={{'verticalAlign': 'middle'}}>
      <span className="col-xs-2 alignContent">
        <Checkbox onCheck={this.markAsDone.bind(this)} style={{'width': '30px'}} name="doneTask" value="doneOrUndo" />
      </span>
      <li role="presentation">
          
          <div className={`${this.state.isModifyTask ? 'hidden' : task.done ? 'col-xs-10 li-a taskDone' : 'col-xs-10 li-a'}`}>  
              <span className="alignContent" style={{color: 'inherit', textDecoration: 'inherit'}}>{ task.title }</span>
              <span disabled={`${task.done ? 'disabled' : ''}`} className="alignContent btn btn-danger glyphicon glyphicon-remove-sign pull-right" onClick={(e) => this.handleOnClickRemove(e)} />
              <span disabled={`${task.done ? 'disabled' : ''}`} className="alignContent btn btn-warning glyphicon glyphicon-wrench pull-right"  onClick={(e) => this.handleOnClickEdit(e)} />
          </div>


          <div className={`input-group ${this.state.isModifyTask ? 'col-md-12 marginBottomInput' : 'hidden'}`}>
            <input className="form-control inputText" ref="title"/>
            <span className="input-group-btn">
              <button className="btn btn-danger glyphicon glyphicon-remove" type="button" onClick={e => this.handleCancelClick(e)}></button>
              <button className="btn btn-success glyphicon glyphicon-ok" type="button" onClick={e => this.handleOkClick(e)}></button>
            </span>
          </div>
     </li>
   </div>
    );
  }

}


ItemTaskDetails.propTypes = {
  task: PropTypes.object,
  onRemoveTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired
};

ItemTaskDetails.defaultProps = {
  task: {}
};
