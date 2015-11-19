import React, {Component} from 'react';

export default class Logo extends Component{
	
	render(){
		return (
			<div className="logo">
	              <a style={{curso: 'pointer'}}><img src={"https://facebook.github.io/react/img/logo.svg"}/></a>
	              <h4>ListUs</h4>
			</div>
		);
	}
}



