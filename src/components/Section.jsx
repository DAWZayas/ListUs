import React, { Component, PropTypes } from 'react';
import List from '../components/List';

export default class Section extends Component {

  constructor(props){
    super(props);
  }

  render() {
    const {  lists, onEditList, onRemoveList } = this.props;
    return(
      <div className="article">

        <div className="lists">
            {
              lists.map( (list, index) => <List list={list} key={index} onRemoveList={onRemoveList} onEditList={onEditList}/> )
            }
        </div>
        <div className="col-md-12 center">
          <button className="btn btn-round btn-danger"> <span className="glyphicon glyphicon-plus" /> </button>
        </div>
      </div>
    );
  }
}

Section.propTypes = {
  lists: PropTypes.array,
  asideVisibility: PropTypes.object,
  onAddList: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired
};

Section.defaultProps = {
  lists: []
};
