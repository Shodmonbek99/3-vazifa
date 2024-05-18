import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCompleted } from '../redux/actions';

export function Footer() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <footer>
      <span>{activeCount} items left</span>
      <button onClick={() => dispatch(clearCompleted())}>Clear Completed</button>
    </footer>
  );
}
