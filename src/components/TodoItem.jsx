// import React from 'react';

// function TodoItem({ todo, toggleComplete, removeTodo }) {
//   return (
//     <li className="">
//       <label>
//         <input
//           type="checkbox"
//           checked={todo.isComplete}
//           onChange={() => toggleComplete(todo.id)}
//         />
//         <span>{todo.title}</span>
//       </label>
//       <button onClick={() => removeTodo(todo.id)}>Delete Todo</button>
//     </li>
//   );
// }

// export default TodoItem;


import React from 'react';
import { Checkbox, Button, Tooltip, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <Tooltip title="Delete">
        <Button
          sx={{ width: 30, height: 30 }}
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => removeTodo(todo.id)}
        >
        </Button>
      </Tooltip>
    </li>
  );
}

export default TodoItem;
