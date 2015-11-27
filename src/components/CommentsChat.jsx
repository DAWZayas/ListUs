import React, { Component, PropTypes } from 'react';

export default class CommentsChat extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const { comments, friends} = this.props;
    return(
      <div>
        <textarea cols="20" rows="3">

        </textarea>
    </div>
    );
  }

};

CommentsChat.propTypes = {
  comments: PropTypes.array.isRequired,
  friends: PropTypes.object.isRequired,
  onAddComment: PropTypes.func,
  onRemoveComments: PropTypes.func
};
