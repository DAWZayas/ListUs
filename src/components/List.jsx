import React, { Component, PropTypes } from 'react';
//import ItemList from './ItemList';
import { Link } from 'react-router';
import ListsEdit from './ListsEdit';

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

  handleShowEdit(){
    this.refs.dialogEdit.show();
  }

  render() {

    const { list, tasks, onEditList, onRemoveList, onAddFriendGroupToList, lists, groups, friends, onRemoveFriendGroupToList } = this.props;
    return(
    <div>
      <div className={`${this.state.isModifyList ? 'hidden' : 'row list listNotCompleted'}`}>
        <div className="col-xs-1"></div>
        <div className="col-xs-3">
          <Link to={`/list/${list.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>{ list.title }</Link>
        </div>
        <div className="col-xs-8" >
          <span className="badge My-badge">{tasks.filter(task => task.done===false).length}/{tasks.length}</span>
            <ListsEdit
              list={list}
              lists={lists}
              friends={friends}
              groups={groups}
              onEditList={onEditList}
              onRemoveList={onRemoveList}
              onRemoveFriendGroupToList={onRemoveFriendGroupToList}
              onAddFriendGroupToList={onAddFriendGroupToList} />
          <span className="dateBtn pull-right btn btn-default">{list.date}</span>

        </div>

      </div>

    </div>
    );

  }

}


List.propTypes = {
  lists: PropTypes.array,
  list: PropTypes.object,
  tasks: PropTypes.array,
  friends: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired,
  onAddFriendGroupToList: PropTypes.func.isRequired,
  onRemoveFriendGroupToList: PropTypes.func.isRequired
};

List.defaultProps = {
  list: {}
};
