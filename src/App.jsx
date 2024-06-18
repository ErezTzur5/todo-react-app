import React, { useState, useEffect } from 'react';
import TodoStatistics from './components/TodoStatistics';
import Navbar from './components/NavBar';
import './index.css';
import axios from 'axios';
import HomePage from './components/pages/HomePage';
import TodoPage from './components/pages/TodoPage';
import TodoDetailsPage from './components/pages/TodoDetailsPage';
import NotFoundPage from './components/pages/NotFoundPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';
import TodoList from './components/TodoList';
import CreateTodoPage from './components/pages/CreateTodoPage';

function App() {


  // function countCompletedTodos() {
  //   return todos.filter((todo) => todo.isComplete).length;
  // }

  // function countUncompletedTodos() {
  //   return todos.filter((todo) => !todo.isComplete).length;
  // }

  // function calculateCompletionPercentage() {
  //   if (todos.length === 0) {
  //     return 0;
  //   }
  //   return (countCompletedTodos() / todos.length) * 100;
  // }

  return (
    <div className="main-container">
      <Router>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo-page" element={<TodoPage />} >
            <Route path="create" element={<CreateTodoPage />} />
          </Route>
          <Route path="/todo/:id" element={<TodoDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

      {/* <div className="statistics-filter-container">
        <TodoStatistics
          completedTodos={countCompletedTodos()}
          uncompletedTodos={countUncompletedTodos()}
          completionPercentage={calculateCompletionPercentage()}
        />
      </div> */}
    </div>
  );
}

export default App;
