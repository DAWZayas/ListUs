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
      numberOfList: 5,
      dialogState: false
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
    this.setState({
      dialogState: true
    });
  }

  onClickAdd(){
    const { onAddList } = this.props;
    const id = getId();
    const title = this.refs.titleDialog.getValue();
    const date = this.state.startDate.format('DD/MM/YYYY');
    const importance = Math.ceil(this.refs.slider.getValue()/0.2);
    this.validationTitle(title) ? onAddList(title, date, importance, id) : this.refs.dialog.dismiss();
    this.setState({
      dialogState: false
    });
  }

  onClickClose(){
    this.setState({
      dialogState: false
    });
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
    const {  lists, onEditList, onRemoveList } = this.props;

    const { sorted } = this.state;
    const key = (sorted.split(' ')[0] === 'Name')?'title':'date';
    const listsEnd = (sorted === 'Sort By') ? lists : sortArray(lists, key, sorted.split(' ')[1]);
    return(
      <article className="article">
        <Dialog title="Dialog With Standard Actions" open={this.state.dialogState} actions={customActions} ref="dialog">
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

        {/*<div style={{display: 'flex', justifyContent: 'space-between'}}>
  				<h3 style={{marginLeft: '10'}}>LISTS</h3>
          <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '10'}}><button style={{backgroundColor: 'white', height: '35px'}} className="btn btn-default" onClick={() => this.openDialog()}>ADD LIST</button></div>
  				<DropDownMenu menuItems={menuItems}
  					style={{width: '175'}}
  					onChange={(e, selectedIndex, menuItem)=>sortArray(e, selectedIndex, menuItem)}/>
  			</div>*/}
        <SectionHeader title="LISTS" menuItems={menuItems} openDialog={this.openDialog.bind(this)}func={(e, selectedIndex, menuItem)=>this.handleSorted(e, selectedIndex, menuItem)}/>

      <div className="lists">
            {
              listsEnd.map( (list, index) => index<this.state.numberOfList ? <List list={list} tasks={Object.values(this.props.tasks).filter(task => task.idList === list.id)} key={index} onRemoveList={onRemoveList} onEditList={onEditList}/> : '' )
            }
        </div>
        <br/>
        <div className="col-md-12 center">
          <button onClick={() => this.pagination()} className="button-pagination-lists btn btn-default glyphicon glyphicon-option-vertical "></button>

        </div>
      </article>
    );
  }
}

Section.propTypes = {
  lists: PropTypes.array,
  tasks: PropTypes.object,
  onAddList: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired
};

Section.defaultProps = {
  lists: []
};
