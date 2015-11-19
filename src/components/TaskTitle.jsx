import React, { Component, PropTypes } from 'react';
//import ItemList from './ItemList';
import { Link } from 'react-router';
import { Popover, TextField } from 'material-ui';

export default class TaskTitle extends Component {

  constructor(props){
    super(props);
    this.state = {
      isModifyList: false,
      activePopover: '',
      anchorEl: '',
      targetOrigin: {'horizontal':'left', 'vertical':'center'},
      anchorOrigin: {'horizontal':'left', 'vertical':'bottom'}
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
    onRemoveList(list.id);
  }

  handleOnClickAddParticipants(e){
    e.stopPropagation();

  }

  show(key, e) {
  e.stopPropagation();

  this.setState({
    activePopover:key,
    anchorEl:e.currentTarget,
  });
}

  render() {
    const { list } = this.props;
    return(
    <div>
      <Popover open={this.state.activePopover==='pop'}
        anchorEl={this.state.anchorEl}
        targetOrigin={this.state.targetOrigin}
        anchorOrigin={this.state.anchorOrigin}>
        <div style={{padding: '20px'}}>
          <h4>Add Participants</h4>
          <TextField />
        </div>
      </Popover>
      <div className={`${this.state.isModifyList ? 'hidden' : 'row list listNotCompleted'}`}>
        <div className="col-xs-1"></div>
        <div className="col-xs-3">
          <Link to={`/list/${list.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>{ list.title }</Link>
        </div>

        <div className="col-xs-8" >

          <span className="btn btn-danger glyphicon glyphicon-remove-sign pull-right" onClick={(e) => this.handleOnClickRemove(e)} />
          <span className="btn btn-warning glyphicon glyphicon-wrench pull-right"  onClick={(e) => this.handleOnClickEdit(e)} />
          <span className="btn btn-default pull-right" ref="buttonPopover" onClick={this.show.bind(this, 'pop')}>Add Participants</span>

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


TaskTitle.propTypes = {
  list: PropTypes.object,
  friends: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired,
  onAddFriendGroupToList: PropTypes.func.isRequired

};

TaskTitle.defaultProps = {
  list: {}
};
