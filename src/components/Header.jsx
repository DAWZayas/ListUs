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

  /*toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  renderPerson (isScared) {

    let notis = '';

    if(isScared){
      notis += "<ul><li>Noti</li><li>Noti</li><li>Noti</li><li>Noti</li><li>Noti</li></ul>";
      return notis;
    }else{
      return notis;
    }

  }*/


  render() {
    const newLists = this.state.word!=='' ?
      this.props.lists.filter( list=> list.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1)
      : [];
    const { isOpen } = this.state;

    const notifications = 'Hola';

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

        {/*<div onClick={this.toggle.bind(this)} className={`notificationContainer ${isOpen ? 'hideNoti' : ''}`}>
          <div className="notificationIcon">3</div>
        </div>

        <Popover isOpen={isOpen} place='below' onOuterAction={this.toggle.bind(this)}>
          <div
           className={ classNames('target', { isOpen }) }
           onClick={this.toggle}>
           { isOpen ? (<ul>
                        <li>Holita</li>
                        <li>Holita</li>
                        <li>Holita</li>
                        </ul>) : '' }
         </div>
        </Popover>
*/}
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
  onSetUser: PropTypes.func,
  onSetLists: PropTypes.func,
  onSetTasks: PropTypes.func,
  onSetGroups: PropTypes.func,
  signOut: PropTypes.func
};

Header.defaultProps = {
  lists: []
};
