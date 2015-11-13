import React from 'react';

import { connect } from 'react-redux';

class Groups extends React.Component {
	render() {
		return (
			<article className='article'>
 				<h3>Groups management</h3>
      </article>
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
)(Groups);