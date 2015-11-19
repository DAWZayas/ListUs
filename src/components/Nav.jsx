import React from 'react';
import { LeftNav, MenuItem, Paper, Dialog, TextField } from 'material-ui';

import { connect } from 'react-redux';
import { RouteHandler } from 'react-router';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const menuItems = [
			{
				route: '/account',
				text: 'ListUs'
			},

		  {
		  	type: MenuItem.Types.SUBHEADER,
		  	text: 'Groups'
		  },
		  {
		     route: '/groups',
		     text: 'Manage groups'
		  },
		  {
		  	type: MenuItem.Types.SUBHEADER,
		  	text: 'Manage friends'
		  },
		  {
		     route: '/friends',
		     text: 'Friends'
		  },
		  {
		  	type: MenuItem.Types.SUBHEADER,
		  	text: 'Lists'
		  },
		  {
		     route: '/list',
		     text: 'My lists'
		  },
		  {
		  	type: MenuItem.Types.SUBHEADER,
		  	text: 'Calendars'
		  },
		  {
		     route: '/calendar',
		     text: 'My calendar'
		  }
		];

export default class Nav extends React.Component {

	constructor(props, context) {
    super(props);
  }

  componentDidMount(){
  	this.refs.leftNav.close();
  }

  showNav(){
  	this.refs.leftNav.toggle();
  }

  _onLeftNavChange(e, key, payload) {
    // Do DOM Diff refresh
    let path = payload.route;
    this.context.history.pushState(null, path);
  }

	render() {

		return (
			<div>
				<nav className='leftNav'>
					<button onClick={this.showNav.bind(this)} className='btn btn-info'><span ref='span' className='biggerGlyphicon glyphicon glyphicon-menu-hamburger'></span></button>
					<LeftNav 
					ref="leftNav" 
					docked={false} 
					menuItems={menuItems}
	        onChange={this._onLeftNavChange.bind(this)} />
				</nav>

				
			
			</div>
		);
	}
}

Nav.contextTypes = {
  location: React.PropTypes.object.isRequired,
  history: React.PropTypes.object
};