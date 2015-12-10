import React, { Component, PropTypes } from 'react';
import { DropDownMenu } from 'material-ui';



export default class SectionHeader extends Component{
	constructor(props){
		super(props);
	}

	render(){

		return (
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<h3 style={{marginLeft: '10'}}>{this.props.title}</h3>
				<div><button className="btn btn-default positionButton" onClick={() => this.props.openDialog()}>ADD</button>
				<DropDownMenu menuItems={this.props.menuItems}
					style={{width: '175'}}
					onChange={this.props.func}/>
				</div>
			</div>
		);
	}
}

SectionHeader.propTypes = {
	func: PropTypes.func,
	menuItems: PropTypes.array,
	openDialog: PropTypes.func,
	title: PropTypes.string,
	onAddList: PropTypes.func
};
