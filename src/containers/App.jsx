import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import HeaderContainer from './HeaderContainer';
import Login from '../components/Login';
import * as authActions from '../actions/auth';


export default class App extends Component {

  constructor(props) {
    super(props);
  }

  handleLoginGithub(){
    this.props.signInWithGithub();
  }

  render() {
      return (this.props.state.authenticated) 
        ?( 
          <div> 
            <HeaderContainer /> 
            {this.props.children} 
          </div> 
        ) 
        : <Login {...this.props}/>;
  }

}

App.propTypes = {
  // Injected by React RouterConfirmDialog
  children: PropTypes.node,
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
     state: state.auth
  };
}


export default connect(
  mapStateToProps,
  authActions
)(App);
