import React, { Component, PropTypes } from 'react';
import List from '../components/List';
import { Dialog, TextField, FlatButton } from 'material-ui';
export default class Section extends Component {

  constructor(props){
    super(props);
  }

  validationTitle(title){
    const { lists } = this.props;
    const number = lists.filter( list => list.title===title);
    return title!=='' && lists.filter( list => list.title===title).length===0;



  }

  openDialog(){
    this.refs.dialog.show();
  }

  onClickAdd(){
    const { onAddList } = this.props;
    const title = this.refs.titleDialog.getValue();
    this.validationTitle(title) ? onAddList(title) : this.refs.dialog.dismiss();
    this.refs.dialog.dismiss();
  }

  onClickClose(){
    this.refs.dialog.dismiss();
  }

  render() {
    let customActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={() => this.onClickClose()} />,
      <FlatButton
        label="Add"
        primary={true}
        onClick={() => this.onClickAdd()} />
    ];
    const {  lists, onEditList, onRemoveList } = this.props;
    return(
      <div className="article">
        <Dialog title="Dialog With Standard Actions" actions={customActions} ref="dialog">
          <TextField ref="titleDialog" hintText="Title List" />
        </Dialog>
        <div className="lists">
            {
              lists.map( (list, index) => <List list={list} key={index} onRemoveList={onRemoveList} onEditList={onEditList}/> )
            }
        </div>
        <div className="col-md-12 center">
          <button className="btn btn-round btn-danger" onClick={() => this.openDialog()} > <span className="glyphicon glyphicon-plus" /> </button>

        </div>
      </div>
    );
  }
}

Section.propTypes = {
  lists: PropTypes.array,
  asideVisibility: PropTypes.object,
  onAddList: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired
};

Section.defaultProps = {
  lists: []
};
