import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

function AddTodoForm({ addTodo }) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on the input field when the component first renders
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!newTodoTitle) {
      return;
    }

    try {
      await axios.post('http://localhost:8001/todos', { title: newTodoTitle, isComplete: false });
      addTodo(newTodoTitle);
      setNewTodoTitle(""); // Clear input field after adding
      if (inputRef.current) {
        inputRef.current.focus(); // Focus the input element if it's available
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  return (
    <div className="form-todo">
      <form onSubmit={handleSubmit}>
        <input
          className='todo-input'
          type="text"
          value={newTodoTitle}
          onChange={(ev) => setNewTodoTitle(ev.target.value)}
          ref={inputRef} // Ref for the input element to handle focus
          placeholder="Enter todo"
        />
        <button className='add-btn'>Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
