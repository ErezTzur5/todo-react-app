import React, { useState, useEffect } from 'react';
import TodoStatistics from './components/TodoStatistics';
import Navbar from './components/NavBar';
import { TodoFilter } from './components/filter';
import './index.css';
import axios from 'axios';
import HomePage from './components/pages/HomePage';
import TodoPage from './components/pages/TodoPage';
import TodoDetailsPage from './components/pages/TodoDetailsPage';
import CreateTodoPage from './components/pages/CreateTodoPage';
import NotFoundPage from './components/pages/NotFoundPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';



function App() {
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8001/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);


  function countCompletedTodos() {
    return todos.filter((todo) => todo.isComplete).length;
  }

  function countUncompletedTodos() {
    return todos.filter((todo) => !todo.isComplete).length;
  }

  function calculateCompletionPercentage() {
    if (todos.length === 0) {
      return 0;
    }
    return (countCompletedTodos() / todos.length) * 100;
  }

  return (
    <div className="main-container">
      <Router>
        <Sidebar/>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/todo-page" element={<TodoPage />} />
                <Route path="/todo/:id" element={<TodoDetailsPage />} />
                <Route path="/create-todo" element={<CreateTodoPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
      
      <div className="statistics-filter-container">
        {/* <TodoFilter query={query} setQuery={setQuery} /> */}
        <TodoStatistics
          completedTodos={countCompletedTodos()}
          uncompletedTodos={countUncompletedTodos()}
          completionPercentage={calculateCompletionPercentage()}
        />
      </div>

    </div>
  );}

export default App;
