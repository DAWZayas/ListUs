import React, { Component, PropTypes } from 'react';
//import ItemList from './ItemList';
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
    const { list, onRemoveList } = this.props;
    onRemoveList(list.id, list.title, list.date);
  }

  render() {
    const { list } = this.props;
    return(
    <div>
      <div className={`${this.state.isModifyList ? 'hidden' : 'row list listNotCompleted'}`}>
        <div className="col-xs-1"></div>
        <div className="col-xs-3">
          <Link to={`/list/${list.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>{ list.title }</Link>
        </div>
        <div className="col-xs-4"></div>
        <div className="col-xs-4" >
          <span className="btn btn-danger glyphicon glyphicon-remove-sign pull-right" onClick={(e) => this.handleOnClickRemove(e)} />
          <span className="btn btn-warning glyphicon glyphicon-wrench pull-right"  onClick={(e) => this.handleOnClickEdit(e)} />
        </div>

      </div>

      <div className={`input-group ${this.state.isModifyList ? 'col-md-12' : 'hidden'}`}>
        <input className="form-control inputText" ref="title"/>
        <span className="input-group-btn">
          <button className="btn btn-danger glyphicon glyphicon-remove" type="button" onClick={e => this.handleCancelClick(e)}></button>
          <button className="btn btn-success glyphicon glyphicon-ok" type="button" onClick={e => this.handleOkClick(e)}></button>
        </span>
      </div>
    </div>
    );

  }

}


List.propTypes = {
  list: PropTypes.object,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired
};

List.defaultProps = {
  list: {}
};
