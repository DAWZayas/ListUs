import React, { Component, PropTypes } from 'react';
import { DropDownMenu } from 'material-ui';



export default class SectionHeader extends Component{
	constructor(props){
		super(props);
	}

	render(){

		return (
			<div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '2.3px solid #29207A'}}>
				<h3 style={{paddingLeft: '1em'}}>{this.props.title}</h3>
				<div>
				{
					this.props.openDialog!==undefined ?
						<button className="btn btn-default positionButton" onClick={() => this.props.openDialog()}>ADD</button>
					: ''
				}

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
