import React, { Component, PropTypes } from 'react';
//import ItemList from './ItemList';
import { Dialog, ListItem } from 'material-ui';
import { List as Listt } from 'material-ui';
import { Link } from 'react-router';

export default class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      isModifyList: false
    };
  }

  handleOnClickEdit(e){
    e.stopPropagation();
    this.refs.dialogEdit.dismiss();
    this.setState({ isModifyList: true});
  }

  handleOkClick(e){
    e.stopPropagation();
    const newTitle = this.refs.title.value;
    const { onEditList, list } = this.props;
    onEditList(list.id, newTitle);
    this.setState({ isModifyList: false});
  }

  handleCancelClick(e){
    e.stopPropagation();
    this.setState({ isModifyList: false});
  }

  handleOnClickRemove(e){
    e.stopPropagation();
    this.refs.dialogEdit.dismiss();
    const { list, onRemoveList } = this.props;
    onRemoveList(list.id, list.title, list.date);
  }

  handleShowEdit(e, listId){
    e.preventDefault();
    this.refs.dialogEdit.show();
  }

  render() {

    const { list, tasks } = this.props;
    return(
    <div>
      <div className={`${this.state.isModifyList ? 'hidden' : 'row list listNotCompleted'}`}>
        <div className="col-xs-1"></div>
        <div className="col-xs-3">
          <Link to={`/list/${list.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>{ list.title }</Link>
        </div>
        <div className="col-xs-8" >
          <span className="badge">{tasks.filter(task => task.done===false).length}/{tasks.length}</span>
          <button type="button" className="btn btn-default pull-right" onClick={e=>this.handleShowEdit(e, list.id)} style={{height: '34.2px'}}> <span className="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
          <span className="dateBtn pull-right btn btn-default">{list.date}</span>

        </div>

      </div>

      <div className={`input-group ${this.state.isModifyList ? 'col-md-12' : 'hidden'}`}>
        <input className="form-control inputText" ref="title"/>
        <span className="input-group-btn">
          <button className="btn btn-danger glyphicon glyphicon-remove" type="button" onClick={e => this.handleCancelClick(e)}></button>
          <button className="btn btn-success glyphicon glyphicon-ok" type="button" onClick={e => this.handleOkClick(e)}></button>
        </span>
      </div>

      <Dialog ref="dialogEdit" title="Edit Options" >
        <Listt>
          <ListItem primaryText="Edit Name" onClick={(e) => this.handleOnClickEdit(e)} />
          <ListItem primaryText="Remove List" onClick={(e) => this.handleOnClickRemove(e)} />
        </Listt>
      </Dialog>

    </div>
    );

  }

}


List.propTypes = {
  list: PropTypes.object,
  tasks: PropTypes.array,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired
};

List.defaultProps = {
  list: {}
};
