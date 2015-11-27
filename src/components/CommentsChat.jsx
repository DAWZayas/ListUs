import React, { Component, PropTypes } from 'react';
import ReactList from 'react-list';
let moment = require('moment');

export default class CommentsChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().format('L')
    };
  }

  renderItem(index, key) {
    const { comments } = this.props;
    return <div key={key}>{comments[index].msg}<span>{comments[index].date}</span><span>{comments[index].hour}</span><span>{comments[index].user}</span></div>;
  }
/*

  CAMBIAR EL USER 'PEPE' DE ONCLICKADDCOMMENT() 


*/

  onClickAddComment(){
    const { onAddComment, idList } = this.props;
    const textComment = this.refs.textArea.value;
    const minut = moment().minutes()<10 ? '0'+ moment().minutes() : moment().minutes();
    const time = moment().hours() + ':' + minut;
    onAddComment(idList, 'pepe', moment().format('L'), time, textComment);
  }

  render(){
    const { comments } = this.props;
    return(
      <div  style={{border:'1px solid black'}}>

        <div style={{overflow: 'auto', maxHeight: '400', height: '100', width: '100%'}}>
          <ReactList
            itemRenderer={this.renderItem.bind(this)}
            length={comments.length}
            type="uniform"
          />
        </div>
        <textarea ref="textArea" cols="20" rows="3"></textarea>
        <button className="btn btn-success" onClick={ () => this.onClickAddComment()}>Comment</button>
    </div>
    );
  }

};

CommentsChat.propTypes = {
  idList: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  onAddComment: PropTypes.func,
  onRemoveComments: PropTypes.func
};
