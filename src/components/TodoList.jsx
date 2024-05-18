import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo } from '../redux/actions';

export function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li
          key={index}
          className={`todo-item ${todo.completed ? 'completed' : ''}`}
          onClick={() => dispatch(toggleTodo(index))}
        >
          <span>{todo.text}</span>
        </li>
      ))}
    </ul>
  );
}
