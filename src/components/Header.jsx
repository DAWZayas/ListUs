import React, { Component, PropTypes } from 'react';
import Nav from './Nav';
import { Link } from 'react-router';

export default class Header extends Component{

  constructor(props){
    super(props);
  }

  render() {

    return(

      <div className="header">
        <div className="row upper">
          <div className="col-xs-1"><Nav /></div>
          <div className="col-xs-2">
            <span className="biggerGlyphicon glyphicon glyphicon-search" aria-hidden="true"></span>
          </div>
          <div className="col-xs-6"></div>
          <div className="col-xs-2">
            <span className="biggerGlyphicon glyphicon glyphicon-calendar" aria-hidden="true"></span>
          </div>
          <div className="col-xs-1"></div>
        </div>

        <Link to='/list'><img className='image' src={"https://facebook.github.io/react/img/logo.svg"}/></Link>         
        <h4>ListUs</h4>       
        
      </div>
    );
  }

}

Header.propTypes = {
  asideVisibility: PropTypes.object,
  onDisplayAside: PropTypes.func.isRequired
};

Header.defaultProps = {
  asideVisibility : {}
};
