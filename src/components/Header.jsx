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
      word: ''
    };
  }

  handleOnBlur(){
    setTimeout(() => this.handleVisibility(), 300);
  }

  handleVisibility(){
    this.refs.inputText.value='';
    this.state.isVisible ? this.setState({ isVisible: false, word: '' }) : this.setState({ isVisible: true, word: '' });
  }

  handleChangeInput(){
 		this.setState({word: this.refs.inputText.value, isVisible: true});
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

    const newLists = this.state.word!=='' ?
      this.props.lists.filter( list=> list.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1)
      : [];

    return(
      <header className="header">
        <Link className="navbar-brand" to="/list">
                <img className="image" src={"https://facebook.github.io/react/img/logo.svg"}/>
              </Link>
      <div className="navegador">
        <Nav />

        <div className="calendarHeader">
        <Link to="/calendar">
          <button className="btn btn-default calendario">
            <span className=" biggerGlyphicon  glyphicon  glyphicon-calendar" aria-hidden="true"></span>
          </button>
        </Link>
        </div>

        <div className="search">
          <div className="search-btn-input">
            <button className="btn btn-default" onClick={ () => this.handleVisibility()}>
            <span className="biggerGlyphicon glyphicon glyphicon-search pull-left" aria-hidden="true"  />
            </button>
            <input ref="inputText" type="text" autoFocus className={`${this.state.isVisible ? 'My-control input-search' : 'hidden' }`} placeholder="Search your list..." onChange={ (event) => this.handleChangeInput(event)} onBlur={ () => this.handleOnBlur()}/>
          </div>
          <div className=" list-group search-ul">

              {
                newLists.map( (list, index) => index<4 ? <ItemList key={index} list={list} /> : null  )
              }

          </div>
        </div>
      </div>


      <div className="principal">

        <a style={{cursor: 'pointer'}} onClick={e=>this.handleClearUser(e)}>
          <img
            width="30"
            src={'https://cdn2.iconfinder.com/data/icons/perfect-pixel-game-ui-set/256/quit_exit-512.png'}
            alt="Exit">
          </img>
        </a>
      </div>

  </header>



    );
  }

}

Header.propTypes = {
  lists: PropTypes.array.isRequired
};

Header.defaultProps = {
  lists: []
};
