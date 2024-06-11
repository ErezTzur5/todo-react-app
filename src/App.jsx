import React, { useState, useEffect } from 'react';
import Filter from './components/filter';
import './App.css';
import TodoList from './components/TodoList';
import TodoStatistics from './components/TodoStatistics';
import AddTodoForm from './components/AddTodoForm';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/todos')
      .then(response => {
        setTodos(response.data);
        setFilteredTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  async function removeTodo(todoId) {
    try {
      await axios.delete(`http://localhost:8001/todos/${todoId}`);
      const newTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(newTodos);
      setFilteredTodos(newTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  async function toggleComplete(todoId) {
    try {
      const todo = todos.find((todo) => todo.id === todoId);
      const updatedTodo = { ...todo, isComplete: !todo.isComplete };

      await axios.put(`http://localhost:8001/todos/${todoId}`, updatedTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id === todoId ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos); s
    } catch (error) {
      console.log("Error updating todo", error);
    }
  }

  async function addTodo(title) {
    try {
      const response = await axios.post('http://localhost:8001/todos', {
        title: title,
        isComplete: false,
      });
      const newTodo = response.data;
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      setFilteredTodos(newTodos);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

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
      <h1>TODO App</h1>
      <div>
        <Filter todos={todos} setFilteredTodos={setFilteredTodos} />
        <ul>
          {filteredTodos.map(todo => (
            <li key={todo.id}>
              {todo.title} - {todo.isComplete ? 'Completed' : 'Pending'}
            </li>
          ))}
        </ul>
      </div>
      <TodoStatistics
        completedTodos={countCompletedTodos()}
        uncompletedTodos={countUncompletedTodos()}
        completionPercentage={calculateCompletionPercentage()}
      />
      <AddTodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        removeTodo={removeTodo}
      />
    </div>
  );
}

export default App;
