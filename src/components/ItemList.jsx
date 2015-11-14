import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';



export default class ItemList extends Component {


constructor(props){
  super(props);
}

render() {
  const {list} = this.props;
  return(
    <li>
      <Link to={`/list/${list.id}`}>
        {list.title}
      </Link>
    </li>
  );
}

}

ItemList.propTypes = {
  list: PropTypes.object
};

ItemList.defaultProps = {
  list: {}
};
