import React from 'react';
import './Item.css';

const Item = ({id, completed, name, removeItem, toggleCompleted}) => {
  const style = completed ? {backgroundColor: '#8BFEA8'} : undefined;
  return (
    <div className='ItemContainer'>
      <li className='Item' style={style} onClick={() => {toggleCompleted(id)}}>
        {name}
      </li>
      <span className='Remove' style={style} onClick={() => { removeItem(id) }}>x</span>
    </div>
  );
}

export default Item;
