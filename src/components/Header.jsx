import React, { Component, PropTypes } from 'react';
import Nav from './Nav';
import { Link } from 'react-router';
import ItemList from './ItemList';


export default class Header extends Component{

  constructor(props){
    super(props);
    this.state = {
      isVisible: false,
      newLists: []
    };
  }

  handleOnBlur(){
    this.handleVisibility();
  }

  handleVisibility(){
    this.refs.inputText.value="";
    this.state.isVisible ? this.setState({ isVisible: false }) : this.setState({ isVisible: true });
    this.setState({newLists: []});
  }

  handleFilterList(event){
 		let updateLists = this.props.lists;
 		updateLists = updateLists.filter( list=> list.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
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
            <input ref="inputText" type="text" className={`${this.state.isVisible ? 'form-control' : 'hidden' }`} placeholder="Search your list..." onChange={ (event) => this.handleFilterList(event)} onBlur={ () => this.handleOnBlur()}/>
            <ul className={`${this.state.isVisible ? '' : 'hidden' }`}>
              {
                this.state.newLists.map( (list, index) => index<5 ? <ItemList key={index} list={list} /> : null  )
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
