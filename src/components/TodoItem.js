import React, { Component } from 'react';
import './TodoItem.css';
import imgCheck from '../img/check.svg';
import imgCheckDone from '../img/check-complete.svg';
class TodoItem extends Component {
  render(){
    const { item } = this.props;
    let className = "TodoItem";
    let url = imgCheck;
    if(item.isComplete){
      className += " TodoItem-done";
      url = imgCheckDone;
    }
    return(
      <div className={className}>
        <img onClick={this.props.onClick} src={url} width='32'/>
        <p>{item.title}</p>
      </div>
    );
  }
}
export default TodoItem;