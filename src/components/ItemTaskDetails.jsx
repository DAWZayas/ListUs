import React, { Component, PropTypes } from 'react';



export default class ItemTaskDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      isModifyTask: false
    };
  }

  handleOnClickEdit(e){
    e.stopPropagation();
    this.setState({ isModifyTask: true});
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

  render() {
    const { task } = this.props;
    return(
    <li role='presentation'>
        <a href='#' className={`${this.state.isModifyTask ? 'hidden' : 'col-md-12'}`}>
          <div>
            <span  style={{color: 'inherit', textDecoration: 'inherit'}}>{ task.title }</span>
            <span className="btn btn-danger glyphicon glyphicon-remove-sign pull-right" onClick={(e) => this.handleOnClickRemove(e)} />
            <span className="btn btn-warning glyphicon glyphicon-wrench pull-right"  onClick={(e) => this.handleOnClickEdit(e)} />
          </div>
        </a>


        <div className={`${this.state.isModifyTask ? 'row' : 'hidden'}`}>
          <input className="col-md-10 changeTask" ref="title"/>
          <span className="col-md-1">
            <button className="btn btn-danger" type="button" onClick={e => this.handleCancelClick(e)}><span className="glyphicon glyphicon-remove" /></button>
            <button className="btn btn-success pull-right" type="button" onClick={e => this.handleOkClick(e)}><span className="glyphicon glyphicon-ok" /></button>
          </span>
        </div>
   </li>
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
