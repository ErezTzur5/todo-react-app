import React from "react";

export function TodoFilter(props) {
  const { query, setQuery } = props;
  return (
    <div className="search-input-div">
      <input
        className="search-input"
        placeholder="Search by title"
        type="search"
        value={query}
        onChange={(ev) => setQuery(ev.target.value)}
      />
    </div>
  );
}