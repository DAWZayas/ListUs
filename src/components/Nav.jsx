import React from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LeftNav from 'material-ui/lib/left-nav';
import Divider from 'material-ui/lib/divider';


export default class Nav extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
    	open: false
    };
  }


  handleToggle(){
  	this.setState({open: !this.state.open});
  }

  handleClose(route){
  	this.setState({open: false});
    this.context.history.pushState(null, route);
  }

  handleOpen(open){
  	this.setState({open});
  }

	render() {

		return (
			<nav className="leftNav">
				<button className="btn btn-default" onClick={() => this.handleToggle()}>
					<span ref="span" className="biggerGlyphicon glyphicon glyphicon-menu-hamburger"></span>
				</button>
				<LeftNav
					docked={false}
					open={this.state.open}
	      			onRequestChange={open => this.handleOpen(open)}>
	          			<MenuItem onClick={() => this.handleClose('/account')} style={{paddingTop: '7px', paddingBottom: '7px'}}>ListUs</MenuItem>
	          			<Divider />
	          			<h1 className="menuTitle">Groups</h1>
	          			<MenuItem onClick={() => this.handleClose('/groups')}>Manage groups</MenuItem>
	          			<Divider />
	          			<h1 className="menuTitle">Friends</h1>
	          			<MenuItem onClick={() => this.handleClose('/friends')}>Manage friends</MenuItem>
	          			<Divider />
	          			<h1 className="menuTitle">Lists</h1>
	          			<MenuItem onClick={() => this.handleClose('/list')}>My lists</MenuItem>
	          			<Divider />
	          			<h1 className="menuTitle">Calendar</h1>
	          			<MenuItem onClick={() => this.handleClose('/calendar')}>My Calendar</MenuItem>
	          			<Divider />
	          			<h1 className="menuTitle">Notifications</h1>
	          			<MenuItem onClick={() => this.handleClose('/notifications')}>Notfications</MenuItem>
	    		</LeftNav>
			</nav>
		);
	}
}


Nav.contextTypes = {
  location: React.PropTypes.object.isRequired,
  history: React.PropTypes.object
};
