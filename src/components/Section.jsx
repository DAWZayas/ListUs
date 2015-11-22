import React, { Component, PropTypes } from 'react';
import List from '../components/List';
import SectionHeader from './SectionHeader';
import { Dialog, TextField, FlatButton } from 'material-ui';
import { menuItems, sortArray } from '../utils/functions';


export default class Section extends Component {

  constructor(props){
    super(props);
    this.state = {
      sorted: 'Sort By'
    };
  }

  validationTitle(title){
    const { lists } = this.props;
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

  handleSorted(e, selectedIndex, menuItem){
    e.preventDefault();
    this.setState({sorted: menuItem.text});
  }

  render() {
    let customActions = [
      <FlatButton
        label="Cancel"
        secondary
        onClick={() => this.onClickClose()} />,
      <FlatButton
        label="Add"
        primary
        onClick={() => this.onClickAdd()} />
    ];
    const {  lists, onEditList, onRemoveList } = this.props;
    const { sorted } = this.state;
    const key = (sorted.split(' ')[0] === 'Name')?'title':'date';
    const listsEnd = (sorted === 'Sort By')
        ?lists 
        :sortArray(lists, key, sorted.split(' ')[1]);
    return(
      <article className="article">
        <Dialog title="Dialog With Standard Actions" actions={customActions} ref="dialog">
          <TextField ref="titleDialog" hintText="Title List" autoFocus/>
        </Dialog>

        <SectionHeader title="LISTS" menuItems={menuItems} func={(e, selectedIndex, menuItem)=>this.handleSorted(e, selectedIndex, menuItem)}/>
        <div className="lists">
            {
              listsEnd.map( (list, index) => <List list={list} key={index} onRemoveList={onRemoveList} onEditList={onEditList}/> )
            }
        </div>
        <br/>
        <div className="col-md-12 center">
          {/*<button className="btn btn-round btn-danger" onClick={() => this.openDialog()} > <span className="glyphicon glyphicon-plus" /> </button>*/}
          <a onClick={() => this.openDialog()} style={{cursor: 'pointer'}} >
            <img src={'http://waxpoetics.com/wp-content/themes/records-waxpoetics/images/newicons4/plus.png'} width="30" height="30"/>
          </a>
        </div>
      </article>
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
