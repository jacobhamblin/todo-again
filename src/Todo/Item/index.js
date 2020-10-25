import React from 'react';
import './Item.css';

const Item = ({id, completed, name, toggleCompleted}) => {
  const style = completed ? {backgroundColor: '#8BFEA8'} : undefined;
  return (
    <li className='Item' style={style} onClick={() => {toggleCompleted(id)}}>
      {name}
    </li>
  );
}

export default Item;
