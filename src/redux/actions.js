// Actions
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

export const addTodo = (text) => ({ type: ADD_TODO, text });
export const toggleTodo = (index) => ({ type: TOGGLE_TODO, index });
export const clearCompleted = () => ({ type: CLEAR_COMPLETED });
export const toggleDarkMode = () => ({ type: TOGGLE_DARK_MODE });
