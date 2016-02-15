import React, { Component, PropTypes } from 'react';
import { DropDownMenu, MenuItem } from 'material-ui';



export default class SectionHeader extends Component{
	constructor(props){
		super(props);
		this.state = {
			value: 'Sort By'
		};
	}

	handleChange(e, index, value){
		this.setState({value});
		this.props.func(e, index, value);
	}

	render(){

		return (
			<div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '2.3px solid #29207A'}}>
				<h3 style={{paddingLeft: '1em', fontSize: '23'}}>{this.props.title}</h3>
				<div>
				{
					this.props.openDialog!==undefined ?
						<button className="btn btn-default" onClick={() => this.props.openDialog()}>ADD</button>
					: ''
				}

				<DropDownMenu 
					value={this.state.value}
					style={{minWidth: '175px'}}
					onChange={(e, index, value) => this.handleChange(e, index, value)}>
					<MenuItem value={'Sort By'} primaryText="Sort By"/>
					<MenuItem value={'Name Ascendant'} primaryText="Name Ascendant"/>
					<MenuItem value={'Name Descendant'} primaryText="Name Descendant"/>
				</DropDownMenu>
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
