import React, { Component, PropTypes } from 'react';

let moment = require('moment');

export default class CommentsChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().format('L')
    };
  }


/*

  CAMBIAR EL USER 'PEPE' DE ONCLICKADDCOMMENT()


*/

  onClickAddComment(){
    const { onAddComment, idList } = this.props;
    const textComment = this.refs.textArea.value;
    if(textComment!==''){
      const minut = moment().minutes()<10 ? '0'+ moment().minutes() : moment().minutes();
      const time = moment().hours() + ':' + minut;
      onAddComment(idList, 'pepe', moment().format('L'), time, textComment);
      this.refs.textArea.value = '';
    }
  }

  changeDay(index){
    const {comments} = this.props;
    if(index===0){
      return <div className="commentDate"><span>{comments[index].date===this.state.startDate ? 'HOY' : comments[index].date}</span></div>;
    }
    if(comments[index].date!==comments[index-1].date){
      return <div className="commentDate">{comments[index].date===this.state.startDate ? 'HOY' : comments[index].date}</div>;
    }
    return '';
  }

  haveBlankSpace(msg){
    debugger;
    for(let i = 0; msg.length>i; i++){
      if(msg[i]===' '){
        return true;
      }
    }
    return false;
  }

  formatMsg(msg){
    let formatMsg = '';
    if(this.haveBlankSpace(msg)){
      formatMsg = msg;
    }else{
      for(let i = 0; msg.length>i; i++){
        if(i%135===0){
          formatMsg = formatMsg +'\n';
        }
        formatMsg = formatMsg + msg[i];
      }
    }
    return formatMsg;
  }

  render(){
    const {comments} = this.props;

    return(
      <div  className="chat">
        <div>
          <ul className="listComments">
            {
              comments.map( (comment, index) =>
                  <div className=""key={index}>
                  {this.changeDay(index)}
                  <li className="itemComment"><div className="commentInfo "><div className="commentUser">{comment.user}</div><div className="commentMsg ">{this.formatMsg(comment.msg)}</div></div><div className="commentHour">{comment.hour}</div></li>
                  </div>)
            }
          </ul>
        </div>
        <div className="messageAndButtonSend">
          <textarea className="form-control inputSendMsg" ref="textArea" max-height="140"></textarea>
          <button className="btn btn-success glyphicon glyphicon-send buttonSendMessage" onClick={ () => this.onClickAddComment()}></button>
        </div>
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
