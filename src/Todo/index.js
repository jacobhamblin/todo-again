import React, { PureComponent } from 'react';
import Item from './Item';
import './Todo.css';

const STORAGE_ITEMS_KEY = "todoItems";

class Todo extends PureComponent {
  localStorageItems = () => JSON.parse(window.localStorage.getItem(STORAGE_ITEMS_KEY) || "{}");
  state = {id: 1, showCompleted: false, newItemName: '', items: this.localStorageItems()};
  toggleCompleted = (id) => {
    const { items } = this.state;
    const newItems = {...items}
    newItems[id].completed = !newItems[id].completed;
    this.setState({ items: newItems }, this.updateLocalStorage);
  }
  toggleShowCompleted = () => {
    const { showCompleted } = this.state;
    this.setState({showCompleted: !showCompleted});
  }
  submitItem = () => {
    const { id, items, newItemName } = this.state;
    const newItems = {...items};
    newItems[id] = {completed: false, id, name: newItemName};
    this.setState({newItemName: '', items: newItems, id: id + 1 }, this.updateLocalStorage);
  }
  updateLocalStorage = () => {
    window.localStorage.setItem(STORAGE_ITEMS_KEY, JSON.stringify(this.state.items));
  }
  getVisibleItems = () => {
    const props = {
      toggleCompleted: this.toggleCompleted,
    };
    const {items, showCompleted} = this.state;
    const visibleItems = [];
    Object.keys(items).forEach(id => {
      if (!items[id].completed || showCompleted) {
        const newProps = {...props, ...items[id], id, key: id};
        visibleItems.push(<Item {...newProps} />)
      }
    });
    return visibleItems;
  }
  render() {
    const { newItemName, showCompleted } = this.state;
    const completedText = showCompleted ? 'Hide Completed' : 'Show Completed'
    return (
      <div className='Todo'>
        <h2>Todo</h2>
        <div className='Todo__new-item'>
          <input
            className='Todo__new-item__name'
            placeholder='What do you need to do?'
            onChange={(e) => this.setState({newItemName: e.target.value})}
            onKeyPress={(e) => {if (e.key === 'Enter') this.submitItem()}}
            value={newItemName}
          />
          <button
            className='Todo__new-item__button'
            onClick={this.submitItem}
          >
            Add Todo Item
          </button>
        </div>
        <ul className='Todo__items-list'>
          {this.getVisibleItems()}
        </ul>
        <div className='Todo__buttons'>
          <button className='Todo__show-completed' onClick={() => this.toggleShowCompleted()}>{completedText}</button>
        </div>
      </div>
    )
  }
}

export default Todo;
