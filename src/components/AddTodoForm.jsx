import React, { useState, useRef, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function AddTodoForm({ addTodo }) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on the input field when the component first renders
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!newTodoTitle) {
      return;
    }
    addTodo(newTodoTitle);
    setNewTodoTitle(""); // Clear input field after adding
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input element if it's available
    }

  }


  return (
    <div className="form-todo">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter todo"
          value={newTodoTitle}
          onChange={(ev) => setNewTodoTitle(ev.target.value)}
          inputRef={inputRef} // Ref for the input element to handle focus
          variant="outlined"
          fullWidth
        />
        <Tooltip title={"Add TODO"} ><Button startIcon={<AddCircleIcon />} sx={{ marginTop: '10px' }} variant="contained" color="primary" type="submit"></Button></Tooltip>
      </form>
    </div>
  );
}

export default AddTodoForm;
