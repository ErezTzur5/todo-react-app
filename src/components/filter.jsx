// import React from "react";

// export function TodoFilter(props) {
//   const { query, setQuery } = props;
//   return (
//     <div className="search-input-div">
//       <input
//         className="search-input"
//         placeholder="Search by title"
//         type="search"
//         value={query}
//         onChange={(ev) => setQuery(ev.target.value)}
//       />
//     </div>
//   );
// }



import React from "react";
import { TextField } from '@mui/material';

export function TodoFilter(props) {
    const { query, setQuery } = props;
    return (
        <div className="search-input-div">
            <TextField
                className=""
                label="Search by title"
                type="search"
                variant="outlined"
                value={query}
                onChange={(ev) => setQuery(ev.target.value)}
                fullWidth
                margin="normal"
            />
        </div>
    );
}
