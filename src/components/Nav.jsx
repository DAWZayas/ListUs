import React from 'react';
import { LeftNav, MenuItem, Paper, Dialog, TextField } from 'material-ui';

import { connect } from 'react-redux';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class Nav extends React.Component {

	constructor(props) {
    super(props);
  }

  componentDidMount(){
  	this.refs.leftNav.close();
  }

  showNav(){
  	this.refs.leftNav.toggle();
  }

	render() {

		const menuItems = [
			{
				type: MenuItem.Types.LINK,
				payload: '/account',
				text: 'ListUs'
			},

		  {
		  	type: MenuItem.Types.SUBHEADER,
		  	text: 'Groups'
		  },
		  {
		     type: MenuItem.Types.LINK,
		     payload: '/groups',
		     text: 'Manage groups'
		  },
		  {
		  	type: MenuItem.Types.SUBHEADER,
		  	text: 'Manage friends'
		  },
		  {
		     type: MenuItem.Types.LINK,
		     payload: '/friends',
		     text: 'Friends'
		  },
		  {
		  	type: MenuItem.Types.SUBHEADER,
		  	text: 'Lists'
		  },
		  {
		     type: MenuItem.Types.LINK,
		     payload: '/list',
		     text: 'My lists'
		  },
		];

		return (
			<nav className='leftNav'>
				<button onClick={this.showNav.bind(this)} className='btn btn-info'><span ref='span' className='biggerGlyphicon glyphicon glyphicon-menu-hamburger'></span></button>
				<LeftNav ref="leftNav" docked={false} menuItems={menuItems}/>
			</nav>
		);
	}
}

function mapStateToProps(state) {
  return {
  };
}

function mapActionsToProps(dispatch) {
  return {
  };
}

export default connect(
	mapActionsToProps,
	mapStateToProps
)(Nav);
