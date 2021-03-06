import React, { Component, PropTypes } from 'react';
import Nav from './Nav';
import { Link } from 'react-router';
import ItemList from './ItemList';



export default class Header extends Component{

  constructor(props){
    super(props);
    this.state = {
      isVisible: false,
      word: '',
      isOpen: false
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

  handleSignOut(){
    this.props.signOut();
  }

  handleGreet(){
    setTimeout(() => {
      document.getElementsByClassName('welcome')[0].style.display = 'none';
      this.props.setMetadata();
    }, 5000);
  }


  render() {
    const newLists = this.state.word !== '' ?
      this.props.lists.filter( list=> list.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1)
      : [];

    return(
      <header className="header">

      <div className="navegador">
        <Nav />

        <div className="calendarHeader">
          <Link className="navbar-brand" to="/list">
              <img className="image" src={"https://facebook.github.io/react/img/logo.svg"}/>
          </Link>
        </div>

        <div className="search">
          <div className="search-btn-input">
            <input ref="inputText" type="text" className={`${this.state.isVisible ? 'My-control input-search' : 'My-control input-search' }`} placeholder="Search your list..." onChange={ () => this.handleChangeInput()} onBlur={ () => this.handleOnBlur()}/>
          </div>
          <div className=" list-group search-ul">
              {
                newLists.map( (list, index) => index<4 ? <ItemList key={index} list={list} /> : null  )
              }
          </div>
        </div>
      </div>

      <div className="principal">

        {(this.props.user.name && this.props.metadata.greet) ? (this.props.metadata.greet !== '')
            ?<div className="welcome animated fadeInRight" 
                  style={{width: '220px', height: '70px', position: 'absolute', right: -8, top: -1, opacity: 0.8}}>
                <div className="alert alert-info" role="alert">Welcome to ListUs, {this.props.user.name}!</div>
             </div>
            :''
          : ''
        }
        {(this.props.user.name && this.props.metadata.greet) ?(this.props.metadata.greet !== '') ?this.handleGreet() :'' :''}
        <a style={{cursor: 'pointer'}} onClick={() => this.handleSignOut()} title="Sign Out">
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
  user: PropTypes.object,
  metadata: PropTypes.object,
  onSetUser: PropTypes.func,
  onSetLists: PropTypes.func,
  onSetTasks: PropTypes.func,
  onSetGroups: PropTypes.func,
  signOut: PropTypes.func,
  metadata: PropTypes.object,
  user: PropTypes.object,
  endGreet: PropTypes.func
};

Header.defaultProps = {
  lists: []
};
