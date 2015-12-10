import React, { Component, PropTypes } from 'react';
import { Dialog, List, ListItem } from 'material-ui';



export default class GroupEditList extends Component{
	constructor(props){
		super(props);
		this.state={
			open: this.props.open
		};
	}

	
	componentDidMount(){
		(this.state.open)?this.refs.dialogEdit.show():this.refs.dialogEdit.dismiss();
	}
	componentDidUpdate(){
		if(this.state.open !== this.props.open) this.setState({open: this.props.open});
		(this.state.open)?this.refs.dialogEdit.show():this.refs.dialogEdit.dismiss();
	}

	render(){

		return (
			<Dialog ref="dialogEdit" title="Edit Options" >
				<List>
				  <ListItem primaryText="Edit Name" onClick={this.props.editName} />
				  <ListItem primaryText="Remove Group" onClick={this.props.removeGroup} />
				  <ListItem primaryText="Switch Admin" onClick={this.props.switchAdmin} />
				</List>
			</Dialog>

		);
	}


}

GroupEditList.propTypes = {
	open: PropTypes.bool,
	editName: PropTypes.func,
	removeGroup: PropTypes.func,
	switchAdmin: PropTypes.func
};