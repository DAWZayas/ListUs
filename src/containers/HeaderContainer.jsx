import { connect } from 'react-redux';
import Header from '../components/Header';

function mapStateToProps(state){
	return{
		lists: state.lists
	};
}



export default connect(
	mapStateToProps
)(Header);
