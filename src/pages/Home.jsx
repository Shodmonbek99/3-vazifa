import React from 'react';
import { Header } from '../components/Header';
import { TodoList } from '../components/TodoList';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="app">
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
}
