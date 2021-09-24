import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import tick from './img/tick.svg'

// function App() {
//   let options = [
    // 'Hello World 1',
    // 'Hello World 2',
    // 'Hello World 3',
//   ]
//   return (
//     <div className="App">
//         {options.map((item, index) =>(
//           <TodoItem key={index} title={item}/>
//         ))}
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: ['all', 'active', 'completed'],
      options: [
        {title:'Hello World 1', isComplete: true},
        {title:'Hello World 2', isComplete: false},
        {title:'Hello World 3', isComplete: false},
      ],
      filter:[]
    }
  }

  getItemDone(index){
    const getTodoItem = this.state.options[index];
    const isComplete = getTodoItem.isComplete;
    return () => {
      this.setState({
        options:[
          ...this.state.options.slice(0, index),
          {
            ...getTodoItem,
            isComplete: !isComplete
          },
          ...this.state.options.slice(index + 1)
        ]
      })
    }
  }

  getItemFilter(index){
    const getTodoItem = this.state.filter[index];
    const isComplete = getTodoItem.isComplete;
    return () => {
      this.setState({
        filter:[
          ...this.state.filter.slice(0, index),
          {
            ...getTodoItem,
            isComplete: !isComplete
          },
          ...this.state.filter.slice(index + 1)
        ]
      })
    }
  }

  onKeyDown = (e) => {
    if(e.key === 'Enter'){
      let value = e.target.value;
      this.setState({
        options: [
          {title: value, isComplete: false},
          ...this.state.options
        ]
      })
      e.target.value = '';
    }
  }

  selectAllItem = (e) => {
    const { options } = this.state;
    const resultState = options.every(checkState => checkState.isComplete === true);
    const result = options.map(value => {
      if(resultState) {
        return {...value, isComplete: false}
      }else{
        return {...value, isComplete: true}
      }
    })
    this.setState({
      options: [
        ...result,
      ]
    })
  }

  AllOptions = (e) => {
    this.setState({
      options: [
        ...this.state.options
      ],
      filter:[]
    })
  }

  ActiveOptions = (e) => {
    const { options } = this.state;
    let activeOption = options.filter(value => {
      return value.isComplete === false;
    });
    this.setState({
      filter:[
        ...activeOption,
      ]
    })
  }

  CompletedOption = (e) => {
    const { options } = this.state;
    let completedOption = options.filter(value => {
      return value.isComplete === true;
    });
    this.setState({
      filter:[
        ...completedOption,
      ]
    })
  }

  clearCompleted = (e) =>{
    const { options } = this.state;
    let completedOption = options.filter(value => {
      return value.isComplete === false;
    });
    this.setState({
      options:[
        ...completedOption,
      ]
    })
  }

  render(){
    const {options} = this.state;
    let optionTrue = options.filter(value => {
      return value.isComplete === false;
    })
    return (
      <div className="App">
        <div className="input_todoList">
          <img onClick={this.selectAllItem} src={tick} width='24'/>
          <input onKeyDown={this.onKeyDown} placeholder="Add New Item" />
        </div>
        {this.state.options.length > 0 && 
        this.state.filter.length === 0 && 
        this.state.options.map((item, index) =>(
          <TodoItem 
            onClick={this.getItemDone(index)} 
            item={item} 
            key={index}/>
          ))}
        {this.state.options.length > 0 && 
        this.state.filter.length > 0 && 
        this.state.filter.map((item, index) =>(
          <TodoItem 
            onClick={this.getItemFilter(index)} 
            item={item} 
            key={index}/>
          ))}
        {this.state.options.length === 0 && "Nothing Here"}
        <div className="area_Info">
          <p>{optionTrue.length} items left</p>
          <div className="btnSelect">
            <button onClick={this.AllOptions}>All</button>
            <button onClick={this.ActiveOptions}>Active</button>
            <button onClick={this.CompletedOption}>Completed</button>
          </div>
          {this.state.options.length > optionTrue.length && <button onClick={this.clearCompleted}>Clear Completed</button>}
        </div>
      </div>
    )
  }
}

export default App;
