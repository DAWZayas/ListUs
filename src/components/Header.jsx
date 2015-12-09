import React, { Component, PropTypes } from 'react';
import Nav from './Nav';
import { Link } from 'react-router';
import ItemList from './ItemList';

import { clearUser } from '../utils/functions';


export default class Header extends Component{

  constructor(props){
    super(props);
    this.state = {
      isVisible: false,
      newLists: []
    };
  }

  handleOnBlur(){
    setTimeout(() => this.handleVisibility(), 300);
  }

  handleVisibility(){
    this.refs.inputText.value='';
    this.state.isVisible ? this.setState({ isVisible: false }) : this.setState({ isVisible: true });
    this.setState({newLists: []});
  }

  handleFilterList(event){
 		let updateLists = this.props.lists;
 		updateLists = updateLists.filter( list=> list.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
 		this.setState({newLists: updateLists});
 	}

  handleClearUser(e){
    e.preventDefault();
    const { onSetUser, onSetLists, onSetTasks, onSetGroups } = this.props;
    onSetUser({});
    onSetLists([]);
    onSetTasks({});
    onSetGroups([]);
  }

  

  render() {
    return(

      <header className="header">

          <div className="principal">
            <div style={{display: 'flex'}}>
              <Nav />

              <Link to="/calendar">
                <button className="btn btn-info" style={{marginTop: 0}}>
                  <span className=" biggerGlyphicon  glyphicon  glyphicon-calendar" aria-hidden="true"></span>
                </button>
              </Link>
            </div>

            <div >
              <Link style={{display: 'flex'}} to="/list">
                <img className="image" src={"https://facebook.github.io/react/img/logo.svg"}/>
                <h4 style={{color: 'white'}}>ListUs</h4>
              </Link>
            </div>

            <button className="btn btn-info"  onClick={e=>this.handleClearUser(e)}>
              <span ref="span" className="biggerGlyphicon glyphicon glyphicon-off"></span>
            </button>
          </div>

          <div className="navegador">

            <div className="search">
              <div className="search-btn-input">
                <button className="btn btn-info">
                  <span className="biggerGlyphicon glyphicon glyphicon-search pull-left" aria-hidden="true" onClick={ () => this.handleVisibility()} />
                </button>
                <div >
                  <input ref="inputText" type="text"  className={`${this.state.isVisible ? 'form-control input-search' : 'hidden' }`} placeholder="Search your list..." onChange={ (event) => this.handleFilterList(event)} onBlur={ () => this.handleOnBlur()}/>
                  <div >
                    <ul className={`${this.state.isVisible ? 'search-ul' : 'hidden' }`}>
                      {
                        this.state.newLists.map( (list, index) => index<4 ? <ItemList key={index} list={list} /> : null  )
                      }
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>

          </div>

      </header>
    );
  }

}

Header.propTypes = {
  lists: PropTypes.array.isRequired,
  onSetUser: PropTypes.func,
  onSetLists: PropTypes.func,
  onSetTasks: PropTypes.func,
  onSetGroups: PropTypes.func
};

Header.defaultProps = {
  lists: []
};
