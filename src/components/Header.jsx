import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleDarkMode } from '../redux/actions';

export function Header() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <header>
      <h1>TODO</h1>
      <div className="toggle-container" onClick={() => dispatch(toggleDarkMode())}>
        <span className="toggle">{darkMode ? '☀️' : '🌙'}</span>
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Create a new todo..."
        onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
      />
    </header>
  );
}
