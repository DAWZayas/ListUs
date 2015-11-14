import React, { Component, PropTypes } from 'react';
import Nav from './Nav';
import { Link } from 'react-router';
import ItemList from './ItemList';
import { isEqlTitle } from '../utils';

export default class Header extends Component{

  constructor(props){
    super(props);
    this.state = {
      isVisible: false,
      newLists: []
    };
  }

  handleVisibility(){
    this.state.isVisible ? this.setState({ isVisible: false }) : this.setState({ isVisible: true });
  }

  handleFilterList(event){
 		 	let updateLists = this.props.lists;
 		 	updateLists = updateLists.filter(function(list){
 		 		return list.title.toLowerCase().search(
       			event.target.value.toLowerCase()) !== -1;
 		});
 		this.setState({newLists: updateLists});
 	}

  render() {
    return(

      <div className="header">
        <div className="row upper">
          <div className="col-xs-1"><Nav /></div>
          <div className="input-group col-xs-2">
            <div className="input-group-btn">
              <span className="btn biggerGlyphicon glyphicon glyphicon-search pull-left" aria-hidden="true" onClick={ () => this.handleVisibility()} />
            </div>
            <input ref="inputText" type="text" className={`${this.state.isVisible ? 'form-control' : 'hidden' }`} placeholder="Search for..." onChange={ (event) => this.handleFilterList(event)}/>
            <ul className={`${this.state.isVisible ? '' : 'hidden' }`}>
              {
                this.state.newLists.map( (list, index) => <ItemList key={index} list={list} /> )
              }
            </ul>
          </div>
          <div className="col-xs-6"></div>
          <div className="col-xs-2">
            <span className="biggerGlyphicon glyphicon glyphicon-calendar" aria-hidden="true"></span>
          </div>
          <div className="col-xs-1"></div>
        </div>

        <Link to="/list"><img className="image" src={"https://facebook.github.io/react/img/logo.svg"}/></Link>
        <h4>ListUs</h4>

      </div>
    );
  }

}

Header.propTypes = {
  lists: PropTypes.array.isRequired
};

Header.defaultProps = {
  lists: []
};
