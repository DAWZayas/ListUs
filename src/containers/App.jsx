import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import HeaderContainer from './HeaderContainer';
import Enter from '../components/Enter';
import { objIsEmpty } from '../utils/functions';


export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (!objIsEmpty(this.props.user))
      ?(
        <div>
          <div className="row">
            <div className="col-md-12">
                <HeaderContainer />
            </div>
          </div>
          {this.props.children}
        </div>
      )
      : <Enter />;
  }
}

App.propTypes = {
  // Injected by React RouterConfirmDialog
  children: PropTypes.node,
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
     user: state.user
  };
}

function mapActionsToProps(dispatch) {
  return {
     
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
