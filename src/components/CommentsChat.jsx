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
    return (<div className="row tableApparence" key={key}>
        <div className="col-xs-3">{comments[index].msg}</div>
        <div className="col-xs-3">{comments[index].date}</div>
        <div className="col-xs-3">{comments[index].hour}</div>
        <div className="col-xs-3">{comments[index].user}</div>
      </div>);
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
    this.refs.textArea.value = '';
  }

  render(){
    const { comments } = this.props;
    return(
      <div  style={{border:'1px solid black', 'width': '100%'}}>
        <div style={{'fontSize': '1.5em'}} className="tableApparence row">
          <div className="tableApparence col-xs-3">Mensaje</div>
          <div className="tableApparence col-xs-3">Fecha</div>
          <div className="tableApparence col-xs-3">Hora</div>
          <div className="tableApparence col-xs-3">Usuario</div>
        </div>
        <div style={{maxHeight: '400', height: '100', width: '100%'}}>
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
