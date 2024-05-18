import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './index.css';

// Actions
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

const addTodo = (text) => ({ type: ADD_TODO, text });
const toggleTodo = (index) => ({ type: TOGGLE_TODO, index });
const clearCompleted = () => ({ type: CLEAR_COMPLETED });
const toggleDarkMode = () => ({ type: TOGGLE_DARK_MODE });

// Reducer
const initialState = {
  todos: [],
  darkMode: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { text: action.text, completed: false }],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.index ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

// Components
function Header() {
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

function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`} onClick={() => dispatch(toggleTodo(index))}>
          <span>{todo.text}</span>
        </li>
      ))}
    </ul>
  );
}

function Footer() {
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

function App() {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
}

// Styles
const styles = `
  .app {
    text-align: center;
    padding: 20px;
  }

  .app.light {
    background-color: #f7f7f7;
    color: #333;
  }

  .app.dark {
    background-color: #333;
    color: #f7f7f7;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }

  input {
    padding: 10px;
    border: none;
    border-radius: 5px;
    width: 300px;
  }

  .toggle-container {
    cursor: pointer;
  }

  .todo-list {
    list-style: none;
    padding: 0;
  }

  .todo-item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }

  .todo-item.completed {
    text-decoration: line-through;
    color: #aaa;
  }

  footer {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

// Render
ReactDOM.render(
  <Provider store={store}>
    <App />
    <style>{styles}</style>
  </Provider>,
  document.getElementById('root')
);
