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




  render() {

    const { list, lists} = this.props;
    const tasks = [];
    return(
    <div>
      <div className="row list listNotCompleted">
        <div className="col-xs-1"></div>
        <div className="col-xs-3">
          <Link to={`/list/${list.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>{ list.title }</Link>
        </div>
        <div className="col-xs-8" >
          <span className="badge My-badge">{tasks.filter(task => task.done===false).length}/{tasks.length}</span>
            <ListsEdit
              list={list}
              lists={lists}
              removeList={this.props.removeList}
              onEditList={this.props.onEditList}

              registerListeners={this.props.registerListeners}
              unregisterListeners={this.props.unregisterListeners} />
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
  removeList: PropTypes.func,
  onEditList: PropTypes.func,
  /*tasks: PropTypes.array,
  friends: PropTypes.array,
  groups: PropTypes.array,
  onRemoveList: PropTypes.func,

  onAddFriendGroupToList: PropTypes.func,
  onRemoveFriendGroupToList: PropTypes.func,*/
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired
};

List.defaultProps = {

};
/*, tasks, onEditList, onRemoveList, onAddFriendGroupToList*/
/*, groups, friends, onRemoveFriendGroupToList} */


/*friends={friends}
groups={groups}

onRemoveList={onRemoveList}
onRemoveFriendGroupToList={onRemoveFriendGroupToList}
onAddFriendGroupToList={onAddFriendGroupToList}*/
