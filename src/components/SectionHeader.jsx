import React, { Component } from 'react';
import { DropDownMenu } from 'material-ui';



export default class SectionHeader extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<h3 style={{marginLeft: '10'}}>{this.props.title}</h3>
				<DropDownMenu menuItems={this.props.menuItems} 
					style={{width: '175'}}
					onChange={this.props.func}/>
			</div>
		);
	}
}

//(e, selectedIndex, menuItem)=>this.handleSorted(e, selectedIndex, menuItem)