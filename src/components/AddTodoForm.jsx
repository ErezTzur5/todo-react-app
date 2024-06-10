import axios from 'axios';
import React, { useState, useRef } from 'react';

function AddTodoForm({ addTodo }) {
  // const [newTodoTitle, setNewTodoTitle] = useState("");
  const todoTitle = useRef(null)
  const inputRef = useRef(null);


  // function handleSubmit(ev) { // using UserState!
  //   ev.preventDefault();
  //   addTodo(newTodoTitle);
  //   setNewTodoTitle(""); // clear input field after adding
  //   inputRef.current.focus(); // focus the input element
  // }




  async function handleSubmit(ev) {
    ev.preventDefault();
    const newTodoTitle = todoTitle.current.value;
    if (!newTodoTitle) {
      return;
    }

    try {
      await axios.post('http://localhost:8001/todos', { title: newTodoTitle });
      addTodo(newTodoTitle);
      todoTitle.current.value = ''; // clear input field after adding
      if (inputRef.current) {
        inputRef.current.focus(); // focus the input element if it's available
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
  
  return (

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        // value={newTodoTitle}
        // onChange={(ev) => setNewTodoTitle(ev.target.value)}
        ref={todoTitle} // ref input element
        
      />
      <button className='add-btn'>Add</button>
    </form>
  );
}

export default AddTodoForm;
