import React from 'react';
import { Checkbox, Button, Tooltip, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
function TodoItem({ todo, toggleComplete, removeTodo }) {
  return (
    <li>
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={todo.isComplete}
          onChange={() => toggleComplete(todo.id)}
        />
        <span style={{ marginLeft: '8px', flexGrow: 1 }}>{todo.title}</span>
      </label>
      <div>
        {todo.labels &&
          todo.labels.map((label) => (
            <Chip
              key={label}
              label={label}
              size="small"
              style={{ margin: '2px' }}
            />
          ))}
      </div>
      <Tooltip title="View Details">
        <IconButton
          size="small"
          component={Link}
          to={`/todo-page/${todo.id}`}
        >
          <ReadMoreIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <Button
          sx={{ width: 30, height: 30 }}
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => removeTodo(todo.id)}
        />
      </Tooltip>
    </li>
  );
}

export default TodoItem;
