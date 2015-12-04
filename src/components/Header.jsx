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

          <div className="navegador">
            <Nav />
            
            <div className="calendarHeader">
            <Link to="/calendar">
              <button className="btn btn-info calendario">
                <span className=" biggerGlyphicon  glyphicon  glyphicon-calendar" aria-hidden="true"></span>
              </button>
            </Link>
            </div>

            <div className="search">
              <div className="search-btn-input">
                <button className="btn btn-info">
                <span className="biggerGlyphicon glyphicon glyphicon-search pull-left" aria-hidden="true" onClick={ () => this.handleVisibility()} />
                </button>
                <input ref="inputText" type="text" autoFocus className={`${this.state.isVisible ? 'form-control input-search' : 'hidden' }`} placeholder="Search your list..." onChange={ (event) => this.handleFilterList(event)} onBlur={ () => this.handleOnBlur()}/>
              </div>
              <div className="search-ul">
                <ul className={`${this.state.isVisible ? '' : 'hidden' }`}>
                  {
                    this.state.newLists.map( (list, index) => index<4 ? <ItemList key={index} list={list} /> : null  )
                  }
                </ul>
              </div>
            </div>
          </div>


          <div className="principal">
            <div>
              <Link to="/list"><img className="image" src={"https://facebook.github.io/react/img/logo.svg"}/></Link>
              <h4>ListUs</h4>
            </div>
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
  lists: PropTypes.array.isRequired,
  onSetUser: PropTypes.func,
  onSetLists: PropTypes.func,
  onSetTasks: PropTypes.func,
  onSetGroups: PropTypes.func
};

Header.defaultProps = {
  lists: []
};
