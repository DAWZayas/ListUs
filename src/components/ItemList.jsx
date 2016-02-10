import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


export default class ItemList extends Component {

  constructor(props){
    super(props);
  }

  render() {
    const {list} = this.props;
    return(

        <Link className="Mylist-group-item" to={`/list/${list.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>
          {list.title}
        </Link>

    );
  }

  }

  ItemList.propTypes = {
    list: PropTypes.object
  };

  ItemList.defaultProps = {
    list: {}
  };
