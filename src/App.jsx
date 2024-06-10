import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoStatistics from './components/TodoStatistics';
import AddTodoForm from './components/AddTodoForm';

function makeId(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const data = [
  { id: '1', title: 'Learn React', isComplete: false },
  { id: '2', title: 'Build a Todo App', isComplete: false },
  { id: '3', title: 'Read JavaScript Documentation', isComplete: true },
  { id: '4', title: 'Write Unit Tests', isComplete: false },
  { id: '5', title: 'Implement Context', isComplete: true },
  { id: '6', title: 'Create Portfolio Website', isComplete: false },
  { id: '7', title: 'Learn TypeScript', isComplete: false },
  { id: '8', title: 'Refactor Codebase', isComplete: true },
  { id: '9', title: 'Optimize Performance', isComplete: false },
  { id: '10', title: 'Deploy to Production', isComplete: true },
];

function App() {
  const [todos, setTodos] = useState(data);

  function removeTodo(todoId) {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  }

  function toggleComplete(todoId) {
    const checkedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodos(checkedTodos);
  }

  function addTodo(title) {
    const newTodo = {
      id: makeId(10),
      title: title,
      isComplete: false,
    };

    const newTodos = [...todos];
    newTodos.push(newTodo);

    setTodos(newTodos);
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
  useEffect(() => {
    
    const greetUser = () => {
      console.log('Welcome to the app!');
    };

    greetUser();
  }, []); 
  
  return (
    <div className="main-container">
      <h1>Cat App</h1>
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
