import React, { Component, PropTypes } from 'react';
//import ItemList from './ItemList';
import { Link } from 'react-router';
import ListsEdit from './ListsEdit';

export default class TaskTitle extends Component {

  constructor(props){
    super(props);
  }


  render() {

    const { list,  onEditList, onRemoveList, onAddFriendGroupToList, lists, groups, friends, onRemoveFriendGroupToList } = this.props;

    return(
    <div>

      <div className="row list listNotCompleted">

        <div className="col-xs-4">
          <Link to={`/list/${list.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>{ list.title }</Link>
        </div>
        <div className="col-xs-8" >

          <span className="dateBtn pull-right btn btn-default">{list.date}</span>
            <ListsEdit
              list={list}
              lists={lists}
              friends={friends}
              groups={groups}
              onEditList={onEditList}
              onRemoveList={onRemoveList}
              onRemoveFriendGroupToList={onRemoveFriendGroupToList}
              onAddFriendGroupToList={onAddFriendGroupToList} />
        </div>

      </div>

    </div>
    );

  }

}


TaskTitle.propTypes = {
  list: PropTypes.object.isRequired,
  lists: PropTypes.array,
  friends: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired,
  onAddFriendGroupToList: PropTypes.func.isRequired,
  onRemoveFriendGroupToList: PropTypes.func.isRequired
};

TaskTitle.defaultProps = {
  list: {}
};
