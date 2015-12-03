import React, { Component, PropTypes } from 'react';
import List from '../components/List';

import SectionHeader from './SectionHeader';
import { menuItems, sortArray } from '../utils/functions';
import { getId } from '../utils';


import { Dialog, TextField, FlatButton, Slider } from 'material-ui';

import DatePicker from 'react-datepicker';
let moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');


export default class Section extends Component {

  constructor(props){
    super(props);
    this.state = {
      sorted: 'Sort By',
      startDate: moment(),
      numberOfList: 5
    };
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
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
    const id = getId();
    const title = this.refs.titleDialog.getValue();
    const date = this.state.startDate.format('DD/MM/YYYY');
    const importance = Math.ceil(this.refs.slider.getValue()/0.2);
    this.validationTitle(title) ? onAddList(title, date, importance, id) : this.refs.dialog.dismiss();
    this.refs.dialog.dismiss();
  }

  onClickClose(){
    this.refs.dialog.dismiss();
  }


  handleSorted(e, selectedIndex, menuItem){
    e.preventDefault();
    this.setState({sorted: menuItem.text});
  }

  changeImportance(){
    const value = this.refs.slider.getValue();
    this.refs.importance.setValue(Math.ceil(value/0.2));
  }

  pagination(){
    this.setState({
      numberOfList: this.state.numberOfList+5
    });
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
    const {  lists, onEditList, onRemoveList, onAddList } = this.props;

    const { sorted } = this.state;
    const key = (sorted.split(' ')[0] === 'Name')?'title':'date';
    const listsEnd = (sorted === 'Sort By') ? lists : sortArray(lists, key, sorted.split(' ')[1]);
    return(
      <article className="article">
        <Dialog title="Dialog With Standard Actions" actions={customActions} ref="dialog">
          <TextField ref="titleDialog" hintText="Title List" autoFocus />
          <DatePicker
            dateFormat="DD/MM/YYYY"
            selected={this.state.startDate}
            onChange={this.handleChange.bind(this)}
            popoverAttachment="bottom center"
            popoverTargetAttachment="top center"
            popoverTargetOffset="0px 0px" />
          <br/><h5 style={{width:'100px'}}>Importance</h5>
          <Slider name="slider" style={{width: '200px'}} ref="slider" max={0.8} step={0.20} onChange={this.changeImportance.bind(this)} />
          <TextField disabled style={{top: '-30px', width:'100px'}} ref="importance" defaultValue="0"/>
        </Dialog>

        <SectionHeader title="LISTS" menuItems={menuItems} func={(e, selectedIndex, menuItem)=>this.handleSorted(e, selectedIndex, menuItem)} onAddList={onAddList}/>
        <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '10'}}><button style={{backgroundColor: 'white'}} className="btn btn-default" onClick={() => this.openDialog()}>ADD LIST</button></div>
        <div className="lists">
            {
              listsEnd.map( (list, index) => index<this.state.numberOfList ? <List list={list} key={index} onRemoveList={onRemoveList} onEditList={onEditList}/> : '' )
            }
        </div>
        <br/>
        <div className="col-md-12 center">
          <a onClick={() => this.pagination()} style={{cursor: 'pointer'}} >
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
