import { connect } from 'react-redux';
import CommentsChat from '../components/CommentsChat';
import { addComment, removeComments } from '../actions';


function mapStateToProps(state){

  const idList = state.router.params.idList;
  const comments = state.comments[idList];
  return {
    idList: idList,
    comments: comments
  };
}



function mapActionsToProps(dispatch){
  return{
    onAddComment: (idList, user, date, hour, msg) => dispatch(addComment(idList, user, date, hour, msg)),
    onRemoveComments: idList => dispatch(removeComments(idList))
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CommentsChat);