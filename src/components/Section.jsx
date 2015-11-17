import React, { Component, PropTypes } from 'react';
import List from '../components/List';
import { Dialog } from 'material-ui';
export default class Section extends Component {

  constructor(props){
    super(props);
  }

  openDialog(){
    this.refs.dialog.show();
  }

  render() {
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];
    const {  lists, onEditList, onRemoveList } = this.props;
    return(
      <div className="article">
      <Dialog title="Dialog With Standard Actions" actions={standardActions} ref="dialog">
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
