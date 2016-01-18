import { connect } from 'react-redux';

import CommentsChat from '../components/CommentsChat';
import * as commentsActions from '../actions/comments';

/*function mapStateToProps(state){

  const idList = state.router.params.idList;
  const comments = state.comments[idList];
  return {
    idList: idList,
    comments: comments,
    user: state.user
  };
}*/




export default connect(
  state => ({ comments: state.comments, router:state.router }),
  commentsActions
)(CommentsChat);
